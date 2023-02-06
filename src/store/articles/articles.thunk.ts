
import { IArticle } from './../../models/Article';
import { EntityId, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUpdateRequest, articlesApi } from 'src/api/articles';

export const fetchArticles = createAsyncThunk<IArticle[]>(
    'articles/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await articlesApi().fetch()
            const items = response.data.items
            return items
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateArticle = createAsyncThunk<IArticle, IUpdateRequest>(
    'articles/update',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await articlesApi().update(formData)
            const item = response.data.item
            return item
        } catch (err) {
            return rejectWithValue((err as AxiosError).response?.data)
        }
    }
)

export const createArticle = createAsyncThunk<IArticle, IUpdateRequest>(
    'articles/create',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await articlesApi().create(formData)
            const item = response.data.item
            return item
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchArticleById = createAsyncThunk<IArticle, EntityId>(
    'articles/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await articlesApi().fetchById(id)
            const item = response.data.item
            return item
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)