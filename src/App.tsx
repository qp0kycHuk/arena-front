// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './tailwind.config.js'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';

// const fullConfig = resolveConfig(tailwindConfig)

function App() {
  return (
    <RouterProvider router={router} fallbackElement={'There nothing ('} />
  );
}

export default App;
