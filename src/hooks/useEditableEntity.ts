import { useCallback, useEffect, useState } from "react"

// create local state copy of entity for edit
export function useEditableEntity<E>(entity?: E): [Partial<E>, (updated: Partial<E>) => void] {
    const [editableEntity, setEditableEntity] = useState<Partial<E>>({})
    const update = useCallback((updated: Partial<E>) => {
        setEditableEntity((prev) => ({
            ...prev,
            ...updated
        }))
    }, [])

    useEffect(() => {
        setEditableEntity(entity || {})
    }, [entity])

    return [editableEntity, update]
}