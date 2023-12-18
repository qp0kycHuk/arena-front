import { createContext, useContext } from 'react'
import { useParams } from 'react-router'
import { useSearchQuery } from '@/hooks/useSearchQuery'
import { useTagsQuery } from '@/hooks/useTagsQuery'
import { IArticle } from '@/models/Article'
import { IFolder } from '@/models/Folder'
import { useFetchArticles } from '@/store/articles'
import { useFetchFolderById, useFetchFolders } from '@/store/folders'

const Context = createContext<IValue>({} as IValue)

export const useProjectsContext = () => useContext(Context)

export function ProjectsContextProvider({ children }: React.PropsWithChildren) {
  const [searchQuery, changeSearchQuery] = useSearchQuery()
  const [tagsQuery, changeTagsQuery] = useTagsQuery()

  const { folderId } = useParams()

  const params = { search: searchQuery }
  const options = { enabled: !folderId }

  const { data: foldersData, isLoading: foldersLoading, isFetching: foldersFetching } = useFetchFolders(params, options)

  const {
    data: articlesData,
    isLoading: articlesLoading,
    isFetching: articlesFetching,
  } = useFetchArticles(params, options)

  const {
    data: folderData,
    isLoading: folderLoading,
    isFetching: folderFetching,
  } = useFetchFolderById(folderId as EntityId, {
    enabled: !!folderId,
  })

  const loading = folderLoading || foldersLoading || articlesLoading
  const fetching = folderFetching || foldersFetching || articlesFetching

  const folders = (folderId ? folderData?.item?.children : foldersData?.items) || []
  const articles = (folderId ? folderData?.item?.articles : []) || []
  // const articles = (folderId ? folderData?.item?.articles : articlesData?.items) || []

  const isEmpty = !fetching && folders.length + articles.length === 0

  const value = {
    folderId,
    loading,
    fetching,
    folder: folderData?.item,
    folders,
    articles,
    isEmpty,

    searchQuery,
    changeSearchQuery,

    tagsQuery,
    changeTagsQuery,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

interface IValue {
  folderId: string | undefined
  loading: boolean
  fetching: boolean
  folder: IFolder | undefined
  folders: IFolder[]
  articles: IArticle[]
  isEmpty: boolean

  searchQuery: ReturnType<typeof useSearchQuery>[0]
  changeSearchQuery: ReturnType<typeof useSearchQuery>[1]

  tagsQuery: ReturnType<typeof useTagsQuery>[0]
  changeTagsQuery: ReturnType<typeof useTagsQuery>[1]
}
