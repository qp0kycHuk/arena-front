import { queryClient } from '@/query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { AUTH_QUERY_KEY } from '../auth'

export function createRootApi() {
  const token = Cookies.get(import.meta.env.VITE_CSRF_COOKIE_NAME as string)
  const api = axios.create({
    withCredentials: true,
    headers: {
      [import.meta.env.VITE_CSRF_HEADER_NAME as string]: token,
    },

    validateStatus(status) {
      if (status === 401) {
        queryClient.setQueryData([AUTH_QUERY_KEY], {
          user: null,
          token: null,
          isLogedIn: false,
        })

        Cookies.remove(import.meta.env.VITE_CSRF_COOKIE_NAME as string)
      }

      return true
    },
  })

  return api
}
