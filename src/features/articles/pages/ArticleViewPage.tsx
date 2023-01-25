import { ArticleView as ViewComponent } from '@features/articles';
import { useParams } from 'react-router-dom';

export interface IArticleViewPageProps {
}

export function ArticleViewPage(props: IArticleViewPageProps) {
    const { id } = useParams()

    return (<>
        {id ? <ViewComponent articleId={id} /> : 'Loading..'}
    </>);
}
