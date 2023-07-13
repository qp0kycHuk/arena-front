import { useState } from 'react'

export function useArray<T>(initialValue: T[] = []) {
  const [array, setArray] = useState<T[]>(initialValue)

  function push(element?: T) {
    if (!element) return
    setArray((a) => [...a, element])
  }

  function filter(callback: (value: T, index: number, array: T[]) => T) {
    setArray((a) => a.filter(callback))
  }

  return { array, setArray, push, filter }
}
