import { ArticleView as ViewComponent } from '@features/articles';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export interface IArticleViewProps {
}

export function ArticleView(props: IArticleViewProps) {
    const { id } = useParams()

    return (<>
        {id ? <ViewComponent articleId={id} /> : 'Loading..'}
    </>);
}
