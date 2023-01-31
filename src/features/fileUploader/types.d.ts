
interface IFileItem {
    id?: string | number
    key?: string
    src?: string
    preview?: string
    title?: string
    file?: File
    extention?: IExtention
}

interface IUplodaer {
    extention: IExtention
    fileItems: IFileItem[]
    addItems: (items: File[]) => void
    updateItem: (item: IFileItem, data: Partial<IFileItem>) => void
    removeItem: (item: IFileItem) => void
    multiple?: boolean
}