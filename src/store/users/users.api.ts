import { EntityId } from '@reduxjs/toolkit';
import { IUser } from "@models/User";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { createEntitiesApi } from '@store/utils/createEntitiesApi';

type CreateParams = keyof IUser | 'positions[]'
type UpdateParams = CreateParams | 'id' | 'image_delete'
export type ICreateRequest = TypedFormData<CreateParams>
export type IUpdateRequest = TypedFormData<UpdateParams>

const ROOT_ENDPOINT_URL = process.env.REACT_APP_API_URL + '/api/users'

export const usersApi = createEntitiesApi<IUser, ICreateRequest, IUpdateRequest>({
    url: ROOT_ENDPOINT_URL
})
