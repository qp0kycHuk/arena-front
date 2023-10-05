import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { IEntityApi } from './EntitiesApi'

interface IParams<EntityType, C, U, F> {
  key: string
  api: IEntityApi<EntityType, C, U, F>
}

export function createQueries<EntityType extends { id: EntityId }, C, U, F = Record<string, string>>({
  key,
  api,
}: IParams<EntityType, C, U, F>) {
  function useFetch(params: F = {} as F) {
    return useQuery([key, params], api.fetch.bind(null, params))
  }

  function useFetchById(id: EntityId) {
    const queryClient = useQueryClient()

    return useQuery([key, id?.toString()], api.fetchById.bind(null, id), {
      placeholderData: () => {
        return {
          item: queryClient
            .getQueryData<IListResponse<EntityType>>([key])
            ?.items.find((d) => d.id?.toString() === id?.toString()),
        }
      },
    })
  }

  function useUpsert() {
    const queryClient = useQueryClient()

    return useMutation(api.upsert, {
      onSuccess: (data) => {
        queryClient.invalidateQueries([key])
        queryClient.setQueryData([key, data.item.id.toString()], data)
      },
    })
  }

  function useDelete() {
    const queryClient = useQueryClient()

    return useMutation(api.remove, {
      onSuccess: (data, id) => {
        queryClient.invalidateQueries([key])
        queryClient.setQueryData([key, id.toString()], null)
      },
    })
  }

  return {
    useFetch,
    useFetchById,
    useUpsert,
    useDelete,
  }
}
