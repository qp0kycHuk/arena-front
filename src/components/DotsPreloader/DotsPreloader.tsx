import * as React from 'react'
import c from './DotsPreloader.module.scss'

export interface IDotsPreloaderProps {
  className?: string
}

export function DotsPreloader({ className }: IDotsPreloaderProps) {
  return (
    <div className={'flex flex-grow py-10 ' + className}>
      <div className="flex gap-2 mx-auto" style={{ '--n': 5 } as React.CSSProperties}>
        <div className={'bg-primary text-l1 ' + c.dot} style={{ '--i': 1 } as React.CSSProperties}></div>
        <div className={'bg-primary text-l1 ' + c.dot} style={{ '--i': 2 } as React.CSSProperties}></div>
        <div className={'bg-primary text-l1 ' + c.dot} style={{ '--i': 3 } as React.CSSProperties}></div>
        <div className={'bg-primary text-l1 ' + c.dot} style={{ '--i': 4 } as React.CSSProperties}></div>
        <div className={'bg-primary text-l1 ' + c.dot} style={{ '--i': 5 } as React.CSSProperties}></div>
      </div>
    </div>
  )
}
