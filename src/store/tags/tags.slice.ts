import type { ITag } from '@models/Tag'
import { RootState } from '../index'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createTag, fetchTagById, fetchTags, removeTag, updateTag } from './tags.thunk'
import { tagsEntityAdapter } from './tags.adapter'
import { asyncThunkErrorHandler } from '@store/utils/asyncThunkErrorHandler'

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: tagsEntityAdapter.getInitialState(),
  reducers: {
    updateTag(state, action: PayloadAction<ITag>) {
      tagsEntityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      })
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTags.fulfilled, tagsEntityAdapter.setAll)
      .addCase(fetchTagById.fulfilled, tagsEntityAdapter.upsertOne)
      .addCase(createTag.fulfilled, tagsEntityAdapter.upsertOne)
      .addCase(updateTag.fulfilled, tagsEntityAdapter.upsertOne)
      .addCase(removeTag.fulfilled, tagsEntityAdapter.removeOne)

    builder
      .addCase(fetchTags.rejected, asyncThunkErrorHandler)
      .addCase(fetchTagById.rejected, asyncThunkErrorHandler)
      .addCase(createTag.rejected, asyncThunkErrorHandler)
      .addCase(updateTag.rejected, asyncThunkErrorHandler)
      .addCase(removeTag.rejected, asyncThunkErrorHandler)
  },
})

export const { selectEntities, selectAll, selectById } = tagsEntityAdapter.getSelectors<RootState>(({ tags }) => tags)

export default tagsSlice.reducer
