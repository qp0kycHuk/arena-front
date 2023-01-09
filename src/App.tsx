import React from 'react';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'
import { Login, Projects } from './pages';
import { Edit } from '@pages/Edit';


import './App.scss';

const fullConfig = resolveConfig(tailwindConfig)
console.log(fullConfig);


function App() {
  return (
    <div className='flex-grow flex flex-col dark:bg-black'>
      <Edit />
    </div>
  );
}

export default App;
