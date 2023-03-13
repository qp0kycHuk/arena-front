
import { IPosition } from '@models/Position';
import { EntityId, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUpdateRequest, ICreateRequest, positionsApi } from './positions.api';
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks';


export const {
    fetchAllThunk: fetchPositions,
    updateThunk: updatePosition,
    createThunk: createPosition,
    removeThunk: removePosition,
    fetchByIdThunk: fetchPositionById,
} = createEntitiesThunks<IPosition, ICreateRequest, IUpdateRequest>({
    name: 'positions',
    api: positionsApi
})
