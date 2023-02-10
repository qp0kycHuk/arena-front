import { useCallback, useState } from "react"

export function useLoading(initial: boolean = false) {
    const [loading, setLoading] = useState(initial)
    const loadingStart = useCallback(() => setLoading(true), [])
    const loadingEnd = useCallback(() => setLoading(false), [])

    return {
        loading,
        loadingStart,
        loadingEnd,
    }
}