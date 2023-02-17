import { useParams } from 'react-router-dom';
import { ArticleEdit } from '@features/articles';
import { Button } from '@features/ui';
import { ToLeftIcon } from '@assets/icons/stroke';
import { ArticleEditContextProvider } from '../components/ArticleEdit/ArticleEdit.Context';
import { PageContent } from '@layouts/PageContent';
import { useDocumentTitle } from '@hooks/useDocumentTitle';

interface IArticleEditPageProps { }

export function ArticleEditPage(props: IArticleEditPageProps) {
    const { id } = useParams()
    useDocumentTitle(id ? 'Редактировать' : 'Создать')

    return (
        <PageContent className='p-8'>
            <Button variant='text' size='small' className='mb-5'>
                <ToLeftIcon className="mr-2" />
                Назад
            </Button>
            <ArticleEditContextProvider articleId={id}>
                <ArticleEdit articleId={id?.toString()} />
            </ArticleEditContextProvider>
        </PageContent>
    );
}