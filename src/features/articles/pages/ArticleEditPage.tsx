import { useParams } from 'react-router-dom';
import { ArticleEdit as EditComponent } from '@features/articles';
import { Button } from '@features/ui';
import { ToLeftIcon } from '@assets/icons/stroke';

interface IArticleEditPageProps { }

export function ArticleEditPage(props: IArticleEditPageProps) {
    const { id } = useParams()

    return (
        <div className="relative flex-grow p-8 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white" >
            <Button variant='text' size='small' className='mb-5'>
                <ToLeftIcon className="mr-2" />
                Назад
            </Button>

            <EditComponent articleId={id} />
        </div>
    );
}