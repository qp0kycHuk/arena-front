import { BriefcaseIcon, CrownIcon, UsersIcon } from '@assets/icons/stroke';
import { Tag } from '@components/Tag';
import { Button } from '@features/ui';
import * as React from 'react';

export interface ISidebarProps {
}

export function Sidebar(props: ISidebarProps) {
  return (
    <div className='px-4 py-6 rounded-2xl bg-white dark:bg-opacity-5 dark:text-white w-[266px] '>
      <div className="space-y-1">
        <Button className='w-full' variant='simple'>
          <CrownIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto text-black dark:text-white font-normal">Главная</div>
        </Button>
        <Button className='w-full' variant='simple'>
          <UsersIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto text-black dark:text-white font-normal">Пользователи</div>
        </Button>
        <Button className='w-full' variant='simple'>
          <BriefcaseIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto text-black dark:text-white font-normal">База знаний</div>
        </Button>
      </div>
      <div className='border-t border-gray border-opacity-20 mb-5 mt-1'></div>

      <div className="flex flex-wrap gap-2">
        <Tag>#Figma</Tag>
        <Tag>#Анимация</Tag>
        <Tag>#Фронт</Tag>
        <Tag>#ДирижерСада</Tag>
        <Tag>#Бэк</Tag>
        <Tag>#Дизайн</Tag>
        <Tag>#Команда</Tag>
      </div>
    </div>
  );
}
