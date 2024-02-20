import { useQuery } from '@tanstack/react-query'
import { favoritesApi } from './favorites.api'

const KEY = 'FAVORITES'

export function useFavorites() {
  return useQuery([KEY], favoritesApi.fetch.bind(null))
}
