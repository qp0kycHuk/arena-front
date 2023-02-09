import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from '@lib/Toast';
import { MainLayout } from '@layouts/MainLayout';
import { ArticleEditPage, ArticleViewPage, ArticleListPage, Home, Login, Registration } from "@pages/index";
import { AuthLayout } from '@layouts/AuthLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='articles/' element={<ArticleListPage />} />
            <Route path='articles/:id' element={<ArticleViewPage />} />
            <Route path='articles/edit/:id' element={<ArticleEditPage />} />
            <Route path='articles/create/' element={<ArticleEditPage />} />
          </Route>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login/' element={<Login />} />
            <Route path='registration/' element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
