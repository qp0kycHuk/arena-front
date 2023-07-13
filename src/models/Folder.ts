import { EntityId } from '@reduxjs/toolkit'
import { IArticle } from './Article'

export interface IFolder {
  id: EntityId
  name: string
  articles: IArticle[]
  children: IFolder[]
  owner_id: EntityId
  parent_id: EntityId
}
