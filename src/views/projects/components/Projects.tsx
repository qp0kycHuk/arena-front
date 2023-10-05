import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { FolderList } from '@/views/folders/components/FolderList/FolderList'
import { ArticleList } from '@/views/articles'
import { ProjectsContextProvider, useProjectsContext } from './Projects.Context'
import { Head } from './Projects.Head/Projects.Head'
import { Empty } from '@/components/Empty'
import { Search } from './Projects.Search'

function ProjectsInner() {
  useDocumentTitle('Статьи')
  const { loading, folders, articles } = useProjectsContext()

  const isFolderEmpty = !loading && folders.length + articles.length === 0

  return (
    <>
      <PageContent className="p-8">
        <Head />
        {/* <Search /> */}
        {isFolderEmpty && <Empty />}
        <FolderList items={folders} loading={loading} />
        <ArticleList items={articles} loading={loading} />
      </PageContent>
    </>
  )
}

export function Projects() {
  return (
    <ProjectsContextProvider>
      <ProjectsInner />
    </ProjectsContextProvider>
  )
}
