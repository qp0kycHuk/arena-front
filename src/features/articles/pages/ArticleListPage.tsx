import * as React from 'react';
import { ArticleList as ListComponent } from '@features/articles'

interface IArticleListPageProps {
}

export function ArticleListPage (props: IArticleListPageProps) {
  return (
    <div className="relative flex-grow p-8 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white" >
      <ListComponent />
    </div>
  );
}
