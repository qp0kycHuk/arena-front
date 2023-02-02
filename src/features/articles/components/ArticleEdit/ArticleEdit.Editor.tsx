import { Editor, EditorControl, useEditor, useInitialContent } from "@features/editor";
import { getErrorMessage } from "@hooks/useErrorMessage";
import { toast } from "@lib/Toast";
import { IArticle } from "@models/Article";
import { IFile } from "@models/File";
import { ICreateRequest, useArticleControl } from "@store/articles";
import { articlesApi } from "@store/articles/articles.api";
import { IUploadRequest, useRemoveMutation, useUploadMutation } from "@store/files";
import { useAppDispatch } from "@store/index";
import { docExtention, imageExtention } from "@utils/const/extentions";
import { filterFiles } from "@utils/index";
import { useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Editor as EditorType } from '@tiptap/react';
import React from "react";

// TODO try remove duplicate with ArticleEditImages component

interface IArticleEditEditorProps {
    article?: IArticle
    getFormData(): ICreateRequest
    onStartTransition?(): void
    onEndTransition?(): void
}

export type ArticleEditEditorRef = React.ForwardedRef<EditorType | null>

export function ArticleEditEditorComponent({
    article,
    getFormData,
    onStartTransition,
    onEndTransition }: IArticleEditEditorProps,
    ref: ArticleEditEditorRef
) {
    const dispatch = useAppDispatch()
    const { createDraftArticle } = useArticleControl()
    const [upload] = useUploadMutation()
    const [remove] = useRemoveMutation()
    const navigate = useNavigate();

    const initialEditorContent = useInitialContent(article?.content, [article]);

    const options = useMemo(() => {
        return {
            placeholder: 'Напишите статью...',
            filePasteHandler,
            config: {
                content: initialEditorContent
            }
        }
    }, [article, getFormData])

    const editor = useEditor(options)
    
    if (typeof ref == 'function') {
        ref(editor)
    }
    if (typeof ref == 'object' && ref) {
        ref.current = editor
    }


    async function filePasteHandler(files: File[], editor: EditorType) {
        const images = filterFiles(files, [imageExtention.regex])
        // const documents = filterFiles(files, [docExtention.regex])
        console.log(images);
        console.log(article);


        onStartTransition?.()
        const uploadedFiles = await uploadImages(images) || []
        const insertImages = uploadedFiles.map((item) => ({
            type: 'image',
            attrs: {
                src: process.env.REACT_APP_API_URL + item.src,
            },
        }))
        console.log(insertImages);

        // const insertDocs = pasteDocHandler(documents)
        console.log(editor);

        editor?.chain().focus().insertContent([
            ...insertImages,
            // ...insertDocs,
        ]).run()
        onEndTransition?.()
    }

    async function uploadImages(files: File[]): Promise<IFile[] | undefined> {
        // check files
        if (!files.length) return;
        let currentArticle = article

        // Create draft article if article not exist
        if (!article) {
            const createDraftResult = await createDraftArticle(getFormData())
            currentArticle = (createDraftResult as { data: IArticle; }).data
            const errorMessage = getErrorMessage((createDraftResult as IResultWithError)?.error)

            if (errorMessage) {
                toast.error(errorMessage)
                return
            }
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

        // change article state manualy 
        // for no refetch article
        // because article state separately files api
        dispatch(articlesApi.util.updateQueryData('getById', currentArticle.id.toString(), (draft) => {
            Object.assign(draft, {
                files: [
                    ...draft.files,
                    ...(result as IResultWithData<IFile[]>).data
                ]
            })
        }))

        if (!article) {
            navigate('/articles/edit/' + currentArticle.id)
        }

        return (result as IResultWithData<IFile[]>).data
    }

    return (
        <div>
            <EditorControl editor={editor} className='sticky z-10 -ml-4 -mr-4 top-2' />
            <Editor editor={editor} className='min-h-[260px] flex flex-col' />
        </div>
    );
}

export const ArticleEditEditor = React.forwardRef(ArticleEditEditorComponent)