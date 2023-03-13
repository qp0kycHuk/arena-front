import { IRole } from '@models/Role';
import { useAppDispatch, useAppSelector } from '../index';
import { ICreateRequest, IUpdateRequest } from "./roles.api"
import { createRole as create, fetchRoleById, fetchRoles, updateRole as update } from './roles.thunk';
import { rolesSlice, selectAll, selectById } from './roles.slice';
import { useEffect } from 'react';
import { EntityId } from '@reduxjs/toolkit';

export function useRoleControl() {
    const dispatch = useAppDispatch()

    async function updateRole(formData: IUpdateRequest) {
        const action = await dispatch(update(formData))
        return action.payload as IRole
    }

    async function createRole(formData: ICreateRequest) {
        const action = await dispatch(create(formData))
        return action.payload as IRole
    }

    async function upsertRole(formData: ICreateRequest | IUpdateRequest) {
        if ((formData as IUpdateRequest).get('id')) {
            return await updateRole(formData)
        } else {
            return await createRole(formData)
        }
    }

    function manualUpdateRole(updated: IRole) {
        dispatch(rolesSlice.actions.updateRole(updated))
    }

    return {
        upsertRole,
        updateRole,
        createRole,
        manualUpdateRole
    }
}

export const useFetchRoles = () => {
    const roles = useAppSelector(({ roles }) => roles)
    const items = useAppSelector(selectAll)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])

    return {
        ...roles,
        items
    }
}

export const useFetchRoleById = (id: EntityId) => {
    const position = useAppSelector((state) => selectById(state, id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchRoleById(id))
        }
    }, [id, dispatch])

    return position
}