import { BookmarkIcon, ImageIcon } from '@assets/icons/stroke';
import { Button } from '@features/ui';
import { IArticle } from '@models/Article';
import { ReactComponent as FolderIcon } from '@assets/img/folder.svg';
import * as React from 'react';
import { IFolder } from '@models/Folder';

interface IFolderItemProps {
    folder: IFolder
}

export function FolderItem({ folder }: IFolderItemProps) {
    return (
        <div className="flex items-center py-4">
            <FolderIcon className='mr-4 text-3xl' />
            <div className="py-2 mr-4 text-xs font-semibold text-center rounded-full bg-gray bg-opacity-10 text-gray w-11">
                {folder.articles.length}
            </div>
            <div className="font-semibold">{folder.name}</div>
            {/* <div className="ml-auto text-right whitespace-nowrap">
                <div className="text-xs text-gray">Созд: 04.06.2020</div>
                <div className="text-xs text-gray">Ред: 12.06.2022</div>
            </div> */}
        </div>
    );
}

// export function ArticleItemPlacehlder() {
//     return (
//         <div className="flex items-center py-3">
//             <div className="w-24 h-[76px] rounded-xl bg-gray bg-opacity-50 animate-pulse" />
//             <div className='max-w-5xl ml-4'>
//                 <div className="w-64 h-5 mb-3 bg-opacity-50 animate-pulse bg-gray" />
//                 <div className="max-w-md ">
//                     <div className="w-64 h-2 mb-2 bg-opacity-50 animate-pulse bg-gray" />
//                     <div className="w-64 h-2 bg-opacity-50 animate-pulse bg-gray" />
//                 </div>
//             </div>
//             <div className="ml-auto">
//                 <div className="w-24 h-3 mb-1 ml-1 bg-opacity-50 animate-pulse bg-gray" />
//                 <div className="w-24 h-3 ml-1 bg-opacity-50 animate-pulse bg-gray" />
//             </div>
//             <Button variant='text' size='small' color='gray' className='px-3 ml-3' disabled>
//                 <BookmarkIcon className="text-2xl" />
//             </Button>
//         </div>
//     );
// }
