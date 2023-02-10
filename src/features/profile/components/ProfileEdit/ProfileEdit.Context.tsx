import { createContext, useCallback, useEffect, useState, useContext } from "react"
import { useEditableEntity } from "@hooks/useEditableEntity"
import { useLoading } from "@hooks/useLoading"
import { IUser } from "@models/User"


export const UserEditContext = createContext<IArticleEditContextValue>({} as IArticleEditContextValue)
export const useUserEditContext = () => useContext(UserEditContext)

export function UserEditContextProvider({
    children,
    user }: IUserEditContextProviderProps
) {
    const [editableUser, update] = useEditableEntity<IEditableUser>(user)
    const { loading, loadingStart, loadingEnd } = useLoading()

    return (
        <UserEditContext.Provider value={{
            user: editableUser,
            loading,
            update,
        }}>
            {children}
        </UserEditContext.Provider>
    )
}




interface IUserEditContextProviderProps extends React.PropsWithChildren {
    user?: IUser
}

interface IEditableUser extends IUser { }

interface IArticleEditContextValue {
    user: Partial<IEditableUser>
    loading: boolean
    update(updated: Partial<IEditableUser>): void
}