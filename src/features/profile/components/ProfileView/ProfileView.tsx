import { Button } from "@features/ui";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { PageContent } from "@layouts/PageContent";
import { IUser } from "@models/User";
import { getRoute } from "@utils/index";
import { Link } from "react-router-dom";
import { ProfileViewImage } from "./ProfileView.Image";
import { ProfileViewName } from "./ProfileView.Name";


interface IProfileViewProps {
    user?: IUser
}

export function ProfileView({ user }: IProfileViewProps) {
    

    return (
        <PageContent className="flex">
            <div className="w-[360px] px-8 py-12 border-r border-gray border-opacity-30">
                <div className="flex items-center">
                    <ProfileViewImage className="mr-3" user={user} />
                    <div>
                        <ProfileViewName user={user} />
                        
                    </div>
                </div>

                <Link to={getRoute().users.edit(user?.id)} className="block mt-4">
                    <Button className="w-full">Редактировать</Button>
                </Link>
            </div>
            <div className="flex-grow p-8">
                <pre >
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </PageContent>
    );
}