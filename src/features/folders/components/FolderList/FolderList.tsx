import { Link } from 'react-router-dom';
import { getRoute } from '@utils/index';
import React from 'react';
import { IFolder } from '@models/Folder';
import { FolderItem, FolderItemPlacehlder } from '../FolderItem/FolderItem';

interface IFolderListProps {
    loading?: boolean
    items?: IFolder[]
}


export function FolderList({ loading, items }: IFolderListProps) {
    const isItemsLoadedAndEmpty = (!items || (items?.length <= 0 && !loading))
    const isItemsReady = !loading && items && items?.length > 0

    return (
        <>
            {loading && new Array(3).fill(1).map((_, index) =>
                <React.Fragment key={index}>
                    <FolderItemPlacehlder />
                    <div className="border-t border-gray border-opacity-20"></div>
                </React.Fragment>
            )}
            {isItemsLoadedAndEmpty && 'Здесь ничего нет'}
            {isItemsReady && items.map((folder) =>
                <React.Fragment key={folder.id}>
                    <Link className='peer' to={getRoute().folders(folder.id)}>
                        <FolderItem folder={folder} />
                    </Link>
                    <div className="border-t border-gray border-opacity-20"></div>
                </React.Fragment>
            )}
        </>
    );
}
