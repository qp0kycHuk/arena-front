import { createSlice } from '@reduxjs/toolkit'
import { adapter } from './articles.adapter'
import { fetchAll } from './articles.thunk'

const KEY = 'ARTICLES'

const initialState = adapter.getInitialState()

const slice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    // create(state, action) {},
    // update(state, action) {},
    // delete(state, action) {},
  },
  extraReducers(builder) {
    // fetchAll
    builder.addCase(fetchAll.fulfilled, (state, action) => adapter.upsertMany(state, action.payload.items))

    // fetchById
  },
})

export type SliceState = typeof initialState

export const reducer = slice.reducer
