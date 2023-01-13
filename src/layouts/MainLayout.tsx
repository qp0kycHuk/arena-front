import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

interface IMainLayoutProps extends React.PropsWithChildren {
}

export function MainLayout({ children }: IMainLayoutProps) {


  // return (<Redirect />)

  return (
    <div className='flex-grow '>
      <Header />
      <div className="p-8 flex gap-8 items-start">
        <Sidebar />
        <Suspense fallback='Loading..'>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
