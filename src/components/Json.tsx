import { useEffect, useState } from 'react'

type IJsonProps = {
  children?: any
}

export function Json({ children }: IJsonProps) {
  const [json, setJson] = useState('')

  useEffect(() => {
    try {
      const stringified = JSON.stringify(children, null, 2)
      setJson(stringified)
    } catch (error: any) {
      setJson(error.toString())
    }
  }, [children])

  return <pre>{json}</pre>
}
