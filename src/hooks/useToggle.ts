import { useCallback, useState } from 'react'

type IToggleResult = [boolean, () => void, () => void, () => void]

export function useToggle(initial = false): IToggleResult {
  const [value, setValue] = useState(initial)
  const on = useCallback(() => setValue(true), [])
  const off = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((prev) => !prev), [])

  return [value, toggle, on, off]
}
