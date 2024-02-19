import { changeSearchParams } from '@/utils/helpers/changeSearchParams'
import { useSearchParams } from 'react-router-dom'

interface IPops {
  key?: string
  savedKeys?: string[]
  saveAll?: boolean
}

type IResult = [string[], (query: string[]) => void]

export function useTagsQuery({ key = 'tags', savedKeys = ['search'], saveAll = false }: IPops = {}): IResult {
  const [searchParams, setSearchParams] = useSearchParams()

  const tagsQuery = searchParams.getAll(key) || []

  function changeTagsQuery(query: string[]) {
    setSearchParams(changeSearchParams([key, query], saveAll, savedKeys))
  }

  return [tagsQuery, changeTagsQuery]
}
