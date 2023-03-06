import { Button } from "@features/ui";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { PageContent } from "@layouts/PageContent";
import { IUser } from "@models/User";
import { getRoute } from "@utils/index";
import { Link } from "react-router-dom";
import { ProfileViewImage } from "./ProfileView.Image";
import { ProfileViewName } from "./ProfileView.Name";
import { CakeIcon } from "@assets/icons/stroke";


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

                {user?.date_of_birth ?
                    <div className="flex items-center mt-6 text-sm text-gray">
                        <CakeIcon className="mr-2 text-2xl " />
                        День рождения: {new Date(user.date_of_birth).toLocaleDateString()}
                    </div> : null
                }
                
                {user?.email ?
                    <div className="flex items-center mt-6 text-sm text-gray">
                        <img src="/img/email.svg" alt="" className="w-6 h-6 mr-2" />
                        {user.email}
                    </div> : null
                }
                
                {user?.telegram ?
                    <div className="flex items-center mt-2 text-sm text-gray">
                        <img src="/img/telegram.svg" alt="" className="w-6 h-6 mr-2" />
                        {user.telegram}
                    </div> : null
                }

           

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