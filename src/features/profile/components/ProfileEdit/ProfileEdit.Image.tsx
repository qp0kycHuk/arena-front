import { Uploader } from "@features/fileUploader";
import { IUser } from "@models/User";
import { useMemo } from "react";
import { useUserEditContext } from "./ProfileEdit.Context";
import { getFilePreview } from "@utils/index";


interface IProfileEditImageProps { }

export function ProfileEditImage({ }: IProfileEditImageProps) {
    const { user, update } = useUserEditContext()

    const fileItems = useMemo(() => user?.image_src ? ([{
        id: user?.id,
        src: user?.image_src,
        // title: article?.image,
    }]) : [], [user])

    async function changeHandler(fileItems: IFileItem[]) {
        const file = fileItems[0]?.file

        if (!file) {
            return;
        }

        const dataUrl = await getFilePreview(file)

        update({
            imageFile: file,
            image_src: dataUrl || '',
            image_delete: false
        })

    }

    async function removeImage() {
        // if (!user?.id) return

        update({
            imageFile: undefined,
            image_src: undefined,
            image_delete: true
        })
    }


    return (
        <Uploader
            multiple={false}
            fileItems={fileItems}
            onChange={changeHandler}
            onRemove={removeImage}
        />
    );
}