import { TrashIcon } from '@assets/icons/stroke'
import { Spiner } from '@components/Spiner'
import { Button, Input } from '@features/ui'
import { useLoading } from '@hooks/useLoading'
import { IHandbook } from '@models/Handbook'
import { EntityId } from '@reduxjs/toolkit'
import { getRandomUUID } from '@utils/index'
import React, { useEffect, useState } from 'react'

interface IHandbooksEditProps {
  initialHandbooks?: Partial<IEditHandbook>[]
  onSubmit?(handbooks: Partial<IEditHandbook>[], removedIds: EntityId[]): Promise<any>
}

interface IEditHandbook extends IHandbook {
  key?: EntityId
}

export function HandbooksEdit({ initialHandbooks, onSubmit }: IHandbooksEditProps) {
  const { loading, loadingStart, loadingEnd } = useLoading()
  const [handbooks, setHandbooks] = useState<Partial<IEditHandbook>[]>(initialHandbooks || [])
  const [removedIds, setRemovedIds] = useState<EntityId[]>([])

  useEffect(() => {
    setHandbooks(initialHandbooks || [])
  }, [initialHandbooks])

  function addItem() {
    setHandbooks((prev) => [
      ...prev,
      {
        key: getRandomUUID(),
        name: '',
      },
    ])
  }

  function updateHandbookName(id?: EntityId, name?: string) {
    if (!id) return

    setHandbooks((prev) =>
      prev.map((item) => {
        if (item.id === id || item.key === id) {
          return {
            ...item,
            name,
          }
        }

        return item
      })
    )
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    loadingStart()
    await onSubmit?.(handbooks, removedIds)
    setRemovedIds([])
    loadingEnd()
  }

  function removeHandler(handbook: Partial<IEditHandbook>) {
    if (handbook.id) {
      setRemovedIds((prev) => [...prev, handbook.id as EntityId])
    }

    setHandbooks((prev) =>
      prev.filter((item) => {
        if ((item.id || item.key) == (handbook.id || handbook.key)) {
          return false
        } else {
          return true
        }
      })
    )
  }

  return (
    <form onSubmit={submitHandler}>
      {handbooks.map((handbook) => (
        <div className="flex mb-4" key={handbook.id || handbook.key}>
          <div>
            {/* <div className="mb-2 text-sm font-medium">Заголовок</div> */}
            <Input className="w-96" value={handbook.name} onChange={(event) => updateHandbookName(handbook.id || handbook.key, event.target.value)} />
          </div>
          <Button onClick={() => removeHandler(handbook)} color="red" variant="light" icon className="self-end ml-6">
            <TrashIcon className="text-2xl" />
          </Button>
        </div>
      ))}

      <Button onClick={addItem} variant="text" className="mt-2">
        Добавить позицию
      </Button>

      <div className="flex gap-4 mt-8">
        <Button type="submit" disabled={loading}>
          {loading ? <Spiner /> : 'Сохранить'}
        </Button>
        <Button onClick={() => setHandbooks(initialHandbooks || [])} variant="light">
          Отмена
        </Button>
      </div>
    </form>
  )
}
