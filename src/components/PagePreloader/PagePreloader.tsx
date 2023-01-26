import { DotsPreloader } from '@components/DotsPreloader/DotsPreloader';
import * as React from 'react';

interface IPagePreloaderProps { }

export function PagePreloader(props: IPagePreloaderProps) {
  return (
    <DotsPreloader />
  );
}
