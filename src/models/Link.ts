import type { IHandbook } from './Handbook'

export interface ILink extends IHandbook {
  key?: string
  url?: string
  owner_id?: EntityId
}
