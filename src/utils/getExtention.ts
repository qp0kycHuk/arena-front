import * as extentions from '@const/extentions'

export function getExtention(file: File): IExtention | undefined {
    for (let i = 0; i < Object.values(extentions).length; i++) {
        const extention = Object.values(extentions)[i];
        if (file.type.match(extention.regex)) {
            return extention
        }
    }

    return undefined
}