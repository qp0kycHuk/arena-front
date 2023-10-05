import { useSearchParams } from 'react-router-dom'
import { changeSearchParams } from '@utils/helpers/changeSearchParams'

interface IProps {
  key?: string
  savedKeys?: string[]
  saveAll?: boolean
}

type IResult = [number, (newPage: number) => void]

export function usePagesQuery({
  key = 'page',
  savedKeys = [],
  saveAll = true,
}: IProps = {}): IResult {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = +(searchParams.get(key) || 1)

  function changePageQuery(newPage: number) {
    setSearchParams(changeSearchParams([key, newPage.toString()], saveAll, savedKeys))
  }

  return [currentPage, changePageQuery]
}
