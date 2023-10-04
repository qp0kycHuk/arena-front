import { IUser } from '@models/User'
import { createRootApi } from '../utils/createRootApi'
import Cookies from 'js-cookie'

export interface ILoginRequest {
  phone: string
  password: string
}

export interface IRegisterRequest {
  first_name: string
  last_name: string
  phone: string
  password: string
  password_confirmation: string
}

const LOGIN_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/login'
const REGISTER_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/register'
const LOGOUT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/logout'
const USER_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/user'
const TOKEN_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/sanctum/csrf-cookie'

async function initToken() {
  await createRootApi().get<IUser>(TOKEN_ENDPOINT_URL)
  const token = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string)

  return { token }
}

async function user() {
  await initToken()
  const { data } = await createRootApi().get<IUser>(USER_ENDPOINT_URL)
  return { user: data }
}

async function login(formData: ILoginRequest) {
  await initToken()
  const { data } = await createRootApi().post(LOGIN_ENDPOINT_URL, formData)
  return data
}

async function register(formData: IRegisterRequest) {
  await initToken()
  const { data } = await createRootApi().post(REGISTER_ENDPOINT_URL, formData)
  return data
}

async function logout() {
  await initToken()
  const { data } = await createRootApi().post(LOGOUT_ENDPOINT_URL)
  return data
}

export const newAuthApi = {
  initToken,
  user,
  login,
  register,
  logout,
}
