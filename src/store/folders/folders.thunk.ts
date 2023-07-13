import { IFolder } from '../../models/Folder'
import { IUpdateRequest, ICreateRequest, foldersApi } from '@store/folders/folders.api'
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks'

export const {
  fetchAllThunk: fetchFolders,
  updateThunk: updateFolder,
  createThunk: createFolder,
  fetchByIdThunk: fetchFolderById,
  removeThunk: removeFolder,
} = createEntitiesThunks<IFolder, ICreateRequest, IUpdateRequest>({
  name: 'folders',
  api: foldersApi,
})
