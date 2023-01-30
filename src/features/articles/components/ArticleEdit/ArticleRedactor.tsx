import * as React from 'react';
import { useMemo, useRef, useState } from 'react';
import { useUserQuery } from '@store/auth';
import type { ICreateRequest, IUpdateRequest } from '@store/articles';
import { videoExtention } from '@utils/const/extentions';
import { Editor, EditorControl, useEditor } from '@features/editor';
import { Links } from '@features/editor/components/Links/Links';
import { useLinks } from '@features/editor/hooks/useLinks';
import { Uploader, useUploader } from '@features/fileUploader';
import { Button } from '@features/ui';
import { Spiner } from '@components/Spiner';
import { IArticle } from '@models/Article';

interface IArticleRedactorProps {
    article?: IArticle
    onSubmit: (data: ICreateRequest | IUpdateRequest) => void
}

export function ArticleRedactor({ onSubmit, article }: IArticleRedactorProps) {
    const { data: user } = useUserQuery(null)
    const titleRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false)

    const initialContent = useMemo(() => {
        try {
            return article?.content ? JSON.parse(article.content) : ''
        } catch (error) {
            return article?.content ? article.content : ''
        }
    }, [article]);


    const editor = useEditor({
        placeholder: 'Напишите статью...',
        config: {
            content: initialContent
        }
    })

    const anonsUploader = useUploader({
        // initialFiles: [article.anons],
        multiple: false
    })

    const imageUploader = useUploader({})

    // const videoUploader = useUploader({
    //     extention: videoExtention,
    // })

    const linksController = useLinks();

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData: Partial<ICreateRequest> = {}

        if (!titleRef.current?.textContent) {
            titleRef.current?.focus()
            return;
        }

        formData.name = titleRef.current?.textContent

        if (editor) {
            formData.content = JSON.stringify(editor.getJSON())
            formData.excerpt = editor.getText().substring(0, 100)
        }

        formData.user_id = user?.id

        setLoading(true)
        await onSubmit(formData as ICreateRequest)
        setLoading(false)
    }

    return (
        <form className="" onSubmit={submitHandler}>
            <div className="text-[26px] font-semibold mb-7">Новая статья</div>
            <div className="border border-gray border-opacity-30 rounded-2xl">
                <div className="px-8 py-6">
                    <div ref={titleRef} className='text-3xl width-placeholder mb-8'
                        contentEditable data-placeholder='Введите название статьи'
                        dangerouslySetInnerHTML={{ __html: article?.name || '' }} ></div>
                    <EditorControl editor={editor} className='sticky z-10 -ml-4 -mr-4 top-2' />
                    <Editor className='min-h-[260px] flex flex-col' editor={editor} />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                 <div className="px-8 py-6">
                    <Uploader uploader={anonsUploader} >
                        <div className="font-semibold">Анонсовое изображение</div>
                    </Uploader>
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <Uploader uploader={imageUploader} >
                        <div className="font-semibold">Дополнительные изображения</div>
                    </Uploader>
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
            <div className="flex mt-8 gap-4">
                <Button type='submit' disabled={loading}>{loading ? <Spiner /> : 'Сохранить'}</Button>
                <Button variant='light'>Отмена</Button>
            </div>
        </form>
    );
}
