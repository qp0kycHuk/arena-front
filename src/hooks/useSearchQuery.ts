import { useSearchParams } from 'react-router-dom'
import { changeSearchParams } from '@utils/helpers/changeSearchParams'

interface IPops {
  key?: string
  savedKeys?: string[]
  saveAll?: boolean
}

type IResult = [string, (query: string) => void]

export function useSearchQuery({
  key = 'search',
  savedKeys = [],
  saveAll = false,
}: IPops = {}): IResult {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get(key) || ''

  function changeSearchQuery(query: string) {
    setSearchParams(changeSearchParams([key, query], saveAll, savedKeys))
  }

  return [searchQuery, changeSearchQuery]
}
