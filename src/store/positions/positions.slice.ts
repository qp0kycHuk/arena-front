import { IPosition } from '@models/Position';
import { toast } from '@lib/Toast';
import { RootState } from '../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createPosition, fetchPositionById, fetchPositions, updatePosition } from "./positions.thunk";
import { positionsEntityAdapter } from "./positions.adapter";


export const positionsSlice = createSlice({
    name: 'positions',
    initialState: positionsEntityAdapter.getInitialState(),
    reducers: {
        updatePosition(state, action: PayloadAction<IPosition>) {
            positionsEntityAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPositions.fulfilled, positionsEntityAdapter.setAll)
            .addCase(fetchPositionById.fulfilled, positionsEntityAdapter.upsertOne)
            .addCase(createPosition.fulfilled, positionsEntityAdapter.upsertOne)
            .addCase(updatePosition.fulfilled, positionsEntityAdapter.upsertOne)

        builder
            .addCase(fetchPositions.rejected, showThunkError)
            .addCase(fetchPositionById.rejected, showThunkError)
            .addCase(createPosition.rejected, showThunkError)
            .addCase(updatePosition.rejected, showThunkError)
    },
})

function showThunkError(state: any, action: any) {
    toast.error(action.payload.message)
}

export const {
    selectEntities,
    selectAll,
    selectById,
} = positionsEntityAdapter.getSelectors<RootState>(({ positions }) => positions)



export default positionsSlice.reducer