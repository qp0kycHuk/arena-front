import { useMemo } from "react"

export function useErrorMessage(error: any) {
    const errorMessage = useMemo(() => {
        if (error && ('data' in error)) {
            return (error.data as IServerError).message
        } else {
            return null
        }
    }, [error])

    return errorMessage
}