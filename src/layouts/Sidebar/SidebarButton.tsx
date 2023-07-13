import React from 'react'
import { Button } from '@features/ui'
import { NavLink } from 'react-router-dom'

interface ISidebarButtonProps extends React.PropsWithChildren {
  title: string
  icon: React.FC<React.HTMLProps<HTMLDivElement>>
  link?: string
  className?: string
}

export function SidebarButton({ link, icon: Icon, title, children, className }: ISidebarButtonProps) {
  if (link) {
    return (
      <NavLink to={link}>
        {({ isActive }) => (
          <Button className={'w-full ' + className} variant="text" size="small">
            <Icon className={`mr-2 text-lg ${isActive ? 'text-primary' : 'text-gray dark:text-white'}`} />
            <div className={`mr-auto ${isActive ? '' : 'font-normal'} text-black dark:text-white`}>{title}</div>

            {children}
          </Button>
        )}
      </NavLink>
    )
  }

  return (
    <Button className={'w-full ' + className} variant="text" size="small">
      <Icon className="mr-2 text-lg text-gray dark:text-white" />
      <div className="mr-auto font-normal text-black dark:text-white">{title}</div>

      {children}
    </Button>
  )
}
