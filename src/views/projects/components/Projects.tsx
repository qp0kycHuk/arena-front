import { FileTextIcon, FoldersIcon, SettingsIcon } from '@assets/icons/stroke'
import { Button, Menu, MenuItem } from '@features/ui'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { useToggle } from '@hooks/useToggle'
import { PageContent } from '@layouts/PageContent'
import { EntityId } from '@reduxjs/toolkit'
// import { useFetchArticles } from '@store/articles/articles.hooks'
import { useFetchFolderById, useFetchFolders } from '@store/folders/'
import { getRoute } from '@utils/index'
import { Link, useParams } from 'react-router-dom'
import { useFetchArticles } from '@store/articles/'

import { FolderEditDialog } from '@/views/folders'
import { FolderList } from '@/views/folders/components/FolderList/FolderList'
import { ArticleList } from '@/views/articles'

export function Projects() {
  useDocumentTitle('Статьи')
  const { folderId } = useParams()

  const [isCreateFolderOpen, , openCreateFolderOpen, closeCreateFolderOpen] = useToggle(false)
  const [isUpdateFolderOpen, , openUpdateFolderOpen, closeUpdateFolderOpen] = useToggle(false)

  const { data: foldersData, isLoading: foldersLoading } = useFetchFolders()
  const { data: articlesData, isLoading: articlesLoading } = useFetchArticles()
  const { data: folderData, isLoading: folderLoading } = useFetchFolderById(folderId as EntityId)

  const loading = foldersLoading || folderLoading || articlesLoading

  const foldersItems = (folderId ? folderData?.item?.children : foldersData?.items) || []
  const articlesItems = (folderId ? folderData?.item?.articles : articlesData?.items) || []

  return (
    <>
      <PageContent className="p-8">
        <div className="flex items-center mb-8">
          <div className="text-2xl font-semibold">{folderData?.item?.name ? folderData?.item.name : 'Статьи'}</div>
          <div className="flex ml-auto">
            {folderData?.item ? (
              <Button variant="contur" color="gray" onClick={openUpdateFolderOpen}>
                <SettingsIcon className="text-2xl" />
              </Button>
            ) : null}
            <Menu align="end" menuButton={<Button className="ml-4 px-7"> Добавить </Button>}>
              <MenuItem>
                <Button
                  className="justify-start w-full"
                  size="sm"
                  color="gray"
                  variant="text"
                  onClick={openCreateFolderOpen}
                >
                  <FoldersIcon className="mr-2" /> Папка
                </Button>
              </MenuItem>
              <Link to={folderId ? getRoute().projects(folderId + '/article/create') : getRoute().articles.create()}>
                <Button className="justify-start w-full" size="sm" color="gray" variant="text">
                  <FileTextIcon className="mr-2" /> Статья
                </Button>
              </Link>
            </Menu>
          </div>
        </div>
        {/* <Search
          onChange={debouncedChangeHandler}
          initialValue={searchParams.get(SEARCH_QUERY_NAME) || ''}
          className='mb-4' /> */}
        {!loading && foldersItems.length + articlesItems.length === 0 ? (
          <div className="text-center text-gray dark:text-gray-300">Пустая папка</div>
        ) : null}
        <FolderList items={foldersItems} loading={false} />
        <ArticleList items={articlesItems} loading={false} />
      </PageContent>
      {folderData?.item ? (
        <FolderEditDialog isOpen={isUpdateFolderOpen} close={closeUpdateFolderOpen} item={folderData?.item} />
      ) : null}
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
