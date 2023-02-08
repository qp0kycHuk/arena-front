import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IArticle } from "@models/Article";
import { EntityId } from "@reduxjs/toolkit";
import { ICreateRequest, IUpdateRequest, useArticleControl } from "@store/articles";
import { useUserQuery } from "@store/auth";
import type { Editor as EditorType } from '@tiptap/react';
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@hooks/useErrorMessage";
import { toast } from "@lib/Toast";
import { useEditor, useInitialContent, useLinks } from "@features/editor";
import { ILinksController } from "@features/editor/hooks/useLinks";
import { IUploadRequest, useRemoveMutation, useUploadMutation } from "@store/files";
import { IFile } from "@models/File";
import { useFetchArticleById } from "@store/articles/articles.slice";
import { log } from "console";



interface IArticleMainContextValue {
    article?: IArticle
    loading: boolean
}

interface IArticleEditorContextValue {
    editor: EditorType | null
    uploadImages: UploadImagesFunc
}

interface IArticleUtilsContextValue {
    loadingStart(): void
    loadingEnd(): void
    getFormData(): ICreateRequest
}

interface IArticleEditContextValue {
    addedTags: EntityId[]
    setAddedTags?: React.Dispatch<React.SetStateAction<EntityId[]>>
    titleRef: React.RefObject<HTMLDivElement>
    linksController: ILinksController
    submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void>
    uploadImages: UploadImagesFunc
    removeImage(fileItem: IFileItem): void
}


interface IArticleEditContextProviderProps extends React.PropsWithChildren {
    articleId?: number | string
}


export const ArticleEditContext = createContext<IArticleEditContextValue>({} as IArticleEditContextValue)
export const ArticleEditMainContext = createContext<IArticleMainContextValue>({} as IArticleMainContextValue)
export const ArticleEditUtilsContext = createContext<IArticleUtilsContextValue>({} as IArticleUtilsContextValue)
export const ArticleEditEditorContext = createContext<IArticleEditorContextValue>({} as IArticleEditorContextValue)

export const useArticleEditMainContext = () => useContext(ArticleEditMainContext)
export const useArticleEditUtilsContext = () => useContext(ArticleEditUtilsContext)
export const useArticleEditEditorContext = () => useContext(ArticleEditEditorContext)

export function ArticleEditContextProvider({
    children,
    articleId }: IArticleEditContextProviderProps
) {
    const { data: user } = useUserQuery(null)
    const navigate = useNavigate();
    const { createDraftArticle, upsertArticle, manualUpdateArticle } = useArticleControl()
    const [upload] = useUploadMutation()
    const [remove] = useRemoveMutation()

    const article = useFetchArticleById(articleId || '')
    const titleRef = useRef<HTMLDivElement>(null)
    const [addedTags, setAddedTags] = useState<EntityId[]>(article?.tags.map((tag) => tag.id) || [])
    const linksController = useLinks()
    const [loading, setLoading] = useState(false)
    const loadingStart = useCallback(() => setLoading(true), [])
    const loadingEnd = useCallback(() => setLoading(false), [])

    const initialEditorContent = useInitialContent(article?.content, [article?.content]);

    useEffect(() => {
        if (addedTags.length === 0) {
            setAddedTags(article?.tags.map((tag) => tag.id) || [])
        }
    }, [article])

    const options = useMemo(() => {
        return {
            placeholder: 'Напишите статью...',
            config: {
                content: initialEditorContent,
            }
        }
    }, [initialEditorContent])

    const editor = useEditor(options)

    // create form data from edit component states
    // name, editor
    const getFormData = useCallback((): ICreateRequest => {
        const formData: ICreateRequest = new FormData()
        formData.append('name', titleRef?.current?.textContent || '')

        if (editor) {
            formData.append('content', JSON.stringify(editor.getJSON()))
            formData.append('excerpt', editor.getText().substring(0, 100))
        }

        if (!user) {
            throw new Error('user is undefined')
        }

        formData.append('user_id', user.id.toString())

        if (article) {
            (formData as IUpdateRequest).append('id', article.id.toString())
        }

        addedTags.forEach((tagId) => {
            formData.append('tags[]', tagId.toString())
        })

        return formData
    }, [titleRef, article, addedTags, editor, user])

    const submitHandler = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!titleRef?.current?.textContent) {
            titleRef?.current?.focus()
            return;
        }

        const formData = getFormData()

        loadingStart()
        const updatedArticle = await upsertArticle(formData)
        loadingEnd()

        if ((updatedArticle as IArticle).id) {
            navigate('/articles/' + (updatedArticle as IArticle).id)
        }
    }, [getFormData])

    const uploadImages: UploadImagesFunc = useCallback(async (files, beforeUpdate) => {
        // check files
        if (!files.length) return;
        let currentArticle = article

        // Create draft article if article not exist
        if (!article) {
            currentArticle = await createDraftArticle(getFormData())
        }

        if (!currentArticle) {
            toast.error('currentArticle is undefined')
            return
        }

        // create form data
        const formData: IUploadRequest = new FormData()
        formData.append('entity', 'article',)
        formData.append('entity_id', currentArticle.id.toString())
        files.forEach((file) => {
            formData.append('files[]', file)
        })

        // upload files
        const result = await upload(formData)
        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            return
        }

        await beforeUpdate?.((result as IResultWithData<IFile[]>).data)

        manualUpdateArticle({
            ...currentArticle,
            files: [
                ...(currentArticle?.files || []),
                ...(result as IResultWithData<IFile[]>).data
            ]
        })


        if (!article) {
            navigate('/articles/edit/' + currentArticle.id)
        }

        return (result as IResultWithData<IFile[]>).data
    }, [getFormData, article])

    const removeImage = useCallback(async (fileItem: IFileItem) => {
        if (!article) return


        const formData = new FormData()
        formData.append('id', (fileItem as Required<IFileItem>).id.toString())
        formData.append('entity_id', article.id.toString())
        formData.append('entity', 'article')

        // change article state manualy 
        // for interface changed before request fullfiled
        // for no refetch article
        // because article state separately files api
        const editorJson = filterEditorContent(editor?.getJSON(), (item: any) => {
            return !(item.type === 'image' && item.attrs.src === fileItem.src)
        })
        manualUpdateArticle({
            ...article,
            content: editorJson,
            files: article.files.filter((item) => item.id !== fileItem.id)
        })

        loadingStart()
        const result = await remove(formData)
        loadingEnd()

        const errorMessage = getErrorMessage((result as IResultWithError)?.error)
        if (errorMessage) {
            toast.error(errorMessage)
            return
        }

    }, [article])

    return (
        <ArticleEditMainContext.Provider value={{ article, loading, }}>
            <ArticleEditUtilsContext.Provider value={{ loadingStart, loadingEnd, getFormData }}>
                <ArticleEditEditorContext.Provider value={{ editor, uploadImages }}>
                    <ArticleEditContext.Provider value={{
                        addedTags,
                        titleRef,
                        setAddedTags,
                        submitHandler,
                        linksController,
                        uploadImages,
                        removeImage
                    }}>
                        {children}
                    </ArticleEditContext.Provider>
                </ArticleEditEditorContext.Provider>
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