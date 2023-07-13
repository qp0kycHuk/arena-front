import { ITag } from '@models/Tag'
import { IUpdateRequest, ICreateRequest, tagsApi } from './tags.api'
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks'

export const {
  fetchAllThunk: fetchTags,
  updateThunk: updateTag,
  createThunk: createTag,
  removeThunk: removeTag,
  fetchByIdThunk: fetchTagById,
} = createEntitiesThunks<ITag, ICreateRequest, IUpdateRequest>({
  name: 'tags',
  api: tagsApi,
})
