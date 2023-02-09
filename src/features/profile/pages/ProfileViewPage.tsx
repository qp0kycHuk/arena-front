import { Navigate, useParams } from "react-router";
import { ProfileView } from "../components/ProfileView/ProfileView";


interface IProfileViewPageProps {
}

export function ProfileViewPage(props: IProfileViewPageProps) {
    const { id } = useParams()
    
    if (!id) {
        return <Navigate to='/' />
    }
    
    return (
        <ProfileView userId={id} />
    );
}