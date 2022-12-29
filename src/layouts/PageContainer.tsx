import * as React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface IPageContainerProps extends React.PropsWithChildren {
}

export function PageContainer({ children }: IPageContainerProps) {
  return (
    <div>
      <Header />

      <div className="p-8 flex gap-8 items-start">
        <Sidebar />

        {children}

      </div>
    </div>
  );
}
