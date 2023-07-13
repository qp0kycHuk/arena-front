import React from 'react'

interface IPageContentProps extends React.PropsWithChildren {
  className?: string
}

export function PageContent({ children, className }: IPageContentProps) {
  return <div className={'relative flex-grow bg-white rounded-2xl dark:bg-opacity-5 dark:text-white ' + className}>{children}</div>
}
