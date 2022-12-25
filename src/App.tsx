import React from 'react';
import { Button } from './components/ui/Button';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

import './assets/ui/index.scss';
import './App.scss';

const fullConfig = resolveConfig(tailwindConfig)

console.log(fullConfig);


function App() {
  return (
    <div className="App p-5">
      <Button onClick={() => { console.log('click') }}>Button</Button>
    </div>
  );
}

export default App;
