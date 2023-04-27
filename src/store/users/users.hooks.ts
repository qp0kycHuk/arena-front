import { IUser } from '@models/User';
import { useAppDispatch, useAppSelector } from './../index';
import { ICreateRequest, IUpdateRequest } from "./users.api"
import { createUser, fetchUserById, fetchUsers, updateUser, removeUser } from './users.thunk';
import { usersSlice, selectAll, selectById } from './users.slice';
import { useEffect } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { createEntitiesHooks } from '@store/utils/createEntitiesHooks';

export const {
    useEntitiesControl: useUserControl,
    useFetchEntities: useFetchUsers,
    useFetchEntityById: useFetchUserById
} = createEntitiesHooks<IUser, ICreateRequest, IUpdateRequest>({
    fetchAllThunk: fetchUsers,
    updateThunk: updateUser,
    removeThunk: removeUser,
    createThunk: createUser,
    fetchByIdThunk: fetchUserById,
    selectEntitiesSelector: ({ users }) => users,
    selectAllSelector: selectAll,
    selectByIdSelector: selectById,
})