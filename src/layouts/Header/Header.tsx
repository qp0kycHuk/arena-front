import * as React from 'react';
import headerLogo from '@assets/img/header-logo.png'
import { BookmarkIcon, ToDownIcon } from '@assets/icons/stroke';
import { UserIcon } from '@assets/icons/fill';
import { Button, CheckBox } from '@features/ui';
import { Link } from 'react-router-dom';
import { useAuth } from '@store/auth';
import { HeaderUser } from './HeaderUser';

export interface IHeaderProps {
}

export function Header(props: IHeaderProps) {
  const auth = useAuth()

  return (
    <header className='flex items-center px-8 py-2 bg-white dark:bg-opacity-5'>
      <div className="mr-auto">
        <img src={headerLogo} alt="" className='h-[26px]' />
      </div>
      <CheckBox
        onChange={(event) => document.body.classList.toggle('dark', event.currentTarget.checked)}
        className='mr-5'
        label='Dark mode' />

      <Button variant='contur' size='small' color='gray'>
        <BookmarkIcon className="text-2xl" />
      </Button>
      {auth.isLogedIn ?
        <HeaderUser />
        :
        <Link to="login" className='mx-2'>
          <Button variant='contur' size='small' color='gray'>
            Login
          </Button>
        </Link>
      }

    </header>
  );
}
