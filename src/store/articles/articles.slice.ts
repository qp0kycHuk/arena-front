import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { articlesApi } from './articles.api'
import { IArticle } from '@/models/Article'
import { RootState } from '@/store/'
import { useSelector } from 'react-redux'

type Item = IArticle
const KEY = 'ARTICLES'

export const fetch = createAsyncThunk(KEY + '/fetchAll', articlesApi.fetch)

export const adapter = createEntityAdapter<Item>()
const initialState = adapter.getInitialState({ loading: false })

const slice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    // create(state, action) {},
    // update(state, action) {},
    // delete(state, action) {},
  },
  extraReducers(builder) {
    builder.addCase(fetch.fulfilled, (state, action) => adapter.upsertMany(state, action.payload.items))
  },
})

export const reducer = slice.reducer

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors<RootState>(
  (state) => state.articles
)

export const useArticles = () => useSelector(selectAll)
