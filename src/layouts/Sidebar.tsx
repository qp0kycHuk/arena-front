import * as React from 'react';
import { BriefcaseIcon, CrownIcon, FoldersIcon, ToTopIcon, UsersIcon } from '@assets/icons/stroke';
import { Tag } from '@components/Tag';
import { Button } from '@features/ui';
import { Link } from 'react-router-dom';

interface ISidebarProps {
}

export function Sidebar(props: ISidebarProps) {
  return (
    <div className='px-4 pt-6 pb-4 rounded-2xl bg-white dark:bg-opacity-5 dark:text-white min-w-[266px] w-[266px] flex flex-col'>
      <div className="space-y-1">
        <Button className='w-full' variant='text' size='small'>
          <CrownIcon className='mr-2 text-lg text-primary dark:text-white' />
          <div className="mr-auto text-black dark:text-white">Главная</div>
        </Button>
        <Button className='w-full' variant='text' size='small'>
          <UsersIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto text-black dark:text-white font-normal">Пользователи</div>
        </Button>
        <Button className='w-full' variant='text' size='small'>
          <BriefcaseIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto text-black dark:text-white font-normal">База знаний</div>
          <ToTopIcon className='ml-auto text-base text-gray dark:text-white' />
        </Button>
        <Link to="/projects">
          <Button className='w-full px-8' variant='text' size='small'>
            <FoldersIcon className='mr-2 text-lg text-gray dark:text-white' />
            <div className="mr-auto text-black dark:text-white font-normal">Проекты</div>
          </Button>
        </Link>
        <Button className='w-full px-8' variant='text' size='small'>
          <FoldersIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto text-black dark:text-white font-normal">Дизайн</div>
        </Button>
        <Button className='w-full px-8' variant='text' size='small'>
          <FoldersIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto text-black dark:text-white font-normal">Проекты за 2022</div>
        </Button>
      </div>
      <div className='border-t border-gray border-opacity-20 mb-5 mt-3'></div>

      <div className="flex flex-wrap gap-2">
        <Tag>#Figma</Tag>
        <Tag>#Анимация</Tag>
        <Tag>#Фронт</Tag>
        <Tag>#ДирижерСада</Tag>
        <Tag>#Бэк</Tag>
        <Tag>#Дизайн</Tag>
        <Tag>#Команда</Tag>
      </div>
      <Button variant='text' size='small' className='mt-5 -ml-2 -mr-2 w-auto justify-start'>Показать всё</Button>
    </div>
  );
}
