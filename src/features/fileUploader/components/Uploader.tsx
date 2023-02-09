import { PropsWithChildren } from 'react';
import { UploaderFileDrop } from './UploaderFileDrop';
import { UploaderItems } from './UploaderItems';
import { UploaderLabel } from './UploaderLabel';
import { useUploader } from '../hooks/useUploader';


interface IUploaderProps extends PropsWithChildren {
    fileItems?: IFileItem[]
    extention?: IExtention
    multiple?: boolean
    onChange?: (fileItems: IFileItem[]) => any
    onRemove?: (fileItem: IFileItem) => any
}

export function Uploader({
    fileItems,
    extention,
    multiple,
    onChange,
    onRemove,
    children
}: IUploaderProps
) {
    const uploader = useUploader({
        multiple,
        initialFiles: fileItems,
        onChange,
        onRemove
    })

    const isNonMultipleAccept = !(!uploader.multiple && uploader.fileItems.length > 0)

    return (
        <div className='relative flex flex-wrap gap-3'>
            {children ? <div className="w-full">{children}</div> : null}
            <UploaderFileDrop uploader={uploader} />
            <UploaderItems uploader={uploader} />
            {isNonMultipleAccept ? <UploaderLabel uploader={uploader} /> : null}
        </div>
    );
}
