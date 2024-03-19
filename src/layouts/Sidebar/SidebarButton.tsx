import React from 'react'
import { Button } from '@features/ui'
import { NavLink } from 'react-router-dom'

interface ISidebarButtonProps extends Omit<React.ComponentProps<typeof Button>, 'icon'> {
  title: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  link?: string
  className?: string
  active?: boolean
}

export function SidebarButton({ link, icon: Icon, title, children, className, active, ...props }: ISidebarButtonProps) {
  if (link) {
    return (
      <NavLink to={link}>
        {({ isActive }) => (
          <Button className={'w-full text-left ' + className} variant="text" size="sm" {...props}>
            <Icon className={`mr-2 text-lg ${isActive || active ? 'text-primary' : 'text-default/60 '}`} />
            <div className={`mr-auto ${isActive || active ? '' : 'font-normal'} text-default truncate`}>{title}</div>

            {children}
          </Button>
        )}
      </NavLink>
    )
  }

  return (
    <Button className={'w-full text-left ' + className} variant="text" size="sm" {...props}>
      <Icon className="mr-2 text-lg text-default/60" />
      <div className="mr-auto font-normal text-default truncate">{title}</div>

      {children}
    </Button>
  )
}
