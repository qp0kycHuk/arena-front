import * as React from 'react'
import c from './BarPreloader.module.scss'

export function BarPreloader() {
  return (
    <div className={c.wrapper}>
      <div className={c.bar + ' bg-primary'}>
        <div className={c.circle + ' bg-primary'}></div>
        <div className={c.text + ' text-l3'}>Loading</div>
      </div>
    </div>
  )
}
