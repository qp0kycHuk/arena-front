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
import { FileDrop } from 'react-file-drop'
import { PlusIcon } from '@/assets/icons/stroke'
import { toast } from '@lib/Toast'

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
      if (files.length === 0) return

      const images = filterFiles(files, [imageExtention.regex])
      const id = toast.loading('Загрузка изображения')
      const pastedFileItems = await getFileItems(images)
      toast.update(id, { render: 'Изображение загружено', type: 'success', isLoading: false, autoClose: 2000 })

      // file items to editor images format
      const insertedImages = pastedFileItems.map((item) => ({
        type: 'image',
        attrs: {
          src: item.src,
          id: item.id,
        },
      }))

      editor
        ?.chain()
        .focus()
        .insertContent(insertedImages || [])
        .run()

      update({
        files: [...(article?.files || []), ...pastedFileItems],
      })
    },
    [editor, article]
  )

  const insertDocuments = useCallback(
    async (files: File[]) => {
      const documents = filterFiles(files, [docExtention.regex])
      const id = toast.loading('Загрузка документа')
      const pastedFileItems = await getFileItems(documents)
      toast.update(id, { render: 'Документ загружен', type: 'success', isLoading: false, autoClose: 2000 })

      // file items to editor documents format
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
        docs: [...(article?.docs || []), ...pastedFileItems],
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

  function dropHandler(fileList: FileList | null) {
    if (!fileList) return

    const files = Array.from(fileList)

    const images = filterFiles(files, [imageExtention.regex])
    const documents = filterFiles(files, [docExtention.regex])

    insertDocuments(documents)
    insertImages(images)
  }

  return (
    <div className="relative">
      <EditorControl
        onLink={linkAddHandler}
        onImageAdd={insertImages}
        editor={editor}
        className="sticky z-10 -ml-4 -mr-4 top-16"
      />
      <div className="relative">
        <FileDrop
          className="absolute -inset-4"
          targetClassName="filedrop-target"
          draggingOverFrameClassName="over-frame"
          draggingOverTargetClassName="over-target"
          onDrop={dropHandler}
        >
          <PlusIcon className="m-auto text-4xl text-primary" />
        </FileDrop>
        <Editor
          onLink={linkAddHandler}
          onPaste={filePasteHandler}
          editor={editor}
          className="min-h-[260px] flex flex-col"
        />
      </div>
    </div>
  )
}
