
import { IArticle } from './../../models/Article';
import { EntityId, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUpdateRequest, ICreateRequest, articlesApi } from '@store/articles/articles.api';
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks';

export const {
    fetchAllThunk: fetchArticles,
    updateThunk: updateArticle,
    createThunk: createArticle,
    fetchThunkById: fetchArticleById,
} = createEntitiesThunks<IArticle, ICreateRequest, IUpdateRequest>({
    name: 'articles',
    api: articlesApi
})
