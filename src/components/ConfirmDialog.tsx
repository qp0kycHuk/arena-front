import { Button, DialogHeader, DialogTitle } from '@features/ui'

interface IConfirmDialogProps extends React.PropsWithChildren {
  title?: string
  confirmText?: string
  onConfirm?: () => void
  cancelText?: string
  onCancel?: () => void
  disabled?: boolean
}

export function ConfirmDialog({
  title = 'Вы уверены?',
  confirmText = 'Да',
  onConfirm,
  cancelText = 'Нет',
  onCancel,
  children,
  disabled = false,
}: IConfirmDialogProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="p-8 ">
        {children}

        <div className="grid grid-cols-2  gap-4 w-full">
          <Button onClick={onConfirm} disabled={disabled}>
            {confirmText}
          </Button>
          <Button variant="light" onClick={onCancel} disabled={disabled}>
            {cancelText}
          </Button>
        </div>
      </div>
    </>
  )
}
