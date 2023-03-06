import { IUser } from "@models/User";


interface IProfileViewNameProps {
    user?: IUser
    isLoading?: boolean
    className?: string
}

export function ProfileViewName({ user, isLoading }: IProfileViewNameProps) {
    if (!user || isLoading) {
        return <div>
            <div className="w-32 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
            <div className="w-24 h-3 mt-2 bg-opacity-50 animate-pulse bg-gray"></div>
        </div>
    }

    return (
        <div>
            <div className="font-semibold">{user?.first_name} {user?.last_name}</div>
            {
                user?.positions[0]?.name ?
                    <div className="opacity-60">{user?.positions[0]?.name}</div>
                    : null
            }

        </div>
    );
}