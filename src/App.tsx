import React, { FormEvent } from 'react';
import { Button, Input } from './features/ui';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

import './assets/ui/index.scss';
import './App.scss';

const fullConfig = resolveConfig(tailwindConfig)

console.log(fullConfig);


function App() {
  return (
    <div className="App p-5">
      <Button className='mb-2'>Button</Button>
      <Input name='test' onInput={(e: FormEvent<HTMLInputElement>) => {console.log(e.currentTarget.value)}} />
    </div>
  );
}

export default App;
