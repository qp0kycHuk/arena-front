import * as React from 'react';
import headerLogo from '@assets/img/header-logo.png'
import { BookmarkIcon, ToDownIcon } from '@assets/icons/stroke';
import { UserIcon } from '@assets/icons/fill';
import { Button, CheckBox } from '@features/ui';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
}

export function Header(props: IHeaderProps) {
  return (
    <header className='flex items-center px-8 py-2 bg-white dark:bg-opacity-5'>
      <div className="mr-auto">
        <img src={headerLogo} alt="" className='h-[26px]' />
      </div>
      <CheckBox
        onChange={(event) => document.body.classList.toggle('dark', event.currentTarget.checked)}
        className='mr-5'
        label='Dark mode' />
      <Link to="login" className='mx-2'>
        <Button variant='contur' size='small' color='gray'>
          Login
        </Button>
      </Link>
      <Button variant='contur' size='small' color='gray'>
        <BookmarkIcon className="text-2xl" />
      </Button>
      <Button variant='text' size='small' className='px-3 ml-4' rounded shadow color='gray'>
        <ToDownIcon className="text-base" />
        <div className="p-1 ml-2 text-white rounded-full bg-gray">
          <UserIcon />
        </div>
      </Button>
    </header>
  );
}
