import React from 'react'
import { BriefcaseIcon } from '@assets/icons/stroke'
import { HandbooksEdit } from './HandbooksEdit'
import { IHandbook } from '@models/Handbook'
import { IUpdateRequest } from '@store/positions/positions.api'
import { useDeletePosition, useFetchPositions, useUpsertPosition } from '@store/positions/'

interface IEditHandbook extends IHandbook {
  key?: EntityId
}

export function HandbooksEditPositions() {
  const { data: positionsData } = useFetchPositions()

  const { mutateAsync: upsertPosition } = useUpsertPosition()
  const { mutateAsync: removePosition } = useDeletePosition()

  async function submitHandler(handbooks: Partial<IEditHandbook>[], removedIds: EntityId[]) {
    const updatedPromises = handbooks.map((handbook) => {
      const formData: IUpdateRequest = new FormData()
      formData.append('name', handbook.name as string)

      if (handbook.id) {
        formData.append('id', handbook.id as string)
      }

      return upsertPosition(formData)
    })

    const removePromises = removedIds.map((id) => {
      return removePosition(id)
    })

    return await Promise.all([...updatedPromises, ...removePromises])
  }

  return (
    <div>
      <div className="flex items-center mb-7">
        <BriefcaseIcon className="mr-2 text-2xl text-default/70" />
        <div className="font-semibold">Должности</div>
      </div>
      <HandbooksEdit onSubmit={submitHandler} initialHandbooks={positionsData?.items} />
    </div>
  )
}
