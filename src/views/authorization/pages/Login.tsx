import React from 'react'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { LoginForm } from '../components/LoginForm'

export function Login() {
  useDocumentTitle('Войти')

  return <LoginForm />
}
