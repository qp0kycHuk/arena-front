import { toast } from '@/lib/Toast'
import { IArticle } from '@/models/Article'
import { getRoute } from '@/utils'
import { articlesApi } from './articles.api'
import { useNavigate } from 'react-router-dom'
import { useToggle } from '@/hooks/useToggle'
import { useAppDispatch, useAppSelector } from '..'
import { useEffect, useState } from 'react'
import { fetchAll } from './articles.thunk'

export function useArticleRemove(article: IArticle) {
  const [loading, , loadingStart, loadingEnd] = useToggle()
  const navigate = useNavigate()

  async function remove() {
    loadingStart()
    const id = toast.loading('Удаление')
    await articlesApi.remove(article.id)
    toast.update(id, { render: 'Статья удалена', type: 'warning', isLoading: false, autoClose: 2000 })
    loadingEnd()
    navigate(getRoute().projects(article.folders[0]?.id || ''))
  }

  return {
    loading,
    remove,
  }
}

export const useArticles = () => useAppSelector((state) => state.articles)

// TODO handling errors

export function useFetchArticles() {
  const [loading, , start, end] = useToggle()
  const data = useArticles()
  const d = useAppDispatch()

  const load = async () => {
    start()
    await d(fetchAll())
    end()
  }

  useEffect(() => {
    load()
  }, [])

  return {
    loading,
    data,
  }
}
