import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useUserQuery } from '@store/auth';
import { ICreateRequest, useArticleControl, useGetByIdQuery } from '@store/articles';
import { videoExtention } from '@utils/const/extentions';
import { Editor, EditorControl, useEditor, useInitialContent } from '@features/editor';
import { Links } from '@features/editor/components/Links/Links';
import { useLinks } from '@features/editor/hooks/useLinks';
import { Uploader, useUploader } from '@features/fileUploader';
import { Button } from '@features/ui';
import { Spiner } from '@components/Spiner';
import { IArticle } from '@models/Article';
import { useNavigate } from 'react-router-dom';
import { toast } from '@lib/Toast';
import { ARTICLE_ERROR_CREATE, ARTICLE_ERROR_UPDATE, ARTICLE_SUCCESS_CREATE, ARTICLE_SUCCESS_UPDATE } from '../../const/Text';

import { ArticleEditImages } from './ArticleEdit.Images';
import { ArticleEditAnons } from './ArticleEdit.Anons';

interface IArticleEditProps {
    articleId?: string | number
}

export function ArticleEdit({ articleId }: IArticleEditProps) {
    const { data: article, refetch: refetchArticle } = useGetByIdQuery(articleId || '')
    const [loading, setLoading] = useState(false)
    const titleRef = useRef<HTMLDivElement>(null);
    const { data: user } = useUserQuery(null)
    const {
        createDraftArticle,
        updateArticle,
        createArticle
    } = useArticleControl()

    const navigate = useNavigate();

    const {
        editor,
        anonsUploader,
        videoUploader,
        linksController,
    } = useArticleEdit(article)

    function getFormData(): ICreateRequest {
        const formData: ICreateRequest = new FormData()
        formData.append('name', titleRef.current?.textContent || '')

        if (editor) {
            formData.append('content', JSON.stringify(editor.getJSON()))
            formData.append('excerpt', editor.getText().substring(0, 100))
        }

        if (!user) {
            throw new Error('user is undefined')
        }

        formData.append('user_id', user.id.toString())

        return formData
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!titleRef.current?.textContent) {
            titleRef.current?.focus()
            return;
        }

        const formData = getFormData()

        setLoading(true)
        // await onSubmit(formData as ICreateRequest)
        setLoading(false)
    }

    return (
        <form className="" onSubmit={submitHandler}>
            <div className="text-[26px] font-semibold mb-7">Новая статья</div>
            <div className="border border-gray border-opacity-30 rounded-2xl">
                <div className="px-8 py-6">
                    <div ref={titleRef} className='mb-8 text-3xl width-placeholder'
                        contentEditable data-placeholder='Введите название статьи'
                        dangerouslySetInnerHTML={{ __html: article?.name || '' }} ></div>
                    <EditorControl editor={editor} className='sticky z-10 -ml-4 -mr-4 top-2' />
                    <Editor className='min-h-[260px] flex flex-col' editor={editor} />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditAnons
                        article={article}
                        getFormData={getFormData}
                        onStartTransition={() => { setLoading(true) }}
                        onEndTransition={() => { setLoading(false) }}
                        onUpload={(currentArticle) => {
                            if (articleId) {
                                refetchArticle()
                            } else {
                                navigate('/articles/edit/' + currentArticle.id)
                            }
                        }}
                    />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditImages
                        article={article}
                        getFormData={getFormData}
                        onStartTransition={() => { setLoading(true) }}
                        onEndTransition={() => { setLoading(false) }}
                        onUpload={(currentArticle) => {
                            if (articleId) {
                                refetchArticle()
                            } else {
                                navigate('/articles/edit/' + currentArticle.id)
                            }
                        }}
                    />
                </div>
                {/* <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <Uploader uploader={videoUploader} >
                        <div className="font-semibold">Видео</div>
                    </Uploader>
                </div> */}
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <Links controller={linksController}></Links>
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <Button type='submit' disabled={loading}>{loading ? <Spiner /> : 'Сохранить'}</Button>
                <Button variant='light'>Отмена</Button>
            </div>
        </form>
    );
}


function useArticleEdit(article?: IArticle) {
    const initialEditorContent = useInitialContent(article?.content, [article]);

    const editor = useEditor({
        placeholder: 'Напишите статью...',
        config: {
            content: initialEditorContent
        }
    })

    const anonsUploader = useUploader({
        // initialFiles: [article.anons],
        multiple: false
    })





    const videoUploader = useUploader({
        extention: videoExtention,
    })

    const linksController = useLinks();

    return {
        editor,
        anonsUploader,
        // imageUploader,
        videoUploader,
        linksController,
    }
}