import { IRole } from '@models/Role';
import { toast } from '@lib/Toast';
import { RootState } from '../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createRole, fetchRoleById, fetchRoles, updateRole } from "./roles.thunk";
import { rolesEntityAdapter } from "./roles.adapter";


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
            .addCase(fetchRoles.rejected, showThunkError)
            .addCase(fetchRoleById.rejected, showThunkError)
            .addCase(createRole.rejected, showThunkError)
            .addCase(updateRole.rejected, showThunkError)
    },
})

function showThunkError(state: any, action: any) {
    toast.error(action.payload.message)
}

export const {
    selectEntities,
    selectAll,
    selectById,
} = rolesEntityAdapter.getSelectors<RootState>(({ roles }) => roles)



export default rolesSlice.reducer