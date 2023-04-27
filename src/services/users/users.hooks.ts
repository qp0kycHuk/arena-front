import { createHooks } from "@services/utils/createHooks";
import { ICreateRequest, IUpdateRequest, usersApi } from "./users.api";
import type { IUser } from "@models/User";
import { updateAuth } from "@store/auth/auth.slice";
import { store, useAppDispatch } from "@store/index";

export const {
    useFetchEntities: useFetchUsers,
    useFetchEntityById: useFetchUserById,
    useEntitiesControl: useUserControl
} = createHooks<IUser, ICreateRequest, IUpdateRequest>({
    api: usersApi,
    onUpdate: updateHandler
})

function updateHandler(updatedUser: IUser) {
    store.dispatch(updateAuth(updatedUser))
}