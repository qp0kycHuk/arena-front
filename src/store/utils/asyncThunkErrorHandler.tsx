import { showAsyncError } from '@utils/helpers/errors'

export function asyncThunkErrorHandler(state: any, action: any) {
  console.trace(action)

  showAsyncError(action.payload)
}
