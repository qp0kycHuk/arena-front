import { IArticle } from './Article'
import { IHandbook } from './Handbook'

export interface ITag extends IHandbook {
  owner_id: EntityId
  articles: IArticle[]
}
