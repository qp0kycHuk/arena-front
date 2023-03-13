import { EntityId, createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { IEntitiesApiCreator } from "./createEntitiesApi"

interface IConfig<E, C, U> {
    api: IEntitiesApiCreator<E, C, U>
    name: string
}

interface IErrorData {
    message: string
    errors: Record<string, string[]>
}

export function createEntitiesThunks<E, C, U>({
    name,
    api
}: IConfig<E, C, U>
) {
    const fetchAllThunk = createAsyncThunk<E[]>(
        name + '/fetch',
        async (_, { rejectWithValue }) => {
            try {
                const response = await api().fetch()
                const items = response.data.items
                return items
            } catch (err) {
                return rejectWithValue((err as AxiosError<IErrorData>).response?.data)
            }
        }
    )

    const updateThunk = createAsyncThunk<E, U>(
        name + '/update',
        async (formData, { rejectWithValue }) => {
            try {
                const response = await api().update(formData)
                const item = response.data.item
                return item
            } catch (err) {
                return rejectWithValue((err as AxiosError<IErrorData>).response?.data)
            }
        }
    )

    const createThunk = createAsyncThunk<E, C>(
        name + '/create',
        async (formData, { rejectWithValue }) => {
            try {
                const response = await api().create(formData)
                const item = response.data.item
                return item
            } catch (err) {
                return rejectWithValue((err as AxiosError<IErrorData>).response?.data)
            }
        }
    )

    const removeThunk = createAsyncThunk<EntityId, EntityId>(
        name + '/remove',
        async (id, { rejectWithValue }) => {
            try {
                const response = await api().remove(id)
                const item = response.data.item
                if (item) {
                    return id
                } else {
                    return rejectWithValue({ message: 'Non - existent' })

                }
            } catch (err) {
                return rejectWithValue((err as AxiosError<IErrorData>).response?.data)
            }
        }
    )

    const fetchByIdThunk = createAsyncThunk<E, EntityId>(
        name + '/fetchById',
        async (id, { rejectWithValue }) => {
            try {
                const response = await api().fetchById(id)
                const item = response.data.item
                if (item) {
                    return item
                } else {
                    return rejectWithValue({ message: 'Non - existent' })

                }
            } catch (err) {
                return rejectWithValue((err as AxiosError<IErrorData>).response?.data)
            }
        }
    )

    return {
        fetchAllThunk,
        updateThunk,
        removeThunk,
        createThunk,
        fetchByIdThunk,
    }
}