import { IPosition } from '@models/Position';
import { useAppDispatch, useAppSelector } from '../index';
import { ICreateRequest, IUpdateRequest } from "./positions.api"
import { createPosition as create, fetchPositionById, fetchPositions, updatePosition as update } from './positions.thunk';
import { positionsSlice, selectAll, selectById } from './positions.slice';
import { useEffect } from 'react';
import { EntityId } from '@reduxjs/toolkit';

export function useUserControl() {
    const dispatch = useAppDispatch()

    async function updatePosition(formData: IUpdateRequest) {
        const action = await dispatch(update(formData))
        return action.payload as IPosition
    }

    async function createPosition(formData: ICreateRequest) {
        const action = await dispatch(create(formData))
        return action.payload as IPosition
    }

    async function upsertPosition(formData: ICreateRequest | IUpdateRequest) {
        if ((formData as IUpdateRequest).get('id')) {
            return await updatePosition(formData)
        } else {
            return await createPosition(formData)
        }
    }

    function manualUpdatePosition(updated: IPosition) {
        dispatch(positionsSlice.actions.updateUser(updated))
    }

    return {
        upsertPosition,
        updatePosition,
        createPosition,
        manualUpdatePosition
    }
}

export const useFetchPositions = () => {
    const positions = useAppSelector(selectAll)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPositions())
    }, [])

    return positions
}

export const useFetchPositionById = (id: EntityId) => {
    const position = useAppSelector((state) => selectById(state, id))
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchPositionById(id))
        }
    }, [id])

    return position
}