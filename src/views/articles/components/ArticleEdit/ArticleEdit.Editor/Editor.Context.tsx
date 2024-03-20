import { createContext, useCallback, useContext, useMemo } from 'react'
import { useArticleEditMainContext } from '../ArticleEdit.Context'
import { useInitialContent } from '@/features/editor'
import { useDebouncedCallback } from 'use-debounce'
import { IOptions, useEditor } from '@/features/editor/hooks/useEditor'
import { Editor, EditorEvents } from '@tiptap/react'
import { ILink } from '@/models/Link'
import { filterFiles, getRandomUUID } from '@/utils'
import { docExtention, imageExtention } from '@/utils/const/extentions'
import { toast } from '@/lib/Toast'
import { getFileItems } from '@/utils/helpers/files'

const Context = createContext<Value>({} as Value)

export const useArticleEditor = () => useContext(Context)

export function EdditorContextProvider({ children }: Props) {
  const { article, update } = useArticleEditMainContext()
  const initialEditorContent = useInitialContent(article?.content, [article?.content])

  const updateHandler = (event: EditorEvents['update']) => {
    update({
      contentJson: JSON.stringify(event.editor.getJSON()),
    })
  }

  const debouncedUpdateHandler = useDebouncedCallback(updateHandler, 800)

  const options: IOptions = useMemo(() => {
    return {
      placeholder: 'Напишите статью...',
      onLink: insertLink,
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
      if (files.length === 0) return

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

  function insertLink(link: Partial<ILink>) {
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
    <Context.Provider
      value={{
        editor,
        insertDocuments,
        insertImages,
        insertLink,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type Props = React.PropsWithChildren
type Value = {
  editor: Editor | null
  insertDocuments: (files: File[]) => Promise<void>
  insertImages: (files: File[]) => Promise<void>
  insertLink: (link: Partial<ILink>) => void
}
