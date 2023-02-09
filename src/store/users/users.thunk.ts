
import { IUser } from '../../models/User';
import { EntityId, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUpdateRequest, usersApi } from './users.api';

export const fetchUsers = createAsyncThunk<IUser[]>(
    'users/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await usersApi().fetch()
            const items = response.data.items
            return items
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk<IUser, IUpdateRequest>(
    'users/update',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await usersApi().update(formData)
            const item = response.data.item
            return item
        } catch (err) {
            return rejectWithValue((err as AxiosError).response?.data)
        }
    }
)

export const createUser = createAsyncThunk<IUser, IUpdateRequest>(
    'users/create',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await usersApi().create(formData)
            const item = response.data.item
            return item
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const fetchUserById = createAsyncThunk<IUser, EntityId>(
    'users/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await usersApi().fetchById(id)
            const item = response.data.item
            if (item) {
                return item
            } else {
                return rejectWithValue({ message: 'Non - existent' })

            }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)