import { IArticle } from '@/models/Article'
import { createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '..'

export const adapter = createEntityAdapter<IArticle>()
export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors<RootState>(
  (state) => state.articles
)
