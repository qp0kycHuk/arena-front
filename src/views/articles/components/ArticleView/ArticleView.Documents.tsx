import { DocumentIcon } from '@/assets/icons/stroke'
import { Skeleton } from '@/components/Skeleton'
import { IArticle } from '@/models/Article'
import classNames from 'classnames'

interface IDocumentsProps {
  article?: IArticle
  isLoading?: boolean
  className?: string
}

export function Documents({ article, isLoading, className }: IDocumentsProps) {
  if (!article || isLoading) {
    return (
      <div className={classNames(className, 'flex flex-wrap gap-6')}>
        {new Array(3).fill(1).map((_, index) => {
          return <Skeleton className="h-40 w-52 rounded-xl " key={index} />
        })}
      </div>
    )
  }

  if (!article?.docs?.length) {
    return null
  }

  return (
    <div className={className}>
      <div className="mb-5 font-semibold">Документы</div>
      <div className="flex flex-wrap gap-6">
        {article?.docs.map((item) => (
          <a key={item.id} href={item.src || ''} target="_blank" rel="noreferrer">
            <div className="h-40 overflow-hidden w-52 rounded-xl bg-default/5 flex flex-col items-center justify-center gap-3">
              <DocumentIcon className="text-5xl text-primary" />
              <div className="overflow-hidden truncate">{item.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
