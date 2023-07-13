import { ITag } from '@models/Tag'
import { ICreateRequest, IUpdateRequest } from './tags.api'
import { createTag, fetchTagById, fetchTags, removeTag, updateTag } from './tags.thunk'
import { selectAll, selectById } from './tags.slice'
import { createEntitiesHooks } from '../utils/createEntitiesHooks'

export const {
  useEntitiesControl: useTagControl,
  useFetchEntities: useFetchTags,
  useFetchEntityById: useFetchTagById,
} = createEntitiesHooks<ITag, ICreateRequest, IUpdateRequest>({
  fetchAllThunk: fetchTags,
  updateThunk: updateTag,
  removeThunk: removeTag,
  createThunk: createTag,
  fetchByIdThunk: fetchTagById,
  selectEntitiesSelector: ({ tags }) => tags,
  selectAllSelector: selectAll,
  selectByIdSelector: selectById,
})
