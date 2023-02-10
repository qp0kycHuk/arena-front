import { Navigate, useParams } from "react-router";
import { ProfileEdit } from "../components/ProfileEdit/ProfileEdit";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useFetchUserById } from "@store/users/users.hooks";
import { UserEditContextProvider } from "../components/ProfileEdit/ProfileEdit.Context";
import { PageContent } from "@layouts/PageContent";


interface IProfileEditPageProps {
}

export function ProfileEditPage(props: IProfileEditPageProps) {
    const { id } = useParams()
    const user = useFetchUserById(id as string)
    useDocumentTitle('Редактирование')

    if (!id) {
        return <Navigate to='/' />
    }

    return (
        <PageContent className="p-8">
            <div className="text-2xl font-semibold mb-10">Редактирование</div>
            <UserEditContextProvider user={user}>
                <ProfileEdit  />
            </UserEditContextProvider>
        </PageContent>
    );
}