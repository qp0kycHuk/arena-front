import { roles } from './../const/roles'
import { IUser } from '@models/User'

export function isUser(user?: IUser | null): Record<keyof typeof roles, boolean> {
  if (!user) {
    return {
      admin: false,
      editor: false,
      subscriber: false,
    }
  }

  return {
    admin: user.role == roles.admin.key,
    editor: user.role == roles.editor.key,
    subscriber: user.role == roles.subscriber.key,
  }
}
