/* eslint-disable @typescript-eslint/naming-convention */
import { Extension } from '@tiptap/core';
import { Editor } from '@tiptap/react';
import { filterFiles } from '@utils/filterFiles';
import { Plugin, PluginKey } from 'prosemirror-state';
import { imageExtention, docExtention } from 'src/const/extentions';

export interface FilePasteOptions {
  render?: () => {
    onPaste?: (files: File[], editor: Editor) => void;
    onDrop?: (files: File[], editor: Editor) => void;

  };
}

function dataToFilesArray(data: DataTransferItemList): File[] {
  const arr: File[] = [];

  Array.from(data)
    .map(item => item.getAsFile())
    .forEach((item) => {
      if (item !== null) {
        arr.push(item)
      }
    })

  return arr
}

export async function filePasteHandler(files: File[], editor: Editor) {
  const images = filterFiles(files, [imageExtention.regex])
  const documents = filterFiles(files, [docExtention.regex])

  const insertImages = await pasteImageHandler(images)
  const insertDocs = pasteDocHandler(documents)

  editor.chain().focus().insertContent([
    ...insertImages,
    ...insertDocs,
  ]).run()
}

async function pasteImageHandler(files: File[]): Promise<any[]> {
  const promise = Promise.all(files.map((file) => new Promise<string | ArrayBuffer | null>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result)
    };
  })))

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

export const FilePaste = Extension.create<FilePasteOptions>({
  name: 'filePaste',

  addProseMirrorPlugins() {
    const renderer = this.options.render?.();
    const editor = this.editor as Editor;

    return [
      new Plugin({
        key: new PluginKey('pasteHandler'),
        props: {
          handlePaste(view, event, slice) {
            if (renderer?.onPaste && event.clipboardData?.items?.length) {
              const files = dataToFilesArray(event.clipboardData.items);

              if (files.length) {
                renderer.onPaste(files, editor);

                return true;
              }
            }
            return false;
          },

          handleDrop(view, event: DragEvent) {
            if (event.dataTransfer?.files?.length && renderer?.onDrop) {
              const files = dataToFilesArray(event.dataTransfer.items);

              if (files.length) {
                renderer.onDrop(files, editor);

                return true;
              }
            }

            return false;
          },
        },
      }),
    ];
  },
});
