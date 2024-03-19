import React from 'react'
import { useEffect } from 'react'
import { useForm } from '@hooks/useForm'
import { Button, Input } from '@features/ui'
import { CrossIcon } from '@assets/icons/stroke'
import { ILink } from '@models/Link'

export interface ILinksItemProps {
  link: Partial<ILink>
  updateLink: (updated: Partial<ILink>) => void
  removeLink: (removed: Partial<ILink>) => void
}

export function LinksItem({ link, updateLink, removeLink }: ILinksItemProps) {
  const [formState, changeHandler] = useForm<Partial<ILink>>(link)

  useEffect(() => {
    updateLink(formState)
  }, [formState])

  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="mb-2 text-sm font-medium">Заголовок</div>
        <Input className="w-96" name="name" value={link.name} onChange={changeHandler} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">Ссылка</div>
        <Input
          className="w-96"
          name="url"
          value={link.url}
          onChange={changeHandler}
          required={Boolean(formState.name)}
        />
      </div>
      {(formState.name || formState.url) && (
        <Button
          onClick={() => removeLink(link)}
          icon
          shadow
          color="gray"
          variant="whitebg"
          size="xs"
          className="mt-6 ml-2 rounded-full"
        >
          <CrossIcon className="text-sm"></CrossIcon>
        </Button>
      )}
    </div>
  )
}
