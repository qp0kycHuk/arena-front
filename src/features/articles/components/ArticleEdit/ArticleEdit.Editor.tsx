import { useCallback, useMemo } from 'react'
import { Editor, EditorControl, useEditor, useInitialContent } from '@features/editor'
import { imageExtention } from '@utils/const/extentions'
import { filterFiles } from '@utils/index'
import type { EditorEvents, Editor as EditorType } from '@tiptap/react'
import React from 'react'
import { useArticleEditMainContext } from './ArticleEdit.Context'
import { IOptions } from '@features/editor/hooks/useEditor'
import { getFileItems } from '@utils/helpers/files'
import { useDebouncedCallback } from 'use-debounce'

// TODO try remove duplicate with ArticleEditImages component

export type ArticleEditEditorRef = React.ForwardedRef<EditorType | null>

export function ArticleEditEditor() {
  const { article, update } = useArticleEditMainContext()
  const initialEditorContent = useInitialContent(article?.content, [article?.content])

  const updateHandler = useCallback(
    (event: EditorEvents['update']) => {
      update({
        contentJson: JSON.stringify(event.editor.getJSON()),
        excerpt: event.editor.getText(),
      })
    },
    [update]
  )

  const debouncedUpdateHandler = useDebouncedCallback(updateHandler, 800)

  const options: IOptions = useMemo(() => {
    return {
      placeholder: 'Напишите статью...',
      config: {
        content: initialEditorContent,
        onUpdate: debouncedUpdateHandler,
      },
    } as IOptions
  }, [initialEditorContent])

  const editor = useEditor(options)

  const insertImages = useCallback(
    async (files: File[]) => {
      const images = filterFiles(files, [imageExtention.regex])
      const pastedFileItems = await getFileItems(images)

      const insertImages = pastedFileItems.map((item) => ({
        type: 'image',
        attrs: {
          src: item.src,
          id: item.id,
        },
      }))

      editor
        ?.chain()
        .focus()
        .insertContent(insertImages || [])
        .run()

      update({
        files: [...(article?.files || []), ...pastedFileItems],
      })
    },
    [editor, article]
  )

  function filePasteHandler(event: React.ClipboardEvent) {
    const files = Array.from(event.clipboardData.files)

    insertImages(files)
  }

  function imageAddHandler(files: File[]) {
    insertImages(files)
  }

  return (
    <div>
      <EditorControl onImageAdd={imageAddHandler} editor={editor} className="sticky z-10 -ml-4 -mr-4 top-16" />
      <Editor onPaste={filePasteHandler} editor={editor} className="min-h-[260px] flex flex-col" />
    </div>
  )
}
