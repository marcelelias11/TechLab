import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function WellSim() {
  
  const navigate = useNavigate();

  function prepare() {
    const wellobj = {
    "sim": "prob_well",
    "args": {
      "energy": Number(document.getElementById("nrg").value)}
    }
    console.log(wellobj)
    sessionStorage.setItem("well", JSON.stringify(wellobj));
    return navigate("/wellresult")
  }

  return (
    <>
      <div>
      </div>
      <h1>Calculator</h1>
      <div className="card">
        <label>Insira o nível de energia:</label>
        <input id="nrg">
        </input>
        <br /><br />
        <button onClick={prepare}>
          Enviar
        </button>
        <button onClick={() => navigate("/simulator")}>
          Voltar
        </button>
        <br /><br />
        <button onClick={() => navigate("/select")}>
          Menu Principal
        </button>
      </div>
    </>
  )
}

export default WellSim