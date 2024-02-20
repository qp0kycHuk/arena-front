import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { favoritesApi } from './favorites.api'

const KEY = 'FAVORITES'

export function useFavorites(options?: UseQueryOptions) {
  return useQuery([KEY], favoritesApi.fetch, {
    enabled: options?.enabled ?? true,
  })
}
