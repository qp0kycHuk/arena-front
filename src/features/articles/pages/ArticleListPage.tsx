import * as React from 'react';
import { ArticleList as ListComponent } from '@features/articles'
import { PageContent } from '@layouts/PageContent';
import { useDocumentTitle } from '@hooks/useDocumentTitle';

interface IArticleListPageProps {
}

export function ArticleListPage(props: IArticleListPageProps) {
  useDocumentTitle('Статьи')
  
  return (
    <PageContent className='p-8'>
      <ListComponent />
    </PageContent>
  );
}
