import { useCallback, useMemo } from 'react'
import { Editor, EditorControl, useEditor, useInitialContent } from '@features/editor'
import { docExtention, imageExtention } from '@utils/const/extentions'
import { filterFiles, getRandomUUID } from '@utils/index'
import type { EditorEvents, Editor as EditorType } from '@tiptap/react'
import React from 'react'
import { useArticleEditMainContext } from './ArticleEdit.Context'
import { IOptions } from '@features/editor/hooks/useEditor'
import { getFileItems } from '@utils/helpers/files'
import { useDebouncedCallback } from 'use-debounce'
import { ILink } from '@models/Link'

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
      onLink: linkAddHandler,
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

      // file items to editor images format
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

  const insertDocuments = useCallback(
    async (files: File[]) => {
      const images = filterFiles(files, [docExtention.regex])
      const pastedFileItems = await getFileItems(images)

      // file items to editor images format
      const insertDocuments = pastedFileItems.map((item) => ({
        type: 'fileBlock',
        attrs: {
          name: item.name,
          id: item.id,
        },
      }))

      editor
        ?.chain()
        .focus()
        .insertContent(insertDocuments || [])
        .run()

      update({
        files: [...(article?.files || []), ...pastedFileItems],
      })
    },
    [editor, article]
  )

  function filePasteHandler(event: React.ClipboardEvent) {
    const files = Array.from(event.clipboardData.files)

    const images = filterFiles(files, [imageExtention.regex])
    const documents = filterFiles(files, [docExtention.regex])

    insertDocuments(documents)
    insertImages(images)
  }

  function linkAddHandler(link: Partial<ILink>) {
    update((prev) => {
      const newLinks: Partial<ILink>[] = (prev?.links || []).filter((link) => link.name || link.url)

      if (!newLinks.find((item) => item.url?.trim() === link.url?.trim())) {
        newLinks.push({
          key: getRandomUUID(),
          ...link,
        })
      }

      return {
        ...prev,
        links: newLinks,
      }
    })
  }

  return (
    <div>
      <EditorControl onLink={linkAddHandler} onImageAdd={insertImages} editor={editor} className="sticky z-10 -ml-4 -mr-4 top-16" />
      <Editor onLink={linkAddHandler} onPaste={filePasteHandler} editor={editor} className="min-h-[260px] flex flex-col" />
    </div>
  )
}
