import { EntityId } from '@reduxjs/toolkit';
import { IUser } from "@models/User";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { createEntitiesApi } from '@store/utils/createEntitiesApi';

type CreateParams = 'user_id' | 'content' | 'excerpt' | 'name' | 'image' | 'tags[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/users'

export const usersApi = createEntitiesApi<IUser, ICreateRequest, IUpdateRequest>({
    url: ROOT_ENDPOINT_URL
})

// export function usersApi() {
//     const token = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string)
//     const api = axios.create({
//         withCredentials: true,
//         headers: {
//             [process.env.REACT_APP_CSRF_HEADER_NAME as string]: token
//         }
//     })

//     async function fetch(): Promise<AxiosResponse<IListResponse<IUser>, any>> {
//         return await api.get(ROOT_ENDPOINT_URL,)
//     }

//     async function create(formData: IUpdateRequest): Promise<AxiosResponse<IItemResponse<IUser>, any>> {
//         return await api.post(ROOT_ENDPOINT_URL, formData)
//     }

//     async function update(formData: IUpdateRequest): Promise<AxiosResponse<IItemResponse<IUser>, any>> {
//         formData.append('_method', 'PUT')
//         return await api.post(ROOT_ENDPOINT_URL + '/' + formData.get('id'), formData)
//     }

//     async function fetchById(id: EntityId) {
//         return await api.get(ROOT_ENDPOINT_URL + '/' + id)
//     }

//     return {
//         create,
//         update,
//         fetch,
//         fetchById
//     }
// }