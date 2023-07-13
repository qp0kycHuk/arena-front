import { useMemo } from 'react'

export function useErrorMessage(error: any) {
  const errorMessage = useMemo(() => {
    return getErrorMessage(error)
  }, [error])

  return errorMessage
}

export function getErrorMessage(error: any) {
  if (error && 'data' in error) {
    return (error.data as IServerError).message
  }

  if (error && 'error' in error) {
    return error.error
  }

  return null
}
