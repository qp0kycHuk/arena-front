import { useMemo } from "react"
import { useAppSelector } from "../index"

export const useAuth = () => {
    const auth = useAppSelector((state) => state.auth)
    return useMemo(() => (auth), [auth.token, auth.isLogedIn, auth.user])
}