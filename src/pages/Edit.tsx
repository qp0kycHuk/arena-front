import { Editor, EditorControl, useEditor, useTitleEditor } from '@features/editor';
import { testContent } from '@features/editor/data';
import { Uploader } from '@features/fileUploader/components/Uploader';
import { useUploader } from '@features/fileUploader/hooks/useUploader';
import { getRandomUUID } from '@lib/uniqueId';
import { videoExtention } from '@const/extentions';

interface IEditProps {

}

const article = {
    title: 'Название статьи',
    content: testContent,
    anons: {
        id: getRandomUUID(),
        src: 'https://sun2-12.userapi.com/impg/lYOgQO94bRux0SIqvLVwem5xE2cpb1rn1_4Uag/CVdyE82tCFo.jpg?size=512x768&quality=96&sign=175b02044120b5b2bf5b4a63d079d7d9&type=album',
    },
    images: [
        {
            id: getRandomUUID(),
            src: 'https://sun2-9.userapi.com/impg/InXUsszuMHSRmtzzQ-Md7haF-mc0h8WA5xHhGg/h9QccwYrYpA.jpg?size=1080x1350&quality=95&sign=6c34e3483e3efeb06be54d73a04ee1f9&c_uniq_tag=ceOj9zkcwEIlQpmqrlAnxHq-SqkYsZLgdb4GkdbrZhY&type=album',
            title: 'Подпись к картинке'
        }
    ]
}

export function Edit(props: IEditProps) {
    const editor = useEditor({
        placeholder: 'Напишите статью...',
        config: {
            // content: article.content
        }
    })

    const titleEditor = useTitleEditor({
        placeholder: 'Введите название статьи',
        config: {
            // content: article.title
        }
    })

    const anonsUploader = useUploader({
        initialFiles: [article.anons],
        multiple: false
    })

    const imageUploader = useUploader({
        initialFiles: article.images,
    })

    const videoUploader = useUploader({
        extention: videoExtention,
    })

    return (
        <div className="relative flex-grow p-8 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white">
            <div className="border border-gray border-opacity-30 rounded-2xl">
                <div className="px-8 py-6">
                    <Editor className='mb-8' editor={titleEditor} />
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
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <Uploader uploader={videoUploader} >
                        <div className="font-semibold">Видео</div>
                    </Uploader>
                </div>
            </div>
        </div>
    );
}