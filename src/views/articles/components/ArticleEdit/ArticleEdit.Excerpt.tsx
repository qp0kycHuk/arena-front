import { useArticleEditMainContext } from './ArticleEdit.Context'

export function Excerpt() {
  const { article, update } = useArticleEditMainContext()

  return (
    <>
      <div className="font-semibold mb-2">Анонс</div>
      <textarea
        className="input w-full rounded-lg h-40 resize-none"
        value={article?.excerpt}
        onChange={(e) => update({ excerpt: e.target.value })}
      ></textarea>
    </>
  )
}
