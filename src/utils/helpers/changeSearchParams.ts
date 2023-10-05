import type { URLSearchParamsInit } from 'react-router-dom'

export function changeSearchParams([key, value]: [string, string], saveAll = false, savedKeys: string[] = []) {
  return (prev: URLSearchParams) => {
    const prevParams = Object.fromEntries(prev)
    const params: URLSearchParamsInit = {}

    if (saveAll) {
      Object.entries(prevParams).forEach(([k, v]) => (params[k] = v))
    } else {
      savedKeys.forEach((k) => {
        if (prevParams[k]) {
          params[k] = prevParams[k]
        }
      })
    }

    params[key] = value

    return params
  }
}
