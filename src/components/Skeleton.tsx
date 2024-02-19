import { twMerge } from 'tailwind-merge'

interface ISkeletonProps {
  className?: string
}

export function Skeleton({ className }: ISkeletonProps) {
  return <div className={twMerge('animate-pulse bg-default/30', className)}></div>
}
