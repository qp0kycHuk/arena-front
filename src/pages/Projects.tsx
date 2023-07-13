import React, { useEffect, useState } from 'react'
import { AdjustmentsHorizontalIcon, BookmarkIcon, FileTextIcon, FoldersIcon, SearchIcon, SettingsIcon } from '@assets/icons/stroke'
import { ReactComponent as FolderIcon } from '@assets/img/folder.svg'
import { Search } from '@components/Search/Search'
import { ArticleList } from '@features/articles'
import { FolderEditDialog } from '@features/folders/components/FolderEdit/FolderEditDialog'
import { FolderList } from '@features/folders/components/FolderList/FolderList'
import { Button, Input, Menu, MenuItem } from '@features/ui'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useToggle } from '@hooks/useToggle'
import { PageContent } from '@layouts/PageContent'
import { EntityId } from '@reduxjs/toolkit'
import { useFetchArticles } from '@store/articles/articles.hooks'
import { useFetchFolderById, useFetchFolders } from '@store/folders/folders.hooks'
import { getRoute } from '@utils/index'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

export function Projects() {
  useDocumentTitle('Статьи')
  const { folderId } = useParams()
  const [isCreateFolderOpen, , openCreateFolderOpen, closeCreateFolderOpen] = useToggle(false)
  const [isUpdateFolderOpen, , openUpdateFolderOpen, closeUpdateFolderOpen] = useToggle(false)
  const folders = useFetchFolders({ immediately: false })
  const folder = useFetchFolderById(folderId as EntityId, { immediately: false })
  const articles = useFetchArticles({ immediately: false })
  const loading = folderId ? folder.loading : folders.loading || articles.loading

  const foldersItems = folderId ? folder.item?.children || [] : folders.items
  const articlesItems = folderId ? folder.item?.articles || [] : articles.items

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
      <PageContent className="p-8">
        <div className="flex items-center mb-8">
          <div className="text-2xl font-semibold">{folder.item?.name ? folder.item.name : 'Статьи'}</div>
          <div className="flex ml-auto">
            {folder.item ? (
              <Button variant="contur" color="gray" onClick={openUpdateFolderOpen}>
                <SettingsIcon className="text-2xl" />
              </Button>
            ) : null}
            <Menu align="end" menuButton={<Button className="ml-4 px-7"> Добавить </Button>}>
              <MenuItem>
                <Button className="justify-start w-full" size="small" color="gray" variant="text" onClick={openCreateFolderOpen}>
                  <FoldersIcon className="mr-2" /> Папка
                </Button>
              </MenuItem>
              <Link to={folderId ? getRoute().projects(folderId + '/article/create') : getRoute().articles.create()}>
                <Button className="justify-start w-full" size="small" color="gray" variant="text">
                  {' '}
                  <FileTextIcon className="mr-2" /> Статья{' '}
                </Button>
              </Link>
            </Menu>
          </div>
        </div>
        {/* <Search
          onChange={debouncedChangeHandler}
          initialValue={searchParams.get(SEARCH_QUERY_NAME) || ''}
          className='mb-4' /> */}
        {!loading && foldersItems.length + articlesItems.length === 0 ? <div className="text-center text-gray dark:text-gray-300">Пустая папка</div> : null}
        <FolderList items={foldersItems} loading={false} />
        <ArticleList items={articlesItems} loading={false} />
      </PageContent>
      {folder.item ? <FolderEditDialog isOpen={isUpdateFolderOpen} close={closeUpdateFolderOpen} item={folder.item} /> : null}
      <FolderEditDialog isOpen={isCreateFolderOpen} close={closeCreateFolderOpen} />
    </>
  )
}

// Code for search
// const SEARCH_QUERY_NAME = 's'
// let [searchParams, setSearchParams] = useSearchParams();

// const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//   setSearchParams({ [SEARCH_QUERY_NAME]: event.target.value })
// }

// const debouncedChangeHandler = useDebouncedCallback(changeHandler, 800)
