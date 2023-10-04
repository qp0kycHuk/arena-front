import { useQuery } from 'react-query'
import { newAuthApi } from './auth.api'
import Cookies from 'js-cookie'

export function useAuth() {
  return useQuery(
    'auth-user',
    () =>
      newAuthApi.user().then((user) => ({
        user,
        token: Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) || null,
        isLogedIn: user ? true : false,
      })),
    {
      placeholderData: () => {
        return {
          token: Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) || null,
          isLogedIn: Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string) ? true : false,
        }
      },
    }
  )
}

export function useCurrentUser() {
  return useQuery('auth-user', newAuthApi.user)
}
