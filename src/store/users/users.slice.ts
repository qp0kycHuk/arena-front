import { IUser } from '@models/User';
import { RootState } from '../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUserById, fetchUsers, updateUser } from "./users.thunk";
import { usersEntityAdapter } from "./users.adapter";
import { asyncThunkErrorHandler } from '@store/utils/asyncThunkErrorHandler';


export const usersSlice = createSlice({
    name: 'users',
    initialState: usersEntityAdapter.getInitialState(),
    reducers: {
        updateUser(state, action: PayloadAction<IUser>) {
            usersEntityAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, usersEntityAdapter.removeAll)

        builder
            .addCase(fetchUsers.fulfilled, usersEntityAdapter.setAll)
            .addCase(fetchUserById.fulfilled, usersEntityAdapter.upsertOne)
            .addCase(createUser.fulfilled, usersEntityAdapter.upsertOne)
            .addCase(updateUser.fulfilled, usersEntityAdapter.upsertOne)

        builder
            .addCase(fetchUsers.rejected, asyncThunkErrorHandler)
            .addCase(fetchUserById.rejected, asyncThunkErrorHandler)
            .addCase(createUser.rejected, asyncThunkErrorHandler)
            .addCase(updateUser.rejected, asyncThunkErrorHandler)
    },
})

export const {
    selectEntities,
    selectAll,
    selectById,
} = usersEntityAdapter.getSelectors<RootState>(({ users }) => users)



export default usersSlice.reducer