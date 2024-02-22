import { IArticle } from '@/models/Article'
import { useDrag } from 'react-dnd'
import { ArticleItem } from './ArticleItem'

interface IArticleitemDragDropProps {
  article: IArticle
}

export function ArticleitemDragDrop({ article }: IArticleitemDragDropProps) {
  const [collected, drag] = useDrag(() => ({
    type: 'article',
    item: article,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag}>
      <ArticleItem article={article} />
    </div>
  )
}
