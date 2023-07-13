import React from 'react'
import { BriefcaseIcon, CrownIcon, DocumentIcon, FoldersIcon, HandbooksIcon, ToTopIcon, UsersIcon } from '@assets/icons/stroke'
import { Tag } from '@components/Tag'
import { Button } from '@features/ui'
import { Link, NavLink } from 'react-router-dom'
import { getRoute } from '@utils/index'
import { SidebarButton } from './SidebarButton'

export function Sidebar() {
  return (
    <div className="flex flex-col min-w-[266px] w-[266px] px-4 pt-6 pb-4 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white sticky top-16">
      <div className="space-y-1">
        <SidebarButton title="Главная" icon={CrownIcon} link="/" />
        <SidebarButton title="Пользователи" icon={UsersIcon} link={getRoute().users()} />
        <SidebarButton title="Статьи" icon={DocumentIcon} link={getRoute().projects()} />
        <SidebarButton title="Справочник" icon={HandbooksIcon} link="handbooks" />
        <SidebarButton title="База знаний" icon={BriefcaseIcon}>
          <ToTopIcon className="ml-auto text-base text-gray dark:text-white" />
        </SidebarButton>
        <SidebarButton title="Проекты" icon={FoldersIcon} className="pl-8" />
        <SidebarButton title="Дизайн" icon={FoldersIcon} className="pl-8" />
        <SidebarButton title="Проекты за 2022" icon={FoldersIcon} className="pl-8" />
      </div>
      <div className="mt-3 mb-5 border-t border-gray border-opacity-20"></div>

      <div className="flex flex-wrap gap-2">
        <Tag>#Figma</Tag>
        <Tag>#Анимация</Tag>
        <Tag>#Фронт</Tag>
        <Tag>#ДирижерСада</Tag>
        <Tag>#Бэк</Tag>
        <Tag>#Дизайн</Tag>
        <Tag>#Команда</Tag>
      </div>
      <Button variant="text" size="small" className="justify-start w-auto mt-5 -ml-2 -mr-2">
        Показать всё
      </Button>
    </div>
  )
}
