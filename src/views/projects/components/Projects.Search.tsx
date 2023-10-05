import { Search as SearchComponent } from '@/components/Search/Search'
import { useProjectsContext } from './Projects.Context'

export function Search() {
  const { searchQuery, changeSearchQuery } = useProjectsContext()

  return <SearchComponent onChange={changeSearchQuery} value={searchQuery} className="mb-4" />
}
