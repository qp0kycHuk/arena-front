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
import { useFetchArticles } from '@store/articles/articles.hooks';
import { useFetchFolders } from '@store/folders/folders.hooks';
import { getRoute } from '@utils/index';
import { Link, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';


export interface IProjectsProps {
}

const SEARCH_QUERY_NAME = 's'

export function Projects(props: IProjectsProps) {
  useDocumentTitle('Статьи')
  const [isAddFolderOpen, _, openIsAddFolderOpen, closeIsAddFolderOpen] = useToggle(false)
  const { items: folders, loading: foldersLoading } = useFetchFolders()
  const { items: articles, loading: articlesLoading } = useFetchArticles()
  const loading = foldersLoading || articlesLoading

  // let [searchParams, setSearchParams] = useSearchParams();

  // const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setSearchParams({ [SEARCH_QUERY_NAME]: event.target.value })
  // }

  // const debouncedChangeHandler = useDebouncedCallback(changeHandler, 800)


  return (
    <>
      <PageContent className='p-8'>
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
        {/* <Search
          onChange={debouncedChangeHandler}
          initialValue={searchParams.get(SEARCH_QUERY_NAME) || ''}
          className='mb-4' /> */}

        <FolderList items={folders} loading={loading} />
        <ArticleList items={articles} loading={loading} />

      </PageContent>

      <FolderEditDialog isOpen={isAddFolderOpen} close={closeIsAddFolderOpen} />
    </>
  );
}
