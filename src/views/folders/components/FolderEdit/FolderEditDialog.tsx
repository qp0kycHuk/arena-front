import React from 'react'
import { Spiner } from '@components/Spiner'
import { Button, Dialog, DialogHeader, DialogTitle, Input } from '@features/ui'
import { useLoading } from '@hooks/useLoading'
import { useAuth } from '@store/auth'
import { useParams } from 'react-router-dom'
import { IFolder } from '@models/Folder'
import { useUpsertFolder } from '@store/folders'
import { toast } from '@/lib/Toast'
import { showAsyncError } from '@/utils/helpers/errors'
import { AxiosError } from 'axios'

interface IFolderEditDialogProps extends React.ComponentProps<typeof Dialog> {
  item?: IFolder
  onCancel?(): unknown
}

export function FolderEditDialog({ item, isOpen, onClose }: IFolderEditDialogProps) {
  const { folderId } = useParams()
  const { loading, loadingStart, loadingEnd } = useLoading()
  const { mutateAsync: upsert } = useUpsertFolder()
  const { data: auth } = useAuth()
  const user = auth?.user
  const dialogTitle = item ? 'Редактировать' : 'Создать папку'

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    loadingStart()
    const formData = new FormData(event.target as HTMLFormElement)

    if (user) {
      // formData.append('owner_id', user.id.toString())
    } else {
      return
    }

    if (!item && folderId) {
      formData.append('parent_id', folderId)
    }

    if (item) {
      formData.append('id', item.id.toString())
    }

    try {
      await upsert(formData)
      toast.success('Успешно сохранено')
      onClose()
    } catch (error) {
      showAsyncError(((error as AxiosError).response?.data || error) as IErrorData)
    }

    loadingEnd()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="w-80">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler} className="px-6 py-8">
          <label className="block">
            <div className="mb-2 text-sm font-semibold">Название</div>
            <Input defaultValue={item?.name} name="name" className="w-full" required />
          </label>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Button type="submit" disabled={loading}>
              {loading ? <Spiner /> : 'Сохранить'}
            </Button>
            <Button variant="light" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
