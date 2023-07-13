import { RootState } from './../index'
import { useMemo } from 'react'
import { useAppSelector } from '../index'
import { ILoginRequest, IRegisterRequest, useLazyInitCsrfQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useUserQuery } from './auth.api'

export function useAuth() {
  const auth = useAppSelector((state: RootState) => state.auth)
  return useMemo(() => auth, [auth])
}

// TODO add types
export function useLogout(): [() => void, any, any] {
  const [initCsrf, csrfData] = useLazyInitCsrfQuery()
  const [initLogout, logoutData] = useLogoutMutation()

  async function logout() {
    await initCsrf(null)
    await initLogout(null)
  }

  return [logout, logoutData, csrfData]
}

// TODO add types
export function useLogin(): [(credentials: ILoginRequest) => void, any, any] {
  const [initCsrf, csrfData] = useLazyInitCsrfQuery()
  const [initLogin, loginData] = useLoginMutation()

  async function login(credentials: ILoginRequest) {
    await initCsrf(null)
    await initLogin(credentials)
  }

  return [login, loginData, csrfData]
}

// TODO add types
export function useRegistration(): [(credentials: IRegisterRequest) => void, any, any] {
  const [initCsrf, csrfData] = useLazyInitCsrfQuery()
  const [initRegister, registerData] = useRegisterMutation()

  async function register(credentials: IRegisterRequest) {
    await initCsrf(null)
    await initRegister(credentials)
  }

  return [register, registerData, csrfData]
}
