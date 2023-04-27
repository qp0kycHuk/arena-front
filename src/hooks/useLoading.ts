import { useCallback, useState } from "react"
import { useToggle } from "./useToggle"

export function useLoading(initial: boolean = false) {
    const [loading, toggle, on, off] = useToggle(initial)

    return {
        loading,
        loadingStart: on,
        loadingEnd: off,
    }
}