import { useEffect } from 'react';
import { Button } from '@features/ui';
import { CrossIcon, DocumentIcon, ImageIcon } from '@assets/icons/stroke';
import { getFilePreview } from '@utils/index';

interface IUpliaderItemProps {
    item: IFileItem
    extention?: IExtention
    update: (item: IFileItem, data: Partial<IFileItem>) => void
    remove: (item: IFileItem) => void
    rounded?: boolean
    sign?: boolean
}

export function UploaderItem({
    item,
    extention,
    rounded,
    sign,
    update,
    remove }: IUpliaderItemProps) {
    const isMedia = extention?.type === 'image' || extention?.type === 'video'

    return (
        <div className={`relative z-10 ${rounded ? 'w-24' : 'w-32'}`}>
            <div className='relative w-full h-24'>
                {((item.preview || item.src) && isMedia) ?
                    <img className={`object-cover w-full h-full ${rounded ? 'rounded-full' : 'rounded-xl'}`} src={item.preview || item.src} alt="" /> :
                    <div className={`flex w-full h-full p-2 ${rounded ? 'rounded-full' : 'rounded-xl'} bg-primary bg-opacity-10`}>
                        <div className="max-w-full m-auto">
                            {isMedia ?
                                <ImageIcon className="text-3xl text-gray" />
                                :
                                <div className='flex flex-col items-center'>
                                    <DocumentIcon className="mb-2 text-3xl text-gray" />
                                    <div className="w-full text-xs text-center truncate">{item.title}</div>
                                </div>
                            }
                        </div>
                    </div>
                }
                <Button onClick={() => remove(item)} className='absolute right-1 top-1' color='gray' size='xsmall' variant='whitebg' icon rounded shadow>
                    <CrossIcon />
                </Button>
            </div>
            {(isMedia && sign) ?
                <input type="text" defaultValue={item.title} className='max-w-full mt-2 text-xs border-0' placeholder='Добавить название...' />
                : null
            }
        </div>
    );
}
