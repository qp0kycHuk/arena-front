import { Header } from '@layouts/Header';
import { Sidebar } from '@layouts/Sidebar';
import * as React from 'react';

export interface IProjectsProps {
}

export function Projects(props: IProjectsProps) {
  return (
    <div>
      <Header />

      <div className="p-8">
        <Sidebar />
      </div>
    </div>
  );
}
