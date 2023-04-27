
import { IUser } from '../../models/User';
import { EntityId, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUpdateRequest, ICreateRequest, usersApi } from './users.api';
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks';


export const {
    fetchAllThunk: fetchUsers,
    updateThunk: updateUser,
    createThunk: createUser,
    fetchByIdThunk: fetchUserById,
    removeThunk: removeUser
} = createEntitiesThunks<IUser, ICreateRequest, IUpdateRequest>({
    name: 'users',
    api: usersApi
})
