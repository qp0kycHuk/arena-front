import React from 'react';
import { Menu as MenuCover, MenuProps } from '@szhsin/react-menu';

export { MenuItem } from '@szhsin/react-menu';

export function Menu(props: MenuProps) {
  return <MenuCover transition offsetY={8} {...props} />

}

interface IMenuTargetProps extends React.PropsWithChildren { }

function MenuTargetComponent(props: IMenuTargetProps, ref: React.ForwardedRef<HTMLDivElement>) {
  return <div ref={ref} {...props} />
}

export const MenuTarget = React.forwardRef(MenuTargetComponent)