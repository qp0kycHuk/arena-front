import { IRole } from '@models/Role';
import { RootState } from '../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createRole, fetchRoleById, fetchRoles, updateRole } from "./roles.thunk";
import { rolesEntityAdapter } from "./roles.adapter";
import { asyncThunkErrorHandler } from '@store/utils/asyncThunkErrorHandler';


export const rolesSlice = createSlice({
    name: 'roles',
    initialState: rolesEntityAdapter.getInitialState(),
    reducers: {
        updateRole(state, action: PayloadAction<IRole>) {
            rolesEntityAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRoles.fulfilled, rolesEntityAdapter.setAll)
            .addCase(fetchRoleById.fulfilled, rolesEntityAdapter.upsertOne)
            .addCase(createRole.fulfilled, rolesEntityAdapter.upsertOne)
            .addCase(updateRole.fulfilled, rolesEntityAdapter.upsertOne)

        builder
            .addCase(fetchRoles.rejected, asyncThunkErrorHandler)
            .addCase(fetchRoleById.rejected, asyncThunkErrorHandler)
            .addCase(createRole.rejected, asyncThunkErrorHandler)
            .addCase(updateRole.rejected, asyncThunkErrorHandler)
    },
})

export const {
    selectEntities,
    selectAll,
    selectById,
} = rolesEntityAdapter.getSelectors<RootState>(({ roles }) => roles)



export default rolesSlice.reducer