/* eslint-disable @typescript-eslint/naming-convention */
import { Extension } from '@tiptap/core';
import { Editor } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';

export interface ImagePasteOptions {
  fileMatchRegex: RegExp;
  disableImagePaste: boolean;
  render?: () => {
    onImagePaste?: (files: File[], editor: Editor) => void;
    onImageDrop?: (files: File[], editor: Editor) => void;
    onDisabledImagePaste?: (text: string) => void;
  };
}

const mapDataItems = (data: DataTransferItemList, fileMatchRegex: RegExp): File[] => {
  const arr: File[] = [];

  Array.from(data)
    .map(item => (item.type.match(fileMatchRegex) ? item.getAsFile() : null))
    .forEach((item) => {
      if (item !== null) {
        arr.push(item)
      }
    })

  return arr
};

const mapTextItems = async (data: DataTransferItemList): Promise<string> => {
  const fullSet = Array.from(data);
  const plainText = fullSet.find(item => item.type === 'text/plain');
  const richText = fullSet.find(item => item.type === 'text/html');
  return new Promise(resolve => {
    (richText || plainText)?.getAsString(html => {
      const value = html.replace(/<img[^>]*>/g, '');
      resolve(value);
    });
  });
};

export function pasteImageHandler(files: File[], editor: Editor) {
  const promise = Promise.all(files.map((file) => new Promise<string | ArrayBuffer | null>((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result)
    };
  })))

  promise.then((result) => {
    editor.chain().focus()
      .insertContent(result.map((src) => ({
        type: 'image',
        attrs: {
          src: src,
        },
      })))
      .run()
  })
}

export const ImagePaste = Extension.create<ImagePasteOptions>({
  name: 'imagePaste',

  defaultOptions: {
    fileMatchRegex: /^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i,
    disableImagePaste: false,
  },

  addProseMirrorPlugins() {
    const options = this.options;
    const renderer = this.options.render?.();
    const editor = this.editor as Editor;


    return [
      new Plugin({
        key: new PluginKey('imagePasteHandler'),
        props: {
          handlePaste(view, event, slice) {
            if (options.disableImagePaste && event.clipboardData?.items) {
              mapTextItems(event.clipboardData.items).then(value => {
                if (value && renderer?.onDisabledImagePaste) {
                  renderer.onDisabledImagePaste(value);
                }
              });

              return true;
            }

            if (!options.disableImagePaste && renderer?.onImagePaste && event.clipboardData?.items?.length) {
              const files = mapDataItems(event.clipboardData.items, options.fileMatchRegex);

              if (files.length) {
                renderer.onImagePaste(files, editor);

                return true;
              }
            }
            return false;
          },

          handleDrop(view, event: DragEvent) {
            if (!options.disableImagePaste && event.dataTransfer?.files?.length && renderer?.onImageDrop) {
              const files = mapDataItems(event.dataTransfer.items, options.fileMatchRegex);

              if (files.length) {
                renderer.onImageDrop(files, editor);

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
