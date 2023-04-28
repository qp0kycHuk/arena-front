import { AdjustmentsHorizontalIcon, BookmarkIcon, FileTextIcon, FoldersIcon, SearchIcon, SettingsIcon } from '@assets/icons/stroke';
import { ReactComponent as FolderIcon } from '@assets/img/folder.svg';
import { Search } from '@components/Search/Search';
import { ArticleList } from '@features/articles';
import { FolderEditDialog } from '@features/folders/components/FolderEdit/FolderEditDialog';
import { FolderList } from '@features/folders/components/FolderList/FolderList';
import { Button, Input, Menu, MenuItem } from '@features/ui';
import { useDocumentTitle } from '@hooks/useDocumentTitle';
import { useToggle } from '@hooks/useToggle';
import { PageContent } from '@layouts/PageContent';
import { EntityId } from '@reduxjs/toolkit';
import { useFetchArticles } from '@store/articles/articles.hooks';
import { useFetchFolderById, useFetchFolders } from '@store/folders/folders.hooks';
import { getRoute } from '@utils/index';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';


export interface IProjectsProps {
}


export function Projects(props: IProjectsProps) {
  useDocumentTitle('Статьи')
  const { folderId } = useParams()
  const [isAddFolderOpen, _, openIsAddFolderOpen, closeIsAddFolderOpen] = useToggle(false)
  const folders = useFetchFolders({ immediately: false })
  const folder = useFetchFolderById(folderId as EntityId, { immediately: false })
  const articles = useFetchArticles({ immediately: false })
  const loading = folderId ? folder.loading : folders.loading || articles.loading

  useEffect(() => {
    if (folderId) {
      folder.load()
    } else {
      folders.load()
      articles.load()
    }
  }, [folderId])

  return (
    <>
      <PageContent className='p-8'>
        <div className="flex items-center mb-8">
          <div className="text-2xl font-semibold">{folder.item?.name ? folder.item.name : 'Статьи'}</div>
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
            <Link to={
              folderId ?
                getRoute().projects(folderId + '/article/create') :
                getRoute().articles.create()
            }>
              <Button className='justify-start w-full' size='small' color='gray' variant='text'> <FileTextIcon className="mr-2" /> Статья </Button>
            </Link>
          </Menu>
        </div>
        {/* <Search
          onChange={debouncedChangeHandler}
          initialValue={searchParams.get(SEARCH_QUERY_NAME) || ''}
          className='mb-4' /> */}

        <FolderList items={folderId ? folder.item?.children : folders.items} loading={loading} />
        <ArticleList items={folderId ? folder.item?.articles : articles.items} loading={loading} />

      </PageContent>

      <FolderEditDialog isOpen={isAddFolderOpen} close={closeIsAddFolderOpen} />
    </>
  );
}



// Code for search
// const SEARCH_QUERY_NAME = 's'
// let [searchParams, setSearchParams] = useSearchParams();

// const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//   setSearchParams({ [SEARCH_QUERY_NAME]: event.target.value })
// }

// const debouncedChangeHandler = useDebouncedCallback(changeHandler, 800)