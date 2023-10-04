import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from '@lib/Toast'
import { MainLayout } from '@layouts/MainLayout'
import { Home, Login, Registration, HandbooksEditPage, NotFoundPage } from '@pages/index'
import { AuthLayout } from '@layouts/AuthLayout'
import { getRoute } from './utils'
import { useToggleTheme } from '@store/theme/theme.hooks'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ArticleEditPage, ArticleViewPage } from '@views/articles/pages'
import { UserEditPage, UserListPage, UserViewPage } from '@views/users/pages'
import { Projects } from '@views/projects/pages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { theme, toggle: toggleTheme } = useToggleTheme()

  useEffect(() => {
    toggleTheme(theme)
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="*" element={<NotFoundPage />} />
              <Route index element={<Home />} />
              <Route path={getRoute().projects()} element={<Projects />} />
              <Route path={getRoute().projects(':folderId')} element={<Projects />} />
              <Route path={getRoute().projects(':folderId/article/create')} element={<ArticleEditPage />} />

              <Route path={getRoute().articles(':id')} element={<ArticleViewPage />} />
              <Route path={getRoute().articles.edit(':id')} element={<ArticleEditPage />} />
              <Route path={getRoute().articles.create()} element={<ArticleEditPage />} />

              <Route path={getRoute().users()} element={<UserListPage />} />
              <Route path={getRoute().users(':id')} element={<UserViewPage />} />
              <Route path={getRoute().users.edit(':id')} element={<UserEditPage />} />

              <Route path="handbooks" element={<HandbooksEditPage />}></Route>
            </Route>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login/" element={<Login />} />
              <Route path="registration/" element={<Registration />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
      <ToastContainer />
    </>
  )
}

export default App
