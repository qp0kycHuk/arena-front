import React from 'react'
import { UserEditImage } from './UserEdit.Image'
import { useUserEditContext } from './UserEdit.Context'
import { Button, DatePicker, Input, Select } from '@features/ui'
import { PhoneInput } from '@components/PhoneInput'
import { getUnmaskedPhoneValue } from '@utils/index'
import { Spiner } from '@components/Spiner'
import { UserEditPosition } from './UserEdit.Position'
import { UserEditRoles } from './UserEdit.Roles'
import { dateToSQLFormatString } from '@utils/helpers/dates'
import { isUser } from '@features/users/utils/isUser'
import { IUser } from '@models/User'

export function UserEdit() {
  const { user, update, loading, submitHandler, isCurrentUser, isCurrentUserRole, toggleStatus } = useUserEditContext()

  return (
    <form onSubmit={submitHandler}>
      <UserEditImage />
      <div className="my-5"></div>

      <div className="flex">
        <div className="w-[360px] ">
          <div className="mb-8 text-2xl font-semibold">Личные данные </div>

          <div className="flex flex-col gap-5">
            <label className="block w-full">
              <div className="mb-2 text-sm font-medium">Фамилия</div>
              <Input
                value={user.last_name || ''}
                className="w-full"
                required
                disabled={!isCurrentUser}
                onChange={(event) => update({ last_name: event.target.value })}
              />
            </label>
            <label className="block w-full">
              <div className="mb-2 text-sm font-medium">Имя</div>
              <Input
                value={user.first_name || ''}
                className="w-full"
                required
                disabled={!isCurrentUser}
                onChange={(event) => update({ first_name: event.target.value })}
              />
            </label>
            <label className="block w-full">
              <div className="mb-2 text-sm font-medium">Отчество</div>
              <Input
                value={user.patronymic || ''}
                className="w-full"
                disabled={!isCurrentUser}
                onChange={(event) => update({ patronymic: event.target.value })}
              />
            </label>
            <label className="block w-full">
              <div className="mb-2 text-sm font-medium">Дата рождения</div>
              <DatePicker
                className="w-full"
                value={user.date_of_birth}
                disabled={!isCurrentUser}
                onSelect={({ date }) => update({ date_of_birth: dateToSQLFormatString(date as Date) })}
              />
            </label>
            <UserEditPosition />
          </div>
        </div>
        <div className="mx-12 border-r border-gray border-opacity-20"></div>
        <div className="w-[360px] ">
          <div className="mb-8 text-2xl font-semibold">Контакты</div>
          <div className="flex flex-col gap-5">
            <label className="block w-full">
              <div className="mb-2 text-sm font-medium">Почта</div>
              <Input
                value={user.email || ''}
                className="w-full"
                type="email"
                disabled={!isCurrentUser}
                onChange={(event) => update({ email: event.target.value })}
              />
            </label>
            <label className="block w-full">
              <div className="mb-2 text-sm font-medium">Телеграм</div>
              <Input
                value={user.telegram || ''}
                className="w-full"
                disabled={!isCurrentUser}
                onChange={(event) => update({ telegram: event.target.value })}
              />
            </label>
            <UserEditRoles />
          </div>
        </div>
        <div className="mx-12 border-r border-gray border-opacity-20"></div>
        <div className="w-[360px] ">
          <div className="mb-8 text-2xl font-semibold">Данные для входа в ЛК</div>
          <div className="flex flex-col gap-5">
            <label className="block w-full">
              <div className="mb-2 text-sm font-medium">Логин</div>
              <PhoneInput value={user.phone || ''} className="w-full" required readOnly disabled />
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <Button type="submit" disabled={loading}>
          {loading ? <Spiner /> : 'Сохранить'}
        </Button>
        <Button variant="light">Отмена</Button>
        {isCurrentUserRole.admin && !isUser(user as IUser).admin && (
          <Button
            disabled={loading}
            onClick={toggleStatus}
            color={user.status == 'active' ? 'red' : 'green'}
            className="ml-auto"
          >
            {loading ? <Spiner /> : user.status == 'active' ? 'Деактивировать' : 'Активировать'}
          </Button>
        )}
      </div>
    </form>
  )
}
