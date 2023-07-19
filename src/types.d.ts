type ExtentionType = 'image' | 'doc' | 'video'

interface IExtention {
  type: ExtentionType
  accept: string
  regex: RegExp
}

interface IServerError {
  message: string
}

declare module '*.png'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.jpg'

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

interface IListResponse<T> {
  items: T[]
}

interface IItemResponse<T> {
  item: T
}

interface IResultWithError {
  error: FetchBaseQueryError | SerializedError
}

interface IResultWithData<T> {
  data: T
}

interface TypedFormData<T> extends FormData {
  append(name: T | '_method', value: string | Blob, fileName?: string): void
  delete(name: T): void
  get(name: T): FormDataEntryValue | null
  getAll(name: T): FormDataEntryValue[]
  has(name: T): boolean
  set(name: T, value: string | Blob, fileName?: string): void
}

type UploadImagesFunc = (files: File[], beforeUpdate?: (files: IFile[] | undefined) => any) => Promise<IFile[] | undefined>

interface IFileItem {
  id?: string | number
  key?: string
  src?: string
  preview?: string
  name?: string
  file?: File
  extention?: IExtention
}

interface IErrorData {
  message: string
  errors: Record<string, string[]>
}
