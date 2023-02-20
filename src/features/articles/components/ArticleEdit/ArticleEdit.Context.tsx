import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { IArticle } from "@models/Article";
import { useArticleControl } from "@store/articles";
import { useUserQuery } from "@store/auth";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@hooks/useErrorMessage";
import { toast } from "@lib/Toast";
import { useFetchArticleById } from "@store/articles/articles.hooks";
import { ICreateRequest, IUpdateRequest } from "@store/articles/articles.api";
import { getRoute } from "@utils/index";
import { useEditableEntity } from "@hooks/useEditableEntity";
import { useLoading } from "@hooks/useLoading";
import { IUploadRequest, filesApi } from "@store/files/files.api";



export const ArticleEditContext = createContext<IArticleEditContextValue>({} as IArticleEditContextValue)
export const ArticleEditMainContext = createContext<IArticleMainContextValue>({} as IArticleMainContextValue)
export const ArticleEditUtilsContext = createContext<IArticleUtilsContextValue>({} as IArticleUtilsContextValue)

export const useArticleEditMainContext = () => useContext(ArticleEditMainContext)
export const useArticleEditUtilsContext = () => useContext(ArticleEditUtilsContext)

export function ArticleEditContextProvider({
    children,
    articleId }: IArticleEditContextProviderProps
) {
    const { data: user } = useUserQuery(null)
    const navigate = useNavigate();

    const { createDraftArticle, upsertArticle, manualUpdateArticle } = useArticleControl()

    const { data: article } = useFetchArticleById(articleId || '')

    const [editableArticle, update] = useEditableEntity<IEditableArticle>(article)
    const { loading, loadingStart, loadingEnd } = useLoading()


    // create form data from edit component states
    // name, editor
    const getFormData = useCallback((): ICreateRequest => {
        const formData: ICreateRequest = new FormData()
        formData.append('name', editableArticle.name || '')
        formData.append('content', editableArticle.content || '')
        formData.append('excerpt', editableArticle.excerpt || '')


        if (!user) {
            throw new Error('user is undefined')
        }

        formData.append('user_id', user.id.toString())

        if (editableArticle.imageFile) {
            formData.append('image', editableArticle.imageFile)
        }

        if (editableArticle.image_delete && editableArticle.id) {
            (formData as IUpdateRequest).append('image_delete', '1')
        }

        if (article) {
            (formData as IUpdateRequest).append('id', article.id.toString())
        }

        editableArticle.tags?.forEach(({ id: tagId }) => {
            formData.append('tags[]', tagId.toString())
        })

        return formData
    }, [editableArticle, user])

    const submitHandler = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!editableArticle.name) {
            toast.error('Введите название статьи')
            return;
        }
        const formData = getFormData()

        // upload files
        const filesFormData: IUploadRequest = new FormData()
        editableArticle.files?.forEach((item) => {
            if (item.file) {
                filesFormData.append('files[]', item.file)
            } else {
                formData.append('attachment[]', item.id as string)
            }
        })

        console.log(JSON.parse(editableArticle.content || '{}'));
        console.log(editableArticle.files);
        

        // if (filesFormData.has('files[]')) {
        //     const result = await filesApi().upload(filesFormData)
        //     const items = result.data.items
        //     items.forEach((fileItem) => {
        //         formData.append('attachment[]', fileItem.id as string)
        //     })
        // }



        // loadingStart()
        // const updatedArticle = await upsertArticle(formData)
        // loadingEnd()




        // if (updatedArticle?.id) {
        //     navigate(getRoute().articles(updatedArticle.id))
        // }

    }, [getFormData])

    return (
        <ArticleEditMainContext.Provider value={{ article: editableArticle, loading, update }}>
            <ArticleEditUtilsContext.Provider value={{ loadingStart, loadingEnd, getFormData, submitHandler }}>
                {children}
            </ArticleEditUtilsContext.Provider>
        </ArticleEditMainContext.Provider>
    );
}

function filterEditorContent(editorJson: any, filterFn: (item: any) => boolean) {
    if (editorJson.content?.length > 0) {
        editorJson.content = editorJson.content.filter(filterFn)
        editorJson.content.forEach((item: any) => filterEditorContent(item, filterFn))
    }
    return editorJson
}


interface IArticleMainContextValue {
    article?: Partial<IEditableArticle>
    loading: boolean
    update(updated: Partial<IEditableArticle>): void
}

interface IArticleUtilsContextValue {
    loadingStart(): void
    loadingEnd(): void
    getFormData(): ICreateRequest
    submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void>
}

interface IArticleEditContextValue {
    uploadImages: UploadImagesFunc
    removeImage(fileItem: IFileItem): void
}

interface IArticleEditContextProviderProps extends React.PropsWithChildren {
    articleId?: number | string
}

interface IEditableArticle extends IArticle {
    imageFile?: File
    image_delete?: boolean
}