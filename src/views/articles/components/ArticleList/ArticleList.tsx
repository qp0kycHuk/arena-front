import { ArticleItem, ArticleItemPlacehlder } from '../ArticleItem/ArticleItem'
import { Link } from 'react-router-dom'
import { getRoute } from '@utils/index'
import React from 'react'
import { IArticle } from '@models/Article'
import { ArticleitemDragDrop } from '../ArticleItem/ArticleItem.DragDrop'

interface IArticleListProps {
  loading?: boolean
  items?: IArticle[]
  draggable?: boolean
}

export function ArticleList({ loading, items, draggable }: IArticleListProps) {
  const isItemsReady = items && items?.length > 0 && !loading

  return (
    <>
      {loading &&
        new Array(4).fill(1).map((_, index) => (
          <React.Fragment key={index}>
            <ArticleItemPlacehlder />
            <div className="border-t border-default/10"></div>
          </React.Fragment>
        ))}
      {isItemsReady &&
        items.map(
          (article) =>
            article && (
              <div key={article.id}>
                <Link className="peer" to={getRoute().articles(article.id)}>
                  {draggable ? <ArticleitemDragDrop article={article} /> : <ArticleItem article={article} />}
                </Link>
                <div className="border-t border-default/10 peer-hover:opacity-0"></div>
              </div>
            )
        )}
    </>
  )
}
