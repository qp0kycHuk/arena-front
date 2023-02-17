import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from '@lib/Toast';
import { MainLayout } from '@layouts/MainLayout';
import { ArticleEditPage, ArticleViewPage, ArticleListPage, Home, Login, Registration, UserViewPage, UserEditPage } from "@pages/index";
import { AuthLayout } from '@layouts/AuthLayout';
import { getRoute } from './utils';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path={getRoute().articles()} element={<ArticleListPage />} />
            <Route path={getRoute().articles(':id')} element={<ArticleViewPage />} />
            <Route path={getRoute().articles.edit(':id')} element={<ArticleEditPage />} />
            <Route path={getRoute().articles.create()} element={<ArticleEditPage />} />

            <Route path={getRoute().users(':id')} element={<UserViewPage />} />
            <Route path={getRoute().users.edit(':id')} element={<UserEditPage />} />
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
