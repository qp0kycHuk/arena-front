import React from 'react'
import { useDocumentTitle } from '@hooks/useDocumentTitle'
import { RegistrationForm } from '../components/RegistrationForm'

export function Registration() {
  useDocumentTitle('Зарегистрироваться')

  return <RegistrationForm />
}
