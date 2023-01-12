import { UploaderItem } from './UploaderItem';

interface IUploaderItemsProps {
    uploader: IUplodaer
}

export function UploaderItems({ uploader }: IUploaderItemsProps) {
    return (<>
        {uploader.fileItems.map((item) => (
            <UploaderItem
                key={item.id || item.key}
                item={item}
                extention={uploader.extention}
                update={uploader.updateItem}
                remove={uploader.removeItem} />
        ))}
    </> );
}
