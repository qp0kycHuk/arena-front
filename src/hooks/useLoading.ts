import { useToggle } from './useToggle'

export function useLoading(initial = false) {
  const [loading, , on, off] = useToggle(initial)

  return {
    loading,
    loadingStart: on,
    loadingEnd: off,
  }
}
