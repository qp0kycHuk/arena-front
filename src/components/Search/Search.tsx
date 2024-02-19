import * as React from 'react'
import { AdjustmentsHorizontalIcon, CrossIcon, SearchIcon } from '@assets/icons/stroke'
import { Button, Input } from '@features/ui'

interface ISearchProps {
  value: string
  onChange(newValue: string): void
  className?: string
  placeholder?: string
}

export function Search({ className, onChange, value, placeholder = 'Поиск' }: ISearchProps) {
  const inputRef = React.createRef<HTMLInputElement>()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value
    }
  }, [value])

  function searchSubmitHandler(event: React.FormEvent) {
    event.preventDefault()
    onChange(inputRef.current?.value || '')
  }

  function searchClearHandler() {
    onChange('')

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <form onSubmit={searchSubmitHandler} className={'relative ' + className}>
      <Button variant="text" color="gray" size="sm" className="px-3 absolute left-1 top-1.5">
        <AdjustmentsHorizontalIcon className="text-2xl" />
      </Button>
      <Input placeholder={placeholder} className="w-full pl-14 bg-default/5" defaultValue={value} ref={inputRef} />
      <div className="flex absolute right-2 top-1.5">
        <Button type="submit" variant="text" size="sm" className="px-3">
          <SearchIcon className="text-lg text-default/80" />
        </Button>
        {value.length > 0 && (
          <Button color="red" icon variant="text" size="sm" onClick={searchClearHandler}>
            <CrossIcon />
          </Button>
        )}
      </div>
    </form>
  )
}
