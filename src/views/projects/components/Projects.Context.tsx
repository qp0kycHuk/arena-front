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
  const [searchQuery, changeSearchQuery] = useSearchQuery({ savedKeys: ['tags'] })
  const [tagsQuery, changeTagsQuery] = useTagsQuery({ savedKeys: ['search'] })
  const { folderId } = useParams()

  const params = { name: searchQuery, tags: tagsQuery }

  // folders data - top level
  const {
    data: foldersData,
    isLoading: foldersLoading,
    isFetching: foldersFetching,
  } = useFetchFolders(params, { enabled: !folderId })

  // articles data - top level
  const {
    data: articlesData,
    isLoading: isArticlesLoading,
    isFetching: isArticlesFetching,
  } = useFetchArticles(params, { enabled: !folderId })

  // folder data - if in folder
  const {
    data: folderData,
    isLoading: isFolderLoading,
    isFetching: isFolderFetching,
  } = useFetchFolderById(folderId as EntityId, params, { enabled: !!folderId })

  const folders = tagsQuery.length === 0 ? (folderId ? folderData?.item?.children : foldersData?.items) || [] : []
  const articles =
    (folderId ? folderData?.item?.articles : tagsQuery.length === 0 && !searchQuery ? [] : articlesData?.items) || []
  // const articles = (folderId ? folderData?.item?.articles : articlesData?.items) || []

  const fetching = isFolderFetching || foldersFetching || isArticlesFetching
  const loading = (isArticlesLoading && isFolderLoading) || (!folderData?.item && fetching && folders.length == 0)
  const isEmpty = !fetching && folders.length + articles.length === 0

  const value = {
    folderId,
    folder: folderData?.item,
    folders,
    articles,
    isEmpty,
    loading,
    fetching,

    searchQuery,
    changeSearchQuery,

    tagsQuery,
    changeTagsQuery,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

interface IValue {
  folderId: string | undefined
  folder: IFolder | undefined
  folders: IFolder[]
  articles: IArticle[]
  isEmpty: boolean
  loading: boolean
  fetching: boolean

  searchQuery: ReturnType<typeof useSearchQuery>[0]
  changeSearchQuery: ReturnType<typeof useSearchQuery>[1]

  tagsQuery: ReturnType<typeof useTagsQuery>[0]
  changeTagsQuery: ReturnType<typeof useTagsQuery>[1]
}
