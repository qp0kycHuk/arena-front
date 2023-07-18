import { EMPTY_OBJECT } from '@utils/const'
import { useCallback, useEffect, useState } from 'react'

// create local state copy of entity for edit
export function useEditableEntity<E>(entity?: E): [Partial<E>, (updated: Partial<E>) => void] {
  const [editableEntity, setEditableEntity] = useState<Partial<E>>({})
  const update = useCallback((updated: DispatchEditableEntity<E>) => {
    if (typeof updated === 'function') {
      setEditableEntity(updated)
      return
    }

    setEditableEntity((prev) => ({
      ...prev,
      ...updated,
    }))
  }, [])

  useEffect(() => {
    setEditableEntity(entity || EMPTY_OBJECT)
  }, [entity])

  return [editableEntity, update]
}

export type DispatchEditableEntity<E> = ((prev: Partial<E>) => Partial<E>) | Partial<E>
