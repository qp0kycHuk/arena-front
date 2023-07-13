import { Uploader } from '@features/fileUploader'
import { IUser } from '@models/User'
import React, { useMemo } from 'react'
import { useUserEditContext } from './UserEdit.Context'
import { getFilePreview } from '@utils/index'

export function UserEditImage() {
  const { user, update } = useUserEditContext()

  const fileItems = useMemo(() => {
    if (user?.image_src) {
      return [
        {
          id: user?.id,
          src: user?.image_src,
          // title: article?.image,
        },
      ]
    }

    return []
  }, [user])

  async function changeHandler(fileItems: IFileItem[]) {
    const file = fileItems[0]?.file

    if (!file) {
      return
    }

    const dataUrl = await getFilePreview(file)

    update({
      imageFile: file,
      image_src: dataUrl || '',
      image_delete: false,
    })
  }

  async function removeImage() {
    // if (!user?.id) return

    update({
      imageFile: undefined,
      image_src: undefined,
      image_delete: true,
    })
  }

  return <Uploader rounded sign={false} multiple={false} fileItems={fileItems} onChange={changeHandler} onRemove={removeImage} />
}
