import { RootState, useAppDispatch, useAppSelector } from './../index';
import { EntityId, createSlice } from "@reduxjs/toolkit";
import { createArticle, fetchArticleById, fetchArticles, updateArticle } from "./articles.thunk";
import { articlesEntityAdapter } from "./articles.adapter";
import { useEffect } from 'react';


const articleSlice = createSlice({
    name: 'articles',
    initialState: articlesEntityAdapter.getInitialState(),
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchArticles.fulfilled, articlesEntityAdapter.upsertMany)
            .addCase(fetchArticleById.fulfilled, articlesEntityAdapter.upsertOne)
            .addCase(createArticle.fulfilled, articlesEntityAdapter.upsertOne)
            .addCase(updateArticle.fulfilled, articlesEntityAdapter.upsertOne)

    },
})


export const {
    selectEntities,
    selectAll,
    selectById,
} = articlesEntityAdapter.getSelectors<RootState>(({ articles }) => articles)

export const useFetchArticles = () => {
    const articles = useAppSelector(selectAll)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    return articles
}

export const useFetchArticleById = (id: EntityId) => {
    const article = useAppSelector((state) => selectById(state, id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [])

    return article
}

export default articleSlice.reducer