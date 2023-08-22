import { EntityId } from '@reduxjs/toolkit'
import { IPosition } from './Position'
import { roles } from '@features/users'

export interface IUser {
  id: EntityId
  first_name: string
  last_name: string
  patronymic: string
  date_of_birth: string
  email: string
  email_verified_at: null
  telegram: string
  phone: string
  phone_verified_at: null
  phone_verify_code: null
  image: null
  image_src: string
  position: null
  experience: null
  social: null
  gender: null
  level: null
  role: keyof typeof roles
  created_at: Date
  updated_at: Date
  deleted_at: Date
  positions: IPosition[]
  status: 'active' | 'inactive'
}
