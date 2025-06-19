import { useState } from 'react';
import './App.css';

import BarLeft from './components/dashboard/BarLeft';
import Dashboard from './components/dashboard/Dashboard';
import BoardHeader from './components/dashboard/mainBoard/BoardHeader';

function App() {
  return (
    <>  
      <BarLeft></BarLeft>
      <div className="flex overflow-y-auto flex-col w-full shadow-[-8px_8px_18px_0_rgba(0,0,0,0.2)] bg-white dark:bg-gray-900 rounded-4xl my-1 mr-1 ">
        <BoardHeader />
      </div>
    </>
  );
}

export default App
