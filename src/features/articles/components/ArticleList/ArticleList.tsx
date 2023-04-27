import { useEffect, useState } from 'react';
import { ArticleItem, ArticleItemPlacehlder } from '../ArticleItem/ArticleItem';
import { SettingsIcon, FoldersIcon, FileTextIcon } from '@assets/icons/stroke';
import { Button, Dialog, Menu, MenuItem } from '@features/ui';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from '@components/Search/Search';
import { useDebouncedCallback } from 'use-debounce';
import { getRoute } from '@utils/index';
import { useFetchArticles } from '@store/articles/articles.hooks';
import React from 'react';
import { FolderEditDialog } from '@features/folders/components/FolderEdit/FolderEditDialog';
import { useToggle } from '@hooks/useToggle';
// import { useFetchFolders } from '@store/folders/folders.hooks';
import { FolderItem } from '@features/folders/components/FolderItem/FolderItem';

interface IArticleListProps {
}
const SEARCH_QUERY_NAME = 's'

export function ArticleList(props: IArticleListProps) {
    const { items: articles, loading } = useFetchArticles()
    // const { items: folders, } = useFetchFolders()
    let [searchParams, setSearchParams] = useSearchParams();
    const [isAddFolderOpen, _, openIsAddFolderOpen, closeIsAddFolderOpen] = useToggle(false)


    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchParams({ [SEARCH_QUERY_NAME]: event.target.value })
    }

    const debouncedChangeHandler = useDebouncedCallback(changeHandler, 800)

    return (
        <>
            <div className="flex items-center mb-8">
                <div className="text-2xl font-semibold">Статьи</div>
                <Button variant='contur' color='gray' className='ml-auto'>
                    <SettingsIcon className="text-2xl" />
                </Button>
                <Menu align='end' menuButton={
                    <Button className='ml-4 px-7'> Добавить </Button>
                }>
                    <MenuItem>
                        <Button
                            className='justify-start w-full'
                            size='small'
                            color='gray'
                            variant='text'
                            onClick={openIsAddFolderOpen}>
                            <FoldersIcon className="mr-2" /> Папка
                        </Button>
                    </MenuItem>
                    <Link to={getRoute().articles.create()}>
                        <Button className='justify-start w-full' size='small' color='gray' variant='text'> <FileTextIcon className="mr-2" /> Статья </Button>
                    </Link>
                </Menu>
            </div>

            <Search
                onChange={debouncedChangeHandler}
                initialValue={searchParams.get(SEARCH_QUERY_NAME) || ''}
                className='mb-4' />

            {loading && new Array(15).fill(1).map((_, index) =>
                <React.Fragment key={index}>
                    <ArticleItemPlacehlder />
                    <div className="border-t border-gray border-opacity-20"></div>
                </React.Fragment>
            )}
            {articles?.length <= 0 && !loading && 'Здесь ничего нет'}
            {/* {folders?.map((folder) =>
                <React.Fragment key={folder.id}>
                    <Link className='peer' to={getRoute().folders(folder.id)}>
                        <FolderItem folder={folder} />
                    </Link>
                    <div className="border-t border-gray border-opacity-20"></div>
                </React.Fragment>
            )} */}
            {articles?.map((article) =>
                <React.Fragment key={article.id}>
                    <Link className='peer' to={getRoute().articles(article.id)}>
                        <ArticleItem article={article} />
                    </Link>
                    <div className="border-t border-gray border-opacity-20 peer-hover:opacity-0"></div>
                </React.Fragment>
            )}

            <FolderEditDialog isOpen={isAddFolderOpen} close={closeIsAddFolderOpen} />
        </>
    );
}
