import { IPosition } from '@models/Position';
import { RootState } from '../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createPosition, fetchPositionById, fetchPositions, removePosition, updatePosition } from "./positions.thunk";
import { positionsEntityAdapter } from "./positions.adapter";
import { asyncThunkErrorHandler } from '@store/utils/asyncThunkErrorHandler';


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
            .addCase(removePosition.fulfilled, positionsEntityAdapter.removeOne)

        builder
            .addCase(fetchPositions.rejected, asyncThunkErrorHandler)
            .addCase(fetchPositionById.rejected, asyncThunkErrorHandler)
            .addCase(createPosition.rejected, asyncThunkErrorHandler)
            .addCase(updatePosition.rejected, asyncThunkErrorHandler)
            .addCase(removePosition.rejected, asyncThunkErrorHandler)
    },
})


export const {
    selectEntities,
    selectAll,
    selectById,
} = positionsEntityAdapter.getSelectors<RootState>(({ positions }) => positions)



export default positionsSlice.reducer