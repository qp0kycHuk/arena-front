import { TrashIcon } from '@/assets/icons/stroke'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button, Dialog } from '@/features/ui'
import { useToggle } from '@/hooks/useToggle'
import { IArticle } from '@/models/Article'
import { useArticleRemove } from '@/store/articles/articles.hooks'

interface IRemoveProps {
  article: IArticle
}

export function Remove({ article }: IRemoveProps) {
  const [isConfirmOpen, , openConfirm, closeConfirm] = useToggle()
  const { loading, remove } = useArticleRemove(article)

  return (
    <>
      <Button variant="light" color="red" onClick={openConfirm} disabled={loading}>
        <TrashIcon className="text-2xl " />
      </Button>
      <Dialog isOpen={isConfirmOpen} onClose={loading ? () => null : closeConfirm} className="w-80">
        <ConfirmDialog title="Удалить статью" onCancel={closeConfirm} onConfirm={remove} disabled={loading} />
      </Dialog>
    </>
  )
}
