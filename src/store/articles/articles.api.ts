import { EntityId } from '@reduxjs/toolkit';
import { IArticle } from "@models/Article";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { createEntitiesApi } from '@store/utils/createEntitiesApi';

interface IArticlesApi {
    fetch(): Promise<IArticle[]>
}

type CreateParams = 'user_id' | 'content' | 'excerpt' | 'name' | 'image' | 'tags[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/articles'

export const articlesApi = createEntitiesApi<IArticle, ICreateRequest, IUpdateRequest>({
    url: ROOT_ENDPOINT_URL
})