import { ImageIcon } from "@assets/icons/stroke";
import { IUser } from "@models/User";

interface IProfileViewImageProps {
    user?: IUser
    isLoading?: boolean
    className?: string
}

export function ProfileViewImage({ user, isLoading, className }: IProfileViewImageProps) {
    const imageClassName = 'w-[52px] h-[52px] rounded-full overflow-hidden'
    const imageSrc = user?.image_src ? user.image_src : ''

    if (!user || isLoading) {
        return (
            <div className={imageClassName + " animate-pulse bg-gray bg-opacity-50 " + className}> </div>
        )
    }

    if (!imageSrc) {
        return (<div className={imageClassName + ' flex bg-gray bg-opacity-10 ' + className}>
            <ImageIcon className="m-auto text-2xl text-gray" />
        </div>)
    }

    return (
        <div className={imageClassName + ' ' + className}>
            <img src={user?.image_src} alt="" className="w-full h-full object-cover" />
        </div>
    );
}