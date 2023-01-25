import { useMemo } from 'react';
import { editorExtensions } from '@features/editor';
import { useGetByIdQuery } from '@store/articles';
import { generateHTML } from '@tiptap/html'
import { BookmarkIcon, PencilIcon } from '@assets/icons/stroke';
import { Button } from '@features/ui';

interface IArticleViewProps {
    articleId: string | number
}

export function ArticleView({ articleId }: IArticleViewProps) {
    const { data: article } = useGetByIdQuery(articleId)

    const htmlBody = useMemo(() => {
        try {
            const json = article?.content ? JSON.parse(article.content) : null
            return json ? generateHTML(json, editorExtensions) : ''
        } catch (error) {
            return article?.content ? article.content : ''
        }
    }, [article]);




    return (
        <div className="relative flex-grow bg-white rounded-2xl dark:bg-opacity-5 dark:text-white flex" >
            <div className='flex-1 p-8'>
                <div className="flex items-center mb-7">
                    <div className="rounded-xl h-20 w-28 mr-6 self-start overflow-hidden">
                        <img src={article?.image || '/img/test.jpg'} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className="text-2xl font-semibold"> {article?.name}  </div>
                </div>

                <div className='ProseMirror'
                    dangerouslySetInnerHTML={{ __html: htmlBody }}></div>

            </div>
            <div className='min-w-[266px] w-[266px] py-8 px-6 border-l border-gray border-opacity-30'>
                <div className="flex gap-4">
                    <Button variant='contur' color='gray'>
                        <PencilIcon className="text-2xl" />
                    </Button>
                    <Button variant='contur' color='gray'>
                        <BookmarkIcon className="text-2xl" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
