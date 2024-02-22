import React from 'react'

interface IPageContentProps extends React.PropsWithChildren {
  className?: string
}

export function PageContent({ children, className }: IPageContentProps) {
  return <div className={'relative flex-grow sm:bg-l3 sm:rounded-2xl ' + className}>{children}</div>
}
