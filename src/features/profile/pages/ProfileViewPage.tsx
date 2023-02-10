import { Navigate, useParams } from "react-router";
import { ProfileView } from "../components/ProfileView/ProfileView";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useFetchUserById } from "@store/users/users.hooks";


interface IProfileViewPageProps {
}

export function ProfileViewPage(props: IProfileViewPageProps) {
    const { id } = useParams()
    const user = useFetchUserById(id as string)
    const userFullName = ((user?.first_name || '') + ' ' + (user?.last_name || '')).trim()
    useDocumentTitle(userFullName || '')
    
    if (!id) {
        return <Navigate to='/' />
    }
    
    return (
        <ProfileView user={user} />
    );
}