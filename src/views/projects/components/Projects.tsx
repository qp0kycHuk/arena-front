import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { PageContent } from '@layouts/PageContent'
import { FolderList } from '@/views/folders/components/FolderList/FolderList'
import { ArticleList } from '@/views/articles'
import { ProjectsContextProvider, useProjectsContext } from './Projects.Context'
import { Head } from './Projects.Head/Projects.Head'
import { Empty } from '@/components/Empty'
import { Search } from './Projects.Search'
import { Tags } from './Projects.Tags'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function ProjectsInner() {
  useDocumentTitle('Статьи')
  const { articlesLoading, folderLoading, folder, folderId, folders, articles, isEmpty } = useProjectsContext()

  return (
    <>
      <PageContent className="sm:p-8">
        <Head />
        <Tags />
        <Search />

        <DndProvider backend={HTML5Backend}>
          <FolderList draggable parent={folder} items={folders} loading={folderLoading} />
          {folderId && <ArticleList draggable items={articles} loading={articlesLoading} />}
        </DndProvider>
        {isEmpty && <Empty />}
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
