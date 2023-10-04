/* eslint-disable @typescript-eslint/naming-convention */
import { Extension } from '@tiptap/core'
import type { Editor } from '@tiptap/react'
import { Plugin, PluginKey } from 'prosemirror-state'
import { filterFiles } from '@utils/index'
import { imageExtention, docExtention } from '@utils/const/extentions'

export interface FilePasteOptions {
  render?: () => {
    onPaste?: (files: File[], editor: Editor, slice: any, view: any) => void
    onDrop?: (files: File[], editor: Editor, slice: any, view: any) => void
  }
}

export async function filePasteHandler(files: File[], editor: Editor) {
  const images = filterFiles(files, [imageExtention.regex])
  const documents = filterFiles(files, [docExtention.regex])

  const insertImages = await pasteImageHandler(images)
  const insertDocs = pasteDocHandler(documents)

  editor
    .chain()
    .focus()
    .insertContent([...insertImages, ...insertDocs])
    .run()
}

async function pasteImageHandler(files: File[]): Promise<any[]> {
  const promise = Promise.all(
    files.map(
      (file) =>
        new Promise<string | ArrayBuffer | null>((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function () {
            resolve(reader.result)
          }
        })
    )
  )

  return promise.then((result) => {
    return result.map((src) => ({
      type: 'image',
      attrs: {
        src: src,
      },
    }))
  })
}

function pasteDocHandler(files: File[]): any[] {
  return files.map((file) => ({
    type: 'fileBlock',
    attrs: {
      name: file.name,
    },
  }))
}

interface IFilePastePluginProps {
  upload: UploadImagesFunc
}

export const FilePasteExtention = Extension.create({
  name: 'FilePasteExtention',
  addProseMirrorPlugins() {
    return [FilePastePlugin({ upload: this.options.uploadFunction })]
  },
})

export const FilePastePlugin = ({ upload }: IFilePastePluginProps) => {
  return new Plugin({
    key: new PluginKey('pasteHandler'),
    props: {
      handlePaste(view, event, slice) {
        const hasFiles = event.clipboardData?.files?.length

        if (!hasFiles) {
          return false
        }

        event.preventDefault()

        const files = Array.from(event.clipboardData.files)

        console.log(files)

        const coordinates = view.posAtCoords(view.coordsAtPos(view.state.selection.from))

        if (!coordinates || !upload) {
          return
        }

        upload(files, (nodes) => {
          nodes?.forEach((item) => {
            const { schema } = view.state
            const node = schema.nodes.image.create(item)
            const transaction = view.state.tr.insert(coordinates.pos, node)
            view.dispatch(transaction)
          })
        })

        return true
      },

      handleDrop(view, event: DragEvent, slice) {
        // todo
      },
    },
  })
}
