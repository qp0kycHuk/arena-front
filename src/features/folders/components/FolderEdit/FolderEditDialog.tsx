import { Spiner } from "@components/Spiner";
import { Button, Dialog, Input } from "@features/ui";
import { IDialogProps } from "@features/ui/components/Dialog";
import { useLoading } from "@hooks/useLoading";
import { useFolderControl } from "@store/folders/folders.hooks";
import { useAuth } from "@store/auth";


interface IFolderEditDialogProps extends IDialogProps {
    onCancel?(): any
}

export function FolderEditDialog({ isOpen, close }: IFolderEditDialogProps) {
    const { user } = useAuth()
    const { loading, loadingStart, loadingEnd } = useLoading()
    const { upsert } = useFolderControl()

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        loadingStart()
        const formData = new FormData(event.target as HTMLFormElement)
        
        if (user) {
            formData.append('owner_id', user.id.toString())
        }

        const response = await upsert(formData)
        close()
        loadingEnd()
    }

    return (
        <Dialog isOpen={isOpen} close={close}>
            <div className="overflow-hidden bg-white w-80 rounded-2xl">
                <div className="p-4 text-center bg-gray-200">
                    <div className="text-2xl font-semibold">Создать папку</div>
                </div>
                <form onSubmit={submitHandler} className="px-6 py-8">

                    <label className="block">
                        <div className="mb-2 text-sm font-semibold">Название</div>
                        <Input name="name" className="w-full" required />
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-8">
                        <Button type="submit" disabled={loading}>{loading ? <Spiner /> : 'Сохранить'}</Button>
                        <Button variant="light" onClick={close}>Отмена</Button>
                    </div>

                </form>
            </div>
        </Dialog>
    );
}