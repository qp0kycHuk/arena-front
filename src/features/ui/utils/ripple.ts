import React from 'react'

interface ITouch {
  identifier: number
  target: HTMLElement
  screenX: number
  screenY: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
}

interface IRippleEvent extends React.PointerEvent<HTMLElement> {
  touches?: ITouch[]
}

export function ripplePointerdownHandler(event: IRippleEvent) {
  const target = event.currentTarget
  if (getComputedStyle(target).position === 'static') target.style.position = 'relative'

  const rect = target.getBoundingClientRect()
  const rippleWraps = target.querySelectorAll('.ripple-wrap')
  let rippleWrap
  let ripple = target.querySelector<HTMLElement>('.ripple')

  for (const i in rippleWraps) {
    if (!Object.hasOwnProperty.call(rippleWraps, i)) continue
    if (rippleWraps[i].parentElement === target) rippleWrap = rippleWraps[i]
  }

  if (!rippleWrap) {
    rippleWrap = document.createElement('span')
    rippleWrap.className = 'ripple-wrap'
    target.appendChild(rippleWrap)
  }

  ripple = document.createElement('span')
  ripple.className = 'ripple'
  ripple.style.height = ripple.style.width = 2 * Math.max(rect.width, rect.height, 48) + 'px'
  rippleWrap.appendChild(ripple)

  let pageX = 0
  let pageY = 0

  if (event.pageY && event.pageX) {
    pageX = event.pageX
    pageY = event.pageY
  }

  if (event.touches) {
    for (let i = 0; i < event.touches.length; i++) {
      if (!Object.hasOwnProperty.call(event.touches, i)) continue

      if (target.contains(event.touches[i].target) || target === event.touches[i].target) {
        pageX = event.touches[i].pageX
        pageY = event.touches[i].pageY
        break
      }
    }
  }

  const top = pageY - rect.top - ripple.offsetHeight / 2 - window.pageYOffset
  const left = pageX - rect.left - ripple.offsetWidth / 2 - window.pageXOffset
  ripple.style.top = top + 'px'
  ripple.style.left = left + 'px'
  ripple.classList.add('show')

  let isAnimEnd = false
  ripple.addEventListener('animationend', () => (isAnimEnd = true), { once: true })

  target.style.userSelect = 'none'
  let isRemoved = false

  const leaveHandler = () => {
    target.style.userSelect = ''

    const remove = () => {
      isRemoved = true
      ripple?.classList.add('removed')
      setTimeout(() => ripple?.parentElement?.removeChild(ripple), 1000)
    }

    if (isRemoved) return
    if (isAnimEnd) ripple?.classList.add('removed')
    if (isAnimEnd) remove()
    else ripple?.addEventListener('animationend', remove, { once: true })
  }

  document.addEventListener('pointerleave', leaveHandler, { once: true })
  document.addEventListener('pointerup', leaveHandler, { once: true })
  document.addEventListener('dragend', leaveHandler, { once: true })
  document.addEventListener('pointermove', leaveHandler, { once: true })
}
