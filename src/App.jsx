import { useState } from 'react';
import './App.css';

import BarLeft from './components/dashboard/BarLeft';
import Dashboard from './components/dashboard/Dashboard';
import MainBoard from './components/dashboard/mainBoard/MainBoard';

function App() {
  return (
    <>
      <BarLeft></BarLeft>
      <div className='flex flex-col w-full'>
        <MainBoard></MainBoard>
      </div>
    </>
  );
}

export default App
