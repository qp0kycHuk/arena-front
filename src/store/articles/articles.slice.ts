import { toast } from '@lib/Toast';
import { IArticle } from './../../models/Article';
import { RootState } from './../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createArticle, fetchArticleById, fetchArticles, updateArticle } from "./articles.thunk";
import { articlesEntityAdapter } from "./articles.adapter";

export const articleSlice = createSlice({
    name: 'articles',
    initialState: articlesEntityAdapter.getInitialState(),
    reducers: {
        updateArticle(state, action: PayloadAction<IArticle>) {
            articlesEntityAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticles.pending, articlesEntityAdapter.removeAll)
            
        builder
            .addCase(fetchArticles.fulfilled, articlesEntityAdapter.setAll)
            .addCase(fetchArticleById.fulfilled, articlesEntityAdapter.upsertOne)
            .addCase(createArticle.fulfilled, articlesEntityAdapter.upsertOne)
            .addCase(updateArticle.fulfilled, articlesEntityAdapter.upsertOne)

        builder
            .addCase(fetchArticles.rejected, showThunkError)
            .addCase(fetchArticleById.rejected, showThunkError)
            .addCase(createArticle.rejected, showThunkError)
            .addCase(updateArticle.rejected, showThunkError)
    },
})

function showThunkError(state: any, action: any) {
    toast.error(action.payload.message)
}

export const {
    selectEntities,
    selectAll,
    selectById,
} = articlesEntityAdapter.getSelectors<RootState>(({ articles }) => articles)

export default articleSlice.reducer