import { IUser } from "@models/User";


interface IUserViewNameProps {
    user?: IUser
    isLoading?: boolean
    className?: string
}

export function UserViewName({ user, isLoading }: IUserViewNameProps) {
    if (!user || isLoading) {
        return <div>
            <div className="w-32 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
            <div className="w-24 h-3 mt-2 bg-opacity-50 animate-pulse bg-gray"></div>
        </div>
    }

    return (
        <div>
            <div className="font-semibold">{user?.last_name} {user?.first_name} {user?.patronymic}</div>
            {
                user?.positions[0]?.name ?
                    <div className="opacity-60">{user?.positions[0]?.name}</div>
                    : null
            }

        </div>
    );
}