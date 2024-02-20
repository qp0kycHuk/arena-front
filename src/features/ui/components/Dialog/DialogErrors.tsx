interface IDialogErrorsProps {
  errors: string[]
}

export function DialogErrors({ errors }: IDialogErrorsProps) {
  if (errors.length <= 0) {
    return null
  }

  return (
    <div className="bg-red bg-opacity-10 text-red p-4 w-full mb-4">
      {errors.map((text) => (
        <div key={text}>{text}</div>
      ))}
    </div>
  )
}
