import { IUser } from "@models/User";


interface IProfileViewNameProps {
    user?: IUser
    isLoading?: boolean
    className?: string
}

export function ProfileViewName({ user, isLoading }: IProfileViewNameProps) {
    if (!user || isLoading) {
        return <div className="w-32 h-3 bg-opacity-50 animate-pulse bg-gray "></div>
    }

    return (
        <div className="font-semibold">{user?.first_name} {user?.last_name}</div>
    );
}