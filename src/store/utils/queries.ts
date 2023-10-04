import { EntityId } from '@reduxjs/toolkit'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { IEntityApi } from './EntitesApi'

interface IParams<EntityType, C, U> {
  key: string
  api: IEntityApi<EntityType, C, U>
}

export function createQueries<EntityType extends { id: EntityId }, C, U>({ key, api }: IParams<EntityType, C, U>) {
  function useFetch() {
    return useQuery([key], api.fetch)
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
        queryClient.setQueryData([key, data.item.id.toString()], data)
      },
    })
  }

  function useDelete() {
    const queryClient = useQueryClient()

    return useMutation(api.remove, {
      onSuccess: (data, id) => {
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
