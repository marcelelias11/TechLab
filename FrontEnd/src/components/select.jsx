import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Select() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Selector</h1>
      <div className="card">
      <button onClick={() => navigate("/calculator")}>
          Calculadora Estatística
        </button>
        <button onClick={() => navigate("/simulator")}>
          Simulador
        </button>
        <button onClick={() => alert("Em desenvolvimento!")}>
          Gerenciar Seus Dados
        </button>
      </div>
    </>
  )
}

export default Select