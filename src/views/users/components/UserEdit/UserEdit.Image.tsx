import { Uploader } from '@features/fileUploader'
import { IUser } from '@models/User'
import React, { useMemo } from 'react'
import { useUserEditContext } from './UserEdit.Context'
import { getFilePreview } from '@utils/index'
import { UserIcon } from '@assets/icons/fill'
import classNames from 'classnames'

export function UserEditImage() {
  const { user, update, isCurrentUser } = useUserEditContext()

  if (!isCurrentUser) {
    return (
      <div
        className={classNames('relative w-24 h-24 rounded-full', !user.image_src ? 'bg-gray bg-opacity-20 flex' : null)}
      >
        {user.image_src ? (
          <img className="object-cover w-full h-full rounded-full" src={user.image_src} alt="" />
        ) : (
          <UserIcon className="m-auto text-3xl text-gray" />
        )}
      </div>
    )
  }

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

  return (
    <Uploader
      rounded
      sign={false}
      multiple={false}
      fileItems={fileItems}
      onChange={changeHandler}
      onRemove={removeImage}
    />
  )
}
