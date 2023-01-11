import React from 'react';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'
import { PageContainer } from '@layouts/PageContainer';
import { Login, Projects } from './pages';
import { Edit } from '@pages/Edit';


import './App.scss';

const fullConfig = resolveConfig(tailwindConfig)
console.log(fullConfig);


function App() {
  return (
    <div className='flex-grow flex flex-col dark:bg-black text-black dark:text-white'>
      <PageContainer>
        <Edit />
      </PageContainer>
    </div>
  );
}

export default App;
