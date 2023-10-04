import * as React from 'react'
import { useMemo } from 'react'
import { Uploader } from '@features/fileUploader'
import { getFilePreview, getRandomUUID } from '@utils/index'
import { useArticleEditMainContext } from './ArticleEdit.Context'

export function ArticleEditAnons() {
  const { article, update } = useArticleEditMainContext()

  const fileItems = useMemo(() => {
    if (article?.image_src) {
      return [
        {
          id: article?.id || getRandomUUID(),
          src: article?.image_src,
          // title: article?.image,
        },
      ]
    }

    return []
  }, [article])

  async function changeHandler(items: IFileItem[]) {
    const file = items[0]?.file

    if (!file) {
      return
    }

    const dataUrl = await getFilePreview(file)

    update({
      imageFile: file,
      image_src: dataUrl || '',
      image_delete: false,
    })
  }

  async function removeImage() {
    update({
      imageFile: undefined,
      image_src: undefined,
      image_delete: true,
    })
  }

  return (
    <Uploader multiple={false} fileItems={fileItems} onChange={changeHandler} onRemove={removeImage}>
      <div className="font-semibold">Анонсовое изображение</div>
    </Uploader>
  )
}
