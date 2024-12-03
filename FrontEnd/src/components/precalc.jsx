import { useNavigate } from 'react-router-dom';
import './App.css'

function PreCalc() {
  const navigate = useNavigate();
  return (
    <>
      <div>
      </div>
      <h1>Calculadora</h1>
      <div className="card">
        <button onClick={() => navigate("/calculator")}>
          Novos Dados
        </button>
        <button onClick={() => navigate("/carregar")}>
          Carregar Dados
        </button>
        <button onClick={() => navigate("/select")}>
          Voltar
        </button>
      </div>
    </>
  )
}

export default PreCalc