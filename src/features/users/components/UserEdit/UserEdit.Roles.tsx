import { Select } from '@features/ui'
import { useUserEditContext } from './UserEdit.Context'
import React from 'react'
import { roles } from '@features/users'

export function UserEditRoles() {
  const { user, update } = useUserEditContext()

  function changeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const newPosition = event.target.value as keyof typeof roles

    update({
      role: newPosition,
    })
  }

  return (
    <label className="block w-full">
      <div className="mb-2 text-sm font-medium">Роль</div>
      <Select className="w-full" defaultValue={user.role || roles.subscriber.key} onChange={changeHandler}>
        {Object.values(roles).map(({ key, name }) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </Select>
    </label>
  )
}
