import * as React from 'react';
import { PageContainer } from '@layouts/PageContainer';
import { SettingsIcon } from '@assets/icons/stroke';
import { Button } from '@features/ui';

export interface IProjectsProps {
}

export function Projects(props: IProjectsProps) {
  return (
    <PageContainer>
      <div className="rounded-2xl bg-white dark:bg-opacity-5 dark:text-white p-8 flex-grow relative">
        <div className="text-xs opacity-50 absolute left-8 top-6">База знаний / Проекты</div>
        <div className="flex items-center">
          <div className="text-2xl font-semibold">Проекты</div>
          <Button variant='contur' color='gray' className='ml-auto'>
            <SettingsIcon />
          </Button>
          <Button className='ml-4 px-7'>
            Добавить
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
