import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@store/auth'
import { Button, CheckBox } from '@features/ui'
import { HeaderUser } from './HeaderUser'
import { BookmarkIcon } from '@assets/icons/stroke'
import headerLogo from '@assets/img/header-logo.png'
import { useToggleTheme } from '@store/theme/theme.hooks'

export function Header() {
  const { theme, toggle: toggleTheme } = useToggleTheme()
  const auth = useAuth()

  return (
    <header className="sticky top-0 z-20 flex items-center px-8 py-2 bg-white shadow-sm dark:bg-opacity-5">
      <div className="mr-auto">
        <img src={headerLogo} alt="" className="h-[26px]" />
      </div>
      <CheckBox defaultChecked={theme === 'DARK'} onChange={(event) => toggleTheme()} className="mr-5" label="Dark mode" />

      <Button variant="contur" size="small" color="gray">
        <BookmarkIcon className="text-2xl" />
      </Button>
      {auth.isLogedIn ? (
        <HeaderUser />
      ) : (
        <Link to="login" className="mx-2">
          <Button variant="contur" size="small" color="gray">
            Login
          </Button>
        </Link>
      )}
    </header>
  )
}
