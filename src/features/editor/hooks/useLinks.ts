import { useEffect, useState } from 'react'
import { getRandomUUID } from '@utils/index'

export interface ILink {
  id?: string
  key?: string
  text: string
  url: string
}

export interface ILinksController {
  links: ILink[]
  isAccessAdd: boolean
  addLink: () => void
  updateLink: (updated: ILink) => void
  removeLink: (updated: ILink) => void
}

export function createEmptyLink(): ILink {
  return {
    key: getRandomUUID(),
    text: '',
    url: '',
  }
}

export function useLinks(initial: ILink[] = []): ILinksController {
  const [links, setLinks] = useState<ILink[]>(initial?.length ? initial : [createEmptyLink()])
  const isAccessAdd = links.every((link) => link.text && link.url)

  useEffect(() => {
    if (links.length === 0) {
      setLinks([createEmptyLink()])
    }
  }, [links])

  function addLink() {
    setLinks((prev) => [...prev, createEmptyLink()])
  }

  function updateLink(updated: ILink) {
    setLinks((prev) =>
      prev.map((link) => {
        if (!link.key && link.id === updated.id) {
          return updated
        }

        if (link.key && link.key === updated.key) {
          return updated
        }

        return link
      })
    )
  }

  function removeLink(removed: ILink) {
    if (links.length === 1) {
      setLinks([createEmptyLink()])
      return
    }

    setLinks((prev) =>
      prev.filter((link) => {
        if (!link.key && link.id === removed.id) {
          return false
        }

        if (link.key && link.key === removed.key) {
          return false
        }

        return true
      })
    )
  }

  return {
    links,
    isAccessAdd,
    addLink,
    updateLink,
    removeLink,
  }
}
