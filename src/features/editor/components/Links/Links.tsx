import React, { useEffect, useMemo } from 'react'
import { Button } from '@features/ui'
import { LinksItem } from './LinksItem'
import { getRandomUUID } from '@utils/index'
import { ILink } from '@models/Link'

interface ILinksProps {
  links: Partial<ILink>[]
  onChange(links: Partial<ILink>[], action?: string): void
}

export function Links({ links, onChange }: ILinksProps) {
  const isAccessAdd = useMemo(() => links.every((link) => link.name && link.url), [links])

  useEffect(() => {
    if (links.length === 0) {
      onChange([createEmptyLink()])
    }
  }, [links])

  function addLink() {
    onChange([...links, createEmptyLink()])
  }

  function updateLink(updated: Partial<ILink>) {
    onChange(
      links.map((link) => {
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

  function removeLink(removed: Partial<ILink>) {
    if (links.length === 1) {
      onChange([createEmptyLink()])
      return
    }

    onChange(
      links.filter((link) => {
        if (!link.key && link.id === removed.id) {
          return false
        }

        if (link.key && link.key === removed.key) {
          return false
        }

        return true
      }),
      'remove'
    )
  }

  return (
    <div>
      <div className="space-y-4">
        {links.map((link) => (
          <LinksItem removeLink={removeLink} updateLink={updateLink} link={link} key={link.id || link.key} />
        ))}
      </div>
      <Button disabled={!isAccessAdd} onClick={addLink} variant="text" className="mt-2">
        Добавить ссылку
      </Button>
    </div>
  )
}

export function createEmptyLink(): Partial<ILink> {
  return {
    key: getRandomUUID(),
    name: '',
    url: '',
  }
}
