import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home'
import Login from './components/login';
import Select from './components/select';
import Calc from './components/calc';
import CalcResult from './components/calcresult';
import Sim from './components/sim';
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/select" element={<Select/>}/>
          <Route path="/calculator" element={<Calc/>}/>
          <Route path="/calcresult" element={<CalcResult/>}/>
          <Route path="/simulator" element={<Sim/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
