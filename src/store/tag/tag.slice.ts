import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";



const tagsEntityAdapter = createEntityAdapter()

const slice = createSlice({
    name: 'tags',
    initialState: tagsEntityAdapter.getInitialState(),
    reducers: {},
})

export default slice.reducer