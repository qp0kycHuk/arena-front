import { ArticleItem, ArticleItemPlacehlder } from '../ArticleItem/ArticleItem';
import { Link } from 'react-router-dom';
import { getRoute } from '@utils/index';
import React from 'react';
import { IArticle } from '@models/Article';

interface IArticleListProps {
    loading?: boolean
    items?: IArticle[]
}


export function ArticleList({ loading, items }: IArticleListProps) {
    const isItemsReady = items && items?.length > 0 && !loading

    return (
        <>
            {loading && new Array(5).fill(1).map((_, index) =>
                <React.Fragment key={index}>
                    <ArticleItemPlacehlder />
                    <div className="border-t border-gray border-opacity-20"></div>
                </React.Fragment>
            )}
            {isItemsReady && items.map((article) =>
                <div key={article.id}>
                    <Link className='peer' to={getRoute().articles(article.id)}>
                        <ArticleItem article={article} />
                    </Link>
                    <div className="border-t border-gray border-opacity-20 peer-hover:opacity-0"></div>
                </div>
            )}
        </>
    );
}
