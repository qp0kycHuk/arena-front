import { useState } from "react"

type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export function useForm<T>(initialState: T): [T, ChangeHandler] {
    const [formState, setFormState] = useState<T>(initialState)

    const changeHandler: ChangeHandler = (event) => {
        if (event?.target) {
            setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        }
    }

    return [formState, changeHandler]
}