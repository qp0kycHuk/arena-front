import { IArticle } from '@models/Article'
import { RootState } from './../index'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createArticle, fetchArticleById, fetchArticles, updateArticle } from './articles.thunk'
import { articlesEntityAdapter } from './articles.adapter'
import { asyncThunkErrorHandler } from '@store/utils/asyncThunkErrorHandler'

export const articleSlice = createSlice({
  name: 'articles',
  initialState: articlesEntityAdapter.getInitialState(),
  reducers: {
    update(state, action: PayloadAction<IArticle>) {
      articlesEntityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      })
    },
    clear(state) {
      articlesEntityAdapter.removeAll(state)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArticles.pending, articlesEntityAdapter.removeAll)

    builder
      .addCase(fetchArticles.fulfilled, articlesEntityAdapter.setAll)
      .addCase(fetchArticleById.fulfilled, articlesEntityAdapter.upsertOne)
      .addCase(createArticle.fulfilled, articlesEntityAdapter.upsertOne)
      .addCase(updateArticle.fulfilled, articlesEntityAdapter.upsertOne)

    builder
      .addCase(fetchArticles.rejected, asyncThunkErrorHandler)
      .addCase(fetchArticleById.rejected, asyncThunkErrorHandler)
      .addCase(createArticle.rejected, asyncThunkErrorHandler)
      .addCase(updateArticle.rejected, asyncThunkErrorHandler)
  },
})

export const { clear: clearAction, update: updateAction } = articleSlice.actions

export const { selectEntities, selectAll, selectById } = articlesEntityAdapter.getSelectors<RootState>(({ articles }) => articles)

export default articleSlice.reducer
