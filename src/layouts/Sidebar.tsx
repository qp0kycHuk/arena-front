import * as React from 'react';
import { BriefcaseIcon, CrownIcon, DocumentIcon, FoldersIcon, ToTopIcon, UsersIcon } from '@assets/icons/stroke';
import { Tag } from '@components/Tag';
import { Button } from '@features/ui';
import { Link } from 'react-router-dom';
import { getRoute } from '@utils/index';

interface ISidebarProps {
}

export function Sidebar(props: ISidebarProps) {
  return (
    <div className='flex flex-col min-w-[266px] w-[266px] px-4 pt-6 pb-4 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white sticky top-16'>
      <div className="space-y-1">
        <Link to="/">
          <Button className='w-full' variant='text' size='small'>
            <CrownIcon className='mr-2 text-lg text-primary dark:text-white' />
            <div className="mr-auto text-black dark:text-white">Главная</div>
          </Button>
        </Link>
        <Button className='w-full' variant='text' size='small'>
          <UsersIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto font-normal text-black dark:text-white">Пользователи</div>
        </Button>
        <Link to={getRoute().articles()}>
          <Button className='w-full' variant='text' size='small'>
            <DocumentIcon className='mr-2 text-lg text-gray dark:text-white' />
            <div className="mr-auto font-normal text-black dark:text-white">Статьи</div>
          </Button>
        </Link>
        <Button className='w-full' variant='text' size='small'>
          <BriefcaseIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto font-normal text-black dark:text-white">База знаний</div>
          <ToTopIcon className='ml-auto text-base text-gray dark:text-white' />
        </Button>
        <Link to="/projects">
          <Button className='w-full px-8' variant='text' size='small'>
            <FoldersIcon className='mr-2 text-lg text-gray dark:text-white' />
            <div className="mr-auto font-normal text-black dark:text-white">Проекты</div>
          </Button>
        </Link>
        <Button className='w-full px-8' variant='text' size='small'>
          <FoldersIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto font-normal text-black dark:text-white">Дизайн</div>
        </Button>
        <Button className='w-full px-8' variant='text' size='small'>
          <FoldersIcon className='mr-2 text-lg text-gray dark:text-white' />
          <div className="mr-auto font-normal text-black dark:text-white">Проекты за 2022</div>
        </Button>
      </div>
      <div className='mt-3 mb-5 border-t border-gray border-opacity-20'></div>

      <div className="flex flex-wrap gap-2">
        <Tag>#Figma</Tag>
        <Tag>#Анимация</Tag>
        <Tag>#Фронт</Tag>
        <Tag>#ДирижерСада</Tag>
        <Tag>#Бэк</Tag>
        <Tag>#Дизайн</Tag>
        <Tag>#Команда</Tag>
      </div>
      <Button variant='text' size='small' className='justify-start w-auto mt-5 -ml-2 -mr-2'>Показать всё</Button>
    </div>
  );
}
