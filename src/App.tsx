import React, { FormEvent } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'
import { Login, Projects } from './pages';


import './App.scss';

const fullConfig = resolveConfig(tailwindConfig)

function App() {
  return (
    <Projects />
  );
}

export default App;
