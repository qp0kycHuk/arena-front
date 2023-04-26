import { IUser } from '@models/User';
import { toast } from '@lib/Toast';
import { RootState, useAppDispatch, useAppSelector } from '../index';
import { EntityId, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUserById, fetchUsers, updateUser } from "./users.thunk";
import { usersEntityAdapter } from "./users.adapter";
import { useEffect } from 'react';
import { thunkErrorHandler } from '@store/utils/thunkErrorHandler';


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
            .addCase(fetchUsers.rejected, thunkErrorHandler)
            .addCase(fetchUserById.rejected, thunkErrorHandler)
            .addCase(createUser.rejected, thunkErrorHandler)
            .addCase(updateUser.rejected, thunkErrorHandler)
    },
})

export const {
    selectEntities,
    selectAll,
    selectById,
} = usersEntityAdapter.getSelectors<RootState>(({ users }) => users)



export default usersSlice.reducer