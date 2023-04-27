import { IUser } from '@models/User';
import { ICreateRequest, IUpdateRequest } from "./users.api"
import { createUser, fetchUserById, fetchUsers, updateUser, removeUser } from './users.thunk';
import { selectAll, selectById } from './users.slice';
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