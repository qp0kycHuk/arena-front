import React from 'react'
import { HashIcon } from '@assets/icons/stroke'
import { HandbooksEdit } from './HandbooksEdit'
import { IUpdateRequest } from '@store/tags/tags.api'
import { IHandbook } from '@models/Handbook'
import { useDeleteTag, useFetchTags, useUpsertTag } from '@store/tags/'

interface IEditHandbook extends IHandbook {
  key?: EntityId
}

export function HandbooksEditTags() {
  const { data: tagsData } = useFetchTags()

  const { mutateAsync: upsertTag } = useUpsertTag()
  const { mutateAsync: removeTag } = useDeleteTag()

  async function submitHandler(handbooks: Partial<IEditHandbook>[], removedIds: EntityId[]) {
    const updatedPromises = handbooks.map((handbook) => {
      const formData: IUpdateRequest = new FormData()
      formData.append('name', handbook.name as string)

      if (handbook.id) {
        formData.append('id', handbook.id as string)
      }

      return upsertTag(formData)
    })

    const removePromises = removedIds.map((id) => {
      return removeTag(id)
    })

    return await Promise.all([...updatedPromises, ...removePromises])
  }

  return (
    <div>
      <div className="flex items-center mb-7">
        <HashIcon className="mr-2 text-2xl text-default/70" />
        <div className="font-semibold">Тэги</div>
      </div>
      <HandbooksEdit onSubmit={submitHandler} initialHandbooks={tagsData?.items} />
    </div>
  )
}
