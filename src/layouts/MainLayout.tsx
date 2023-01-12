import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

interface IMainLayoutProps extends React.PropsWithChildren {
}

export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <div>
      <Header />
      <div className="p-8 flex gap-8 items-start">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
