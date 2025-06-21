import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/logIn/LogIn";
import Dashboard from "./components/dashboard/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <div className='w-full'>
            <LogIn />
          </div>
          } />
        <Route path='/dashboard' element={
          <div className='bg-[radial-gradient(ellipse_at_bottom_right,_#2fba87_65%,_#00fa9f_100%)] flex w-full'>
            <Dashboard />
          </div>
        } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
