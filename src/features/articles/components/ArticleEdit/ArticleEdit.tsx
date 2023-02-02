import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserQuery } from '@store/auth';
import { ICreateRequest, IUpdateRequest, useArticleControl, useGetByIdQuery } from '@store/articles';
import { Editor, EditorControl, useEditor, useInitialContent, Links, useLinks } from '@features/editor';
import { Button } from '@features/ui';
import { Spiner } from '@components/Spiner';
import { IArticle } from '@models/Article';
import { toast } from '@lib/Toast';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { ArticleEditImages } from './ArticleEdit.Images';
import { ArticleEditAnons } from './ArticleEdit.Anons';
import { ArticleEditTags } from './ArticleEdit.Tags';
import { EntityId } from '@reduxjs/toolkit';
import { filterFiles } from '@utils/index';
import { docExtention, imageExtention } from '@utils/const/extentions';
import { ArticleEditEditor } from './ArticleEdit.Editor';
import type { Editor as EditorType } from '@tiptap/react';

interface IArticleEditProps {
    articleId?: string | number
}

// TODO links, editor images, editor files

export function ArticleEdit({ articleId }: IArticleEditProps) {
    const { data: article } = useGetByIdQuery(articleId || '')
    const { data: user } = useUserQuery(null)
    const { upsertArticle } = useArticleControl()
    const navigate = useNavigate();
    const titleRef = useRef<HTMLDivElement>(null);
    const [addedTags, setAddedTags] = useState<EntityId[]>(article?.tags.map((tag) => tag.id) || [])
    const [loading, setLoading] = useState(false)
    const loadingStart = () => setLoading(true)
    const loadingEnd = () => setLoading(false)

    const editorRef = useRef<EditorType>(null)

    console.log(editorRef);


    const linksController = useLinks();

    // create form data from edit component states
    // name, editor
    const getFormData = useCallback((): ICreateRequest => {
        const formData: ICreateRequest = new FormData()
        formData.append('name', titleRef.current?.textContent || '')

        if (editorRef.current) {
            formData.append('content', JSON.stringify(editorRef.current.getJSON()))
            formData.append('excerpt', editorRef.current.getText().substring(0, 100))
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
    }, [titleRef, article, addedTags])

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!titleRef.current?.textContent) {
            titleRef.current?.focus()
            return;
        }

        const formData = getFormData()

        loadingStart()
        const result = await upsertArticle(formData)
        loadingEnd()

        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            return
        }

        const updatedArticle = (result as IResultWithData<IArticle>).data
        navigate('/articles/' + updatedArticle.id)
    }



    return (
        <form className="" onSubmit={submitHandler}>
            <div className="text-[26px] font-semibold mb-7">Новая статья</div>
            <div className="border border-gray border-opacity-30 rounded-2xl">
                <div className="px-8 py-6">
                    <div ref={titleRef} className='mb-8 text-3xl width-placeholder'
                        contentEditable data-placeholder='Введите название статьи'
                        dangerouslySetInnerHTML={{ __html: article?.name || '' }}
                        onInput={() => {
                            if (titleRef.current) {
                                titleRef.current.innerHTML = titleRef.current.textContent || ''
                                const selection = window.getSelection();
                                const range = document.createRange();
                                selection?.removeAllRanges();
                                range.selectNodeContents(titleRef.current);
                                range.collapse(false);
                                selection?.addRange(range);
                                titleRef.current.focus();
                            }
                        }} ></div>

                    <ArticleEditEditor
                        ref={editorRef}
                        article={article}
                        getFormData={getFormData}
                        onStartTransition={() => { setLoading(true) }}
                        onEndTransition={() => { setLoading(false) }}
                    />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditAnons
                        article={article}
                        getFormData={getFormData}
                        onStartTransition={loadingStart}
                        onEndTransition={loadingEnd}
                    />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditImages
                        article={article}
                        getFormData={getFormData}
                        onStartTransition={() => { setLoading(true) }}
                        onEndTransition={() => { setLoading(false) }}
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
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditTags
                        addedTags={addedTags}
                        setAddedTags={setAddedTags}
                        onStartTransition={loadingStart}
                        onEndTransition={loadingEnd} />
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <Button type='submit' disabled={loading}>{loading ? <Spiner /> : 'Сохранить'}</Button>
                <Button variant='light'>Отмена</Button>
            </div>
        </form>
    );
}


