import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header/Header';
import { Suspense } from 'react';
import { PrivateOutlet } from './PrivateOutlet';

interface IMainLayoutProps extends React.PropsWithChildren {
}

export function MainLayout({ children }: IMainLayoutProps) {


  // return (<Redirect />)

  return (
    <div className='flex-grow '>
      <Header />
      <div className="flex items-start gap-8 p-8">
        <Sidebar />
        <Suspense fallback='Loading..'>
          <PrivateOutlet />
        </Suspense>
      </div>
    </div>
  );
}
