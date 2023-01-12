import { useEffect } from 'react';
import { Button } from '@features/ui';
import { CrossIcon, DocumentIcon, ImageIcon } from '@assets/icons/stroke';
import { getFilePreview } from '@utils/getFileImagePreview';

interface IUpliaderItemProps {
    item: IFileItem
    extention?: IExtention
    update: (item: IFileItem, data: Partial<IFileItem>) => void
    remove: (item: IFileItem) => void
}

export function UploaderItem({ item, extention, update, remove }: IUpliaderItemProps) {
    const isMedia = extention?.type === 'image' || extention?.type === 'video'


    useEffect(() => {
        if (!item.src && item.file && isMedia) {
            getFilePreview(item.file)
                .then((result) => {
                    update(item, { preview: result?.toString() })
                })
        }
    }, [isMedia, item, update])

    return (
        <div className='relative z-10 w-32'>
            <div className='relative h-24  w-full'>
                {((item.preview || item.src) && isMedia) ?
                    <img className='w-full h-full rounded-xl object-cover' src={item.preview || item.src} alt="" /> :
                    <div className="w-full h-full rounded-xl flex bg-primary bg-opacity-10 p-2">
                        <div className="m-auto max-w-full">
                            {isMedia ?
                                <ImageIcon className="text-3xl text-gray" />
                                :
                                <div className='flex flex-col items-center'>
                                    <DocumentIcon className="text-3xl text-gray mb-2" />
                                    <div className="text-xs text-center truncate w-full">{item.title}</div>
                                </div>
                            }
                        </div>
                    </div>
                }
                <Button onClick={() => remove(item)} className='absolute right-1 top-1' color='gray' size='xsmall' variant='whitebg' icon rounded shadow>
                    <CrossIcon />
                </Button>
            </div>
            {isMedia ?
                <input type="text" defaultValue={item.title} className='text-xs border-0 max-w-full mt-2' placeholder='Добавить название...' />
                : null
            }
        </div>
    );
}
