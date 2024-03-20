import axios from 'axios'
import Cookies from 'js-cookie'

export function createRootApi() {
  const token = Cookies.get(import.meta.env.VITE_CSRF_COOKIE_NAME as string)
  const api = axios.create({
    withCredentials: true,
    headers: {
      [import.meta.env.VITE_CSRF_HEADER_NAME as string]: token,
    },
  })

  return api
}
