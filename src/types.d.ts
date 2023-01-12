
type ExtentionType = 'image' | 'doc' | 'video'

interface IExtention {
    type: ExtentionType
    accept: string
    regex: RegExp
}

