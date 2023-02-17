import { IUser } from '@models/User';
import { useAppDispatch, useAppSelector } from './../index';
import { ICreateRequest, IUpdateRequest } from "./users.api"
import { createUser as create, fetchUserById, fetchUsers, updateUser as update } from './users.thunk';
import { usersSlice, selectAll, selectById } from './users.slice';
import { useEffect } from 'react';
import { EntityId } from '@reduxjs/toolkit';

export function useUserControl() {
    const dispatch = useAppDispatch()

    async function updateUser(formData: IUpdateRequest) {
        const action = await dispatch(update(formData))
        return action.payload as IUser
    }

    async function createUser(formData: ICreateRequest) {
        const action = await dispatch(create(formData))
        return action.payload as IUser
    }

    async function upsertUser(formData: ICreateRequest | IUpdateRequest) {
        if ((formData as IUpdateRequest).get('id')) {
            return await updateUser(formData)
        } else {
            return await createUser(formData)
        }
    }

    function manualUpdateUser(updated: IUser) {
        dispatch(usersSlice.actions.updateUser(updated))
    }

    return {
        upsertUser,
        updateUser,
        createUser,
        manualUpdateUser
    }
}

export const useFetchUsers = () => {
    const users = useAppSelector(selectAll)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return users
}

export const useFetchUserById = (id: EntityId) => {
    const user = useAppSelector((state) => selectById(state, id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id))
        }
    }, [id])

    return user
}