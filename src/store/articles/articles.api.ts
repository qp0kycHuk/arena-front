import { EntityId } from '@reduxjs/toolkit';
import { IArticle } from "@models/Article";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface IArticlesApi {
    fetch(): Promise<IArticle[]>
}

type CreateParams = 'user_id' | 'content' | 'excerpt' | 'name' | 'image' | 'tags[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/articles'

export function articlesApi() {
    const token = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string)
    const api = axios.create({
        withCredentials: true,
        headers: {
            [process.env.REACT_APP_CSRF_HEADER_NAME as string]: token
        }
    })

    async function fetch(): Promise<AxiosResponse<IListResponse<IArticle>, any>> {
        return await api.get(ROOT_ENDPOINT_URL,)
    }

    async function create(formData: IUpdateRequest): Promise<AxiosResponse<IItemResponse<IArticle>, any>> {
        return await api.post(ROOT_ENDPOINT_URL, formData)
    }

    async function update(formData: IUpdateRequest): Promise<AxiosResponse<IItemResponse<IArticle>, any>> {
        formData.append('_method', 'PUT')
        return await api.post(ROOT_ENDPOINT_URL + '/' + formData.get('id'), formData)
    }

    async function fetchById(id: EntityId) {
        return await api.get(ROOT_ENDPOINT_URL + '/' + id)
    }

    return {
        create,
        update,
        fetch,
        fetchById
    }
}