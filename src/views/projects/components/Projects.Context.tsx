import { useSearchQuery } from '@/hooks/useSearchQuery'
import { IArticle } from '@/models/Article'
import { IFolder } from '@/models/Folder'
import { useFetchArticles } from '@/store/articles'
import { useFetchFolderById, useFetchFolders } from '@/store/folders'
import { createContext, useContext } from 'react'
import { useParams } from 'react-router'

const Context = createContext<IValue>({} as IValue)

export const useProjectsContext = () => useContext(Context)

export function ProjectsContextProvider({ children }: React.PropsWithChildren) {
  const [searchQuery, changeSearchQuery] = useSearchQuery()

  const { folderId } = useParams()
  const { data: foldersData, isLoading: foldersLoading } = useFetchFolders()
  const { data: articlesData, isLoading: articlesLoading } = useFetchArticles({
    search: searchQuery,
  })
  const { data: folderData, isFetching: folderLoading } = useFetchFolderById(folderId as EntityId)

  const loading = folderLoading || foldersLoading || articlesLoading

  const folders = (folderId ? folderData?.item?.children : foldersData?.items) || []
  const articles = (folderId ? folderData?.item?.articles : articlesData?.items) || []

  const value = {
    folderId,
    loading,
    folder: folderData?.item,
    folders,
    articles,

    searchQuery,
    changeSearchQuery,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

interface IValue {
  folderId: string | undefined
  loading: boolean
  folder: IFolder | undefined
  folders: IFolder[]
  articles: IArticle[]

  searchQuery: ReturnType<typeof useSearchQuery>[0]
  changeSearchQuery: ReturnType<typeof useSearchQuery>[1]
}
