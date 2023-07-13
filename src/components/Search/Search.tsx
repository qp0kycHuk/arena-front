import * as React from 'react'
import { AdjustmentsHorizontalIcon, SearchIcon } from '@assets/icons/stroke'
import { Button, Input } from '@features/ui'

interface ISearchProps {
  className: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  initialValue: string
}

export function Search({ className, onChange, initialValue }: ISearchProps) {
  return (
    <div className={'relative ' + className}>
      <Button variant="text" color="gray" size="small" className="px-3 absolute left-1 top-1.5">
        <AdjustmentsHorizontalIcon className="text-2xl" />
      </Button>
      <Input placeholder="Поиск" className="w-full pl-14 bg-gray bg-opacity-10" onChange={onChange} defaultValue={initialValue} />
      <Button variant="text" color="gray" size="small" className="px-3 absolute right-2 top-1.5">
        <SearchIcon className="text-lg" />
      </Button>
    </div>
  )
}
