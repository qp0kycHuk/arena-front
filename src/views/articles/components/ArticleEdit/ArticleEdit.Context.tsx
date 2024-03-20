import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { useAuth } from '@store/auth'
import { ICreateRequest, IUpdateRequest } from '@store/articles/articles.api'
import { IUploadRequest, filesApi } from '@store/files/files.api'
import { editorContentUpdate } from '@features/editor/hooks/useEditor'
import { DispatchEditableEntity, useEditableEntity } from '@hooks/useEditableEntity'
import { useLoading } from '@hooks/useLoading'
import { getRoute } from '@utils/index'
import { toast } from '@lib/Toast'
import { useNavigate, useParams } from 'react-router-dom'
import { IFile } from '@models/File'
import { IArticle } from '@models/Article'
import { showAsyncError } from '@utils/helpers/errors'
import { AxiosError } from 'axios'
import { linksApi } from '@store/links/links.api'
import { useFetchArticleById, useUpsertArticle } from '@store/articles/'
import { docsApi } from '@/store/files/docs.api'

export const ArticleEditMainContext = createContext<IArticleMainContextValue>({} as IArticleMainContextValue)
export const ArticleEditUtilsContext = createContext<IArticleUtilsContextValue>({} as IArticleUtilsContextValue)

export const useArticleEditMainContext = () => useContext(ArticleEditMainContext)
export const useArticleEditUtilsContext = () => useContext(ArticleEditUtilsContext)

