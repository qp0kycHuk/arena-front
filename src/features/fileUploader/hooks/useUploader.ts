import { imageExtention } from "@utils/const/extentions";
import { filterFiles,getRandomUUID } from "@utils/index";
import { useCallback, useState } from "react";

interface IUploaderParams {
    initialFiles?: IFileItem[]
    extention?: IExtention
    multiple?: boolean
}

export function useUploader({ initialFiles = [], extention = imageExtention, multiple = true }: IUploaderParams): IUplodaer {
    const [fileItems, setFileItems] = useState<IFileItem[]>(initialFiles || []);

    const addItems = useCallback((items: File[]) => {
        const newItems = filterFiles(items, extention ? [extention.regex] : [])
            .map((file) => ({ key: getRandomUUID(), file, title: file.name }))
        console.log(newItems);

        setFileItems((prevItems) => [
            ...(multiple ? prevItems : []),
            ...(multiple ? newItems : newItems[0] ? [newItems[0]] : [])
        ])
    }, [extention, multiple])

    const updateItem = useCallback((item: IFileItem, data: Partial<IFileItem>) => {
        const changedItem = {
            ...item,
            ...data
        }

        setFileItems((prevItems) => {
            return prevItems.map((el) => el === item ? changedItem : el)
        })
    }, [])

    const removeItem = useCallback((item: IFileItem) => {
        setFileItems((prevItems) => {
            return prevItems.filter((el) => el !== item)
        })
    }, [])

    return {
        extention: extention || imageExtention,
        multiple,
        fileItems,
        addItems,
        updateItem,
        removeItem
    }
}