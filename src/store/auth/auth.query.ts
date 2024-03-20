import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ILoginRequest, newAuthApi as authApi } from './auth.api'
import Cookies from 'js-cookie'
import { IUser } from '@/models/User'

export const AUTH_QUERY_KEY = 'auth'

interface IAuthResult {
  user: IUser | null
  token?: string | null
  isLogedIn?: boolean
}

export function useAuth() {
  const queryClient = useQueryClient()
  return useQuery<IAuthResult>([AUTH_QUERY_KEY], authApi.user, {
    retry: true,
    refetchOnWindowFocus: true,
    onSuccess(data) {
      queryClient.setQueryData([AUTH_QUERY_KEY], {
        user: data.user,
        token: Cookies.get(import.meta.env.VITE_CSRF_COOKIE_NAME as string) || null,
        isLogedIn: data.user ? true : false,
      })
    },
    onError() {
      queryClient.setQueryData([AUTH_QUERY_KEY], {
        user: null,
        token: null,
        isLogedIn: false,
      })

      Cookies.remove(import.meta.env.VITE_CSRF_COOKIE_NAME as string)
    },
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation(
    async (formData: ILoginRequest) => {
      return await authApi.login(formData)
    },
    {
      onSuccess() {
        queryClient.setQueryData([AUTH_QUERY_KEY], {
          user: null,
          token: null,
          isLogedIn: true,
        })
        queryClient.invalidateQueries([AUTH_QUERY_KEY])
      },
    }
  )
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation(authApi.register, {
    onSuccess() {
      queryClient.setQueryData([AUTH_QUERY_KEY], {
        user: null,
        token: null,
        isLogedIn: true,
      })
      queryClient.invalidateQueries([AUTH_QUERY_KEY])
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation(authApi.logout, {
    onSuccess() {
      queryClient.setQueryData([AUTH_QUERY_KEY], {
        user: null,
        token: null,
        isLogedIn: false,
      })
      queryClient.invalidateQueries([AUTH_QUERY_KEY])
    },
  })
}
