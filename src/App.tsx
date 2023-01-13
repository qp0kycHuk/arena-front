// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './tailwind.config.js'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';
import { Provider } from 'react-redux';
import { store } from './store';

// const fullConfig = resolveConfig(tailwindConfig)

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={'There nothing ('} />
    </Provider>
  );
}

export default App;
