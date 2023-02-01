import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from '@lib/Toast';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement='There nothing' />
      <ToastContainer />
    </Provider>
  );
}

export default App;
