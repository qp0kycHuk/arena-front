import { PropsWithChildren } from 'react';
import { UploaderFileDrop } from './UploaderFileDrop';
import { UploaderItems } from './UploaderItems';
import { UploaderLabel } from './UploaderLabel';


interface IUploaderProps extends PropsWithChildren {
    uploader: IUplodaer
}

export function Uploader({ uploader, children }: IUploaderProps) {
    const isNonMultipleAccept = !(!uploader.multiple && uploader.fileItems.length > 0)

    return (
        <div className='flex gap-3 flex-wrap relative'>
            {children ? <div className="w-full">{children}</div> : null}
            {isNonMultipleAccept ? <UploaderFileDrop uploader={uploader} /> : null}
            <UploaderItems uploader={uploader} />
            {isNonMultipleAccept ? <UploaderLabel uploader={uploader} /> : null}
        </div>
    );
}
