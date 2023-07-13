import React from 'react'
import { useEffect } from 'react'
import { useForm } from '@hooks/useForm'
import { Button, Input } from '@features/ui'
import { CrossIcon } from '@assets/icons/stroke'
import { ILink } from '../../hooks/useLinks'

export interface ILinksItemProps {
  link: ILink
  updateLink: (updated: ILink) => void
  removeLink: (updated: ILink) => void
}

export function LinksItem({ link, updateLink, removeLink }: ILinksItemProps) {
  const [formState, changeHandler] = useForm<ILink>(link)

  useEffect(() => {
    updateLink(formState)
  }, [formState])

  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="mb-2 text-sm font-medium">Заголовок</div>
        <Input className="w-96" name="text" value={link.text} onChange={changeHandler} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">Ссылка</div>
        <Input className="w-96" name="url" value={link.url} onChange={changeHandler} />
      </div>
      {(link.text || link.url) && (
        <Button onClick={() => removeLink(link)} icon rounded shadow color="gray" variant="whitebg" size="xsmall" className="mt-6 ml-2">
          <CrossIcon className="text-sm"></CrossIcon>
        </Button>
      )}
    </div>
  )
}
