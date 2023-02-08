

interface IUplodaer {
    extention: IExtention
    fileItems: IFileItem[]
    addItems: (items: File[]) => void
    updateItem: (item: IFileItem, data: Partial<IFileItem>) => void
    removeItem: (item: IFileItem) => void
    multiple?: boolean
}