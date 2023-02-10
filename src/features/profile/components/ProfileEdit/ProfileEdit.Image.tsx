import { Uploader } from "@features/fileUploader";
import { IUser } from "@models/User";
import { useMemo } from "react";
import { useUserEditContext } from "./ProfileEdit.Context";


interface IProfileEditImageProps { }

export function ProfileEditImage({ }: IProfileEditImageProps) {
    const { user } = useUserEditContext()

    const fileItems = useMemo(() => user?.image_src ? ([{
        id: user?.id,
        src: user?.image_src,
        // title: article?.image,
    }]) : [], [user])

    return (
        <Uploader
            multiple={false}
            fileItems={fileItems}
            // onChange={changeHandler}
        />
    );
}