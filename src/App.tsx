// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './tailwind.config.js'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from '@lib/Toast';


// const fullConfig = resolveConfig(tailwindConfig)

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={'There nothing ('} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
