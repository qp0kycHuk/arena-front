import { createContext, useContext, FormEvent } from "react"
import { useEditableEntity } from "@hooks/useEditableEntity"
import { useLoading } from "@hooks/useLoading"
import { IUser } from "@models/User"
import { ICreateRequest, IUpdateRequest } from "@services/users/users.api"
import { useUserControl } from "@services/users/users.hooks"
import { useNavigate } from "react-router-dom"
import { getRoute } from "@utils/index"
import { dateToSQLFormatString } from "@utils/helpers/dates"
import { EMPTY_OBJECT } from "@utils/const"


export const UserEditContext = createContext<IArticleEditContextValue>({} as IArticleEditContextValue)
export const useUserEditContext = () => useContext(UserEditContext)

export function UserEditContextProvider({
    children,
    user }: IUserEditContextProviderProps
) {
    const [editableUser, update] = useEditableEntity<IEditableUser>(user || EMPTY_OBJECT)
    const { loading, loadingStart, loadingEnd } = useLoading()
    const { upsert: upsertUser } = useUserControl()
    const navigate = useNavigate();

    function getFormData(): ICreateRequest {
        const formData: ICreateRequest = new FormData()
        const data = editableUser as Required<IEditableUser>

        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        formData.append('patronymic', data.patronymic || '')
        formData.append('date_of_birth', dateToSQLFormatString(new Date(data.date_of_birth || '')))
        formData.append('email', data.email || '')
        formData.append('telegram', data.telegram || '')

        if (data.id) {
            formData.append('id', data.id as string)
        }
        if (data.image_delete && data.id) {
            (formData as IUpdateRequest).append('image_delete', '1')
        }
        if (data.imageFile) {
            formData.append('image', data.imageFile)
        }

        data.positions.forEach((position) => {
            formData.append('positions[]', position.id as string)
        })

        return formData
    }

    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = getFormData()

        loadingStart()
        const updatedUser = await upsertUser(formData)
        loadingEnd()

        if ((updatedUser as IUser).id) {
            navigate(getRoute().users((updatedUser as IUser).id))
        }
    }

    return (
        <UserEditContext.Provider value={{
            user: editableUser,
            loading,
            update,
            submitHandler
        }}>
            {children}
        </UserEditContext.Provider>
    )
}

interface IUserEditContextProviderProps extends React.PropsWithChildren {
    user?: IUser
}

interface IEditableUser extends Partial<IUser> {
    imageFile?: File
    image_delete?: boolean
}

interface IArticleEditContextValue {
    user: Partial<IEditableUser>
    loading: boolean
    update(updated: Partial<IEditableUser>): void
    submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void>
}