import type { URLSearchParamsInit } from 'react-router-dom'

export function changeSearchParams(
  [key, value]: [string, string | string[]],
  saveAll = false,
  savedKeys: string[] = []
) {
  return (prev: URLSearchParams) => {
    const prevParams = Object.fromEntries(prev)
    const params: URLSearchParamsInit = {}

    if (saveAll) {
      Object.entries(prevParams).forEach(([k, v]) => (params[k] = v))
    } else {
      savedKeys.forEach((k) => {
        const value = prev.getAll(k)

        if (prevParams[k] && value[0]) {
          params[k] = value.length > 1 ? value : value[0]
        }
      })
    }

    params[key] = value

    return params
  }
}
