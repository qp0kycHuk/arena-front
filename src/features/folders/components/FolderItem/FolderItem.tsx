import { ReactComponent as FolderIcon } from '@assets/img/folder.svg';
import { IFolder } from '@models/Folder';

interface IFolderItemProps {
    folder: IFolder
}

export function FolderItem({ folder }: IFolderItemProps) {
    return (
        <div className="flex items-center py-4">
            <FolderIcon className='mr-4 text-3xl' />
            <div className="py-2 mr-4 text-xs font-semibold text-center rounded-full bg-gray bg-opacity-10 text-gray dark:text-gray-300 w-11">
                {folder.articles.length}
            </div>
            <div className="font-semibold">{folder.name}</div>
            {/* 
            <div className="ml-auto text-right whitespace-nowrap">
                <div className="text-xs text-gray dark:text-gray-300">Созд: 04.06.2020</div>
                <div className="text-xs text-gray dark:text-gray-300">Ред: 12.06.2022</div>
            </div> 
            */}
        </div>
    );
}

export function FolderItemPlacehlder() {
    return (
        <div className="flex items-center py-4">
            <FolderIcon className='mr-4 text-3xl' />
            <div className="h-8 py-2 mr-4 text-xs font-semibold text-center bg-opacity-50 rounded-full animate-pulse bg-gray w-11"></div>
            <div className="w-64 h-5 mb-3 bg-opacity-50 animate-pulse bg-gray" />
            <div className="ml-auto">
                <div className="w-24 h-3 mb-1 ml-1 bg-opacity-50 animate-pulse bg-gray" />
                <div className="w-24 h-3 ml-1 bg-opacity-50 animate-pulse bg-gray" />
            </div>
        </div>
    );
}
