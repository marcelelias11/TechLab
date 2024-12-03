import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Sim() {
  const navigate = useNavigate();
  return (
    <>
      <div>
      </div>
      <h1>Simulator</h1>
      <div className="card">
        <button onClick={() => navigate("/wavesim")}>
          Simulador de Ondas
        </button>
        <button onClick={() => navigate("/wellsim")}>
          Simulador de Poço de Probabilidade
        </button>
        <button onClick={() => navigate("/select")}>
          Voltar
        </button>
      </div>
    </>
  )
}

export default Sim