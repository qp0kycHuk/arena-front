import { Button } from '@features/ui';
import { ToLeftIcon } from '@assets/icons/stroke';
import { useParams } from 'react-router-dom';
import { ArticleCreate, ArticleUpdate } from '@features/articles';
import { testContent } from '@features/editor/data';


interface IEditProps { }

const article = {
    title: 'Название статьи',
    content: testContent,
    // anons: {
    //     id: getRandomUUID(),
    //     src: 'https://sun2-12.userapi.com/impg/lYOgQO94bRux0SIqvLVwem5xE2cpb1rn1_4Uag/CVdyE82tCFo.jpg?size=512x768&quality=96&sign=175b02044120b5b2bf5b4a63d079d7d9&type=album',
    // },
    images: [
        // {
        //     id: getRandomUUID(),
        //     src: 'https://sun2-9.userapi.com/impg/InXUsszuMHSRmtzzQ-Md7haF-mc0h8WA5xHhGg/h9QccwYrYpA.jpg?size=1080x1350&quality=95&sign=6c34e3483e3efeb06be54d73a04ee1f9&c_uniq_tag=ceOj9zkcwEIlQpmqrlAnxHq-SqkYsZLgdb4GkdbrZhY&type=album',
        //     title: 'Подпись к картинке'
        // }
    ]
}

export function Edit(props: IEditProps) {
    const { id } = useParams()


    return (
        <div className="relative flex-grow p-8 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white" >
            <Button variant='text' size='small' className='mb-5'>
                <ToLeftIcon className="mr-2" />
                Назад
            </Button>

            {id ? <ArticleUpdate articleId={id} /> : <ArticleCreate />}
        </div>
    );
}