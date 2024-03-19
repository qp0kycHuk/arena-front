import { useEffect, useRef } from 'react'

export function useDocumentTitle(title?: string, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    if (title) {
      document.title = title + ' ' + import.meta.env.VITE_TITLE_POSTFIX
    }
  }, [title])

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current
      }
    },
    []
  )
}
