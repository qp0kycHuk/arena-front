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
  const { fetching, folders, articles, tagsQuery, isEmpty } = useProjectsContext()

  return (
    <>
      <PageContent className="p-8">
        <Head />
        <Search />

        {isEmpty && <Empty />}
        <FolderList items={folders} loading={fetching} />
        <ArticleList items={articles} loading={fetching} />
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
