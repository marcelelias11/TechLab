import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function WellSim() {
  //LEMBRE DA REGRESSÃO
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
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
        <br /><br />
      </div>
    </>
  )
}

export default WellSim