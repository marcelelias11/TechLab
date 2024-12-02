import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Data() {
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
      <button onClick={() => navigate("/data")}>
          Criar ou Gerenciar Equipe
        </button>
        <button onClick={() => navigate("/data")}>
          Ver seus dados salvos
        </button>
      </div>
    </>
  )
}

export default Data