export function ArticleEditContextProvider({ children, articleId }: IArticleEditContextProviderProps) {
  const navigate = useNavigate()
  const { loading, loadingStart, loadingEnd } = useLoading()
  const { data: auth } = useAuth()
  const user = auth?.user
  const { folderId } = useParams()

  const { data } = useFetchArticleById(articleId || '')
  const article = data?.item
  const { mutateAsync: upsertArticle } = useUpsertArticle()

  const initialArticle = useMemo(() => {
    return {
      ...article,
      contentJson: article?.content,
    }
  }, [article])

  const [editableArticle, update] = useEditableEntity<IEditableArticle>(initialArticle)

  // create form data from edit component states
  // name, editor
  const getFormData = useCallback((): ICreateRequest => {
    const formData: ICreateRequest = new FormData()

    formData.append('name', editableArticle.name || '')
    formData.append('content', editableArticle.contentJson || '')
    formData.append('excerpt', editableArticle.excerpt || '')

    if (!user) {
      throw new Error('user is undefined')
    }

    if (folderId) {
      formData.append('folders[]', folderId)
    }

    if (editableArticle.folders) {
      editableArticle.folders.forEach(({ id }) => {
        formData.append('folders[]', id.toString())
      })
    }

    if (editableArticle.imageFile) {
      formData.append('image', editableArticle.imageFile)
    }

    if (editableArticle.image_delete && editableArticle.id) {
      ;(formData as IUpdateRequest).append('image_delete', '1')
    }

    if (article) {
      ;(formData as IUpdateRequest).append('id', article.id.toString())
    }

    editableArticle.files?.forEach((item) => {
      if (!item.file) {
        formData.append('attachment[]', item.id as string)
      }
    })

    editableArticle.docs?.forEach((item) => {
      if (!item.file) {
        formData.append('docs[]', item.id as string)
      }
    })

    editableArticle.tags?.forEach(({ id: tagId }) => {
      formData.append('tags[]', tagId.toString())
    })

    return formData
  }, [editableArticle, user, folderId])

  const submitHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!editableArticle.name) {
        toast.error('Введите название статьи')

        return
      }

      if (!editableArticle.contentJson) {
        toast.error('Введите тело статьи')

        return
      }

      loadingStart()
      const formData = getFormData()

      // upload files and update content with images src`s
      {
        const uploadedFileItems: IFile[] = []
        const filesFormData: IUploadRequest = new FormData()

        editableArticle.files?.forEach((item) => {
          if (item.file) {
            filesFormData.append('files[]', item.file)
            uploadedFileItems.push(item)
          }
        })

        if (filesFormData.has('files[]')) {
          try {
            const result = await filesApi().upload(filesFormData)
            const items = result.data.items

            const updatedEditorContent = editorContentUpdate(
              JSON.parse(editableArticle.contentJson || '{}'),
              (item) => {
                if (item.type === 'image') {
                  const uploadedFileIndex = uploadedFileItems.findIndex(
                    (fileItem) => fileItem.id === item.attrs.id || fileItem.src === item.attrs.src
                  )

                  if (uploadedFileIndex >= 0) {
                    return {
                      ...item,
                      attrs: {
                        ...item.attrs,
                        src: items[uploadedFileIndex].src,
                        id: items[uploadedFileIndex].id,
                      },
                    }
                  }
                }

                return item
              }
            )

            formData.set('content', JSON.stringify(updatedEditorContent))

            items.forEach((fileItem) => {
              formData.append('attachment[]', fileItem.id as string)
            })
          } catch (error) {
            console.log('error', error)
            showAsyncError((error as AxiosError).response?.data as IErrorData)
            loadingEnd()
            return
          }
        }
      }

      // upload docs and update content with images src`s
      {
        const uploadedFileItems: IFile[] = []
        const docsFormData: IUploadRequest = new FormData()

        editableArticle.docs?.forEach((item) => {
          if (item.file) {
            docsFormData.append('files[]', item.file)
            uploadedFileItems.push(item)
          }
        })

        if (docsFormData.has('files[]')) {
          try {
            const result = await docsApi().upload(docsFormData)
            const items = result.data.items

            const updatedEditorContent = editorContentUpdate(
              JSON.parse(editableArticle.contentJson || '{}'),
              (item) => {
                if (item.type === 'fileBlock') {
                  const uploadedFileIndex = uploadedFileItems.findIndex((fileItem) => fileItem.id === item.attrs.id)

                  if (uploadedFileIndex >= 0) {
                    return {
                      ...item,
                      attrs: {
                        ...item.attrs,
                        src: items[uploadedFileIndex].src,
                        id: items[uploadedFileIndex].id,
                      },
                    }
                  }
                }

                return item
              }
            )

            formData.set('content', JSON.stringify(updatedEditorContent))

            items.forEach((fileItem) => {
              formData.append('docs[]', fileItem.id as string)
            })
          } catch (error) {
            showAsyncError((error as AxiosError).response?.data as IErrorData)
            loadingEnd()
            return
          }
        }
      }

      // create links
      if (editableArticle.links) {
        try {
          const promises = editableArticle.links
            .filter((link) => link.url)
            .map((link) => {
              const linkFormData = new FormData()
              const name = (link.name || link.url?.replace(/^https?\:\/\//i, '')) as string
              linkFormData.append('name', name)
              linkFormData.append('url', link.url as string)

              if (link.id) {
                linkFormData.append('id', link.id as string)
                return linksApi.update(linkFormData)
              } else {
                if (!user) {
                  throw new Error('user is undefined')
                }

                // linkFormData.append('owner_id', user.id.toString())
                return linksApi.create(linkFormData)
              }
            })

          const linksResult = await Promise.all(promises)
          linksResult.forEach((res) => {
            formData.append('links[]', res.item.id as string)
          })
        } catch (error) {
          console.log('error', error)

          showAsyncError((error as AxiosError).response?.data as IErrorData)
          loadingEnd()
          return
        }
      }

      try {
        const { item: updatedArticle } = await upsertArticle(formData)
        loadingEnd()

        if (updatedArticle?.id) {
          navigate(getRoute().articles(updatedArticle.id))
        }
      } catch (error) {
        showAsyncError((error as AxiosError).response?.data as IErrorData)
        loadingEnd()
        return
      }
    },
    [getFormData]
  )

  return (
    <ArticleEditUtilsContext.Provider value={{ loadingStart, loadingEnd, getFormData, submitHandler }}>
      <ArticleEditMainContext.Provider value={{ article: editableArticle, loading, update }}>
        {children}
      </ArticleEditMainContext.Provider>
    </ArticleEditUtilsContext.Provider>
  )
}

interface IArticleMainContextValue {
  article?: Partial<IEditableArticle>
  loading: boolean
  update(updated: DispatchEditableEntity<IEditableArticle>): void
}

interface IArticleUtilsContextValue {
  loadingStart(): void
  loadingEnd(): void
  getFormData(): ICreateRequest
  submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void>
}

interface IArticleEditContextProviderProps extends React.PropsWithChildren {
  articleId?: number | string
}

interface IEditableArticle extends Partial<IArticle> {
  imageFile?: File
  image_delete?: boolean
  contentJson?: string
}
