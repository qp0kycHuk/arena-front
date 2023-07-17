import { EntityId } from '@reduxjs/toolkit'
import { ICategory } from './Category'
import { IFile } from './File'
import { ITag } from './Tag'
import { ILink } from './Link'

export interface IArticle {
  id: EntityId
  owner_id: number
  name: string
  content: string
  excerpt: string
  image: string | null
  created_at: Date
  updated_at: Date
  image_src: string
  categories: ICategory[]
  tags: ITag[]
  files: IFile[]
  links: ILink[]
}
