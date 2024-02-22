import { createAsyncThunk } from '@reduxjs/toolkit'
import { articlesApi } from './articles.api'

const KEY = 'ARTICLES'

export const fetchAll = createAsyncThunk(KEY + '/fetchAll', async (_, thunkApi) =>
  articlesApi.fetch(null, { signal: thunkApi.signal })
)

export const fetchById = createAsyncThunk(KEY + '/fetchById', async (id: EntityId, thunkApi) =>
  articlesApi.fetchById(id, null, { signal: thunkApi.signal })
)
