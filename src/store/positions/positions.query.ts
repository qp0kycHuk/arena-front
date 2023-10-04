import { createQueries } from '@store/utils/queries'
import { positionsApi } from './positions.api'

const POSITIONS_QUERY_KEY = 'positions'

export const {
  useFetch: useFetchPositions,
  useFetchById: useFetchPositionById,
  useUpsert: useUpsertPosition,
  useDelete: useDeletePosition,
} = createQueries({ key: POSITIONS_QUERY_KEY, api: positionsApi })
