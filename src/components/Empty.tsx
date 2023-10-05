interface IEmptyProps {
  title?: string | null
  className?: string
}

export function Empty({ title = 'Здесь ничего нет', className }: IEmptyProps) {
  return (
    <div className={className}>
      <div className="ratio ratio-1/1 w-96 max-w-full relative mx-auto mt-10">
        <img src="/img/travolta.gif" alt="" className="absolute left-0 top-0 w-full h-full object-contain" />
      </div>

      {title ? <div className="mt-10 font-semibold text-center">{title}</div> : null}
    </div>
  )
}
