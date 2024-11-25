import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function WaveSim() {
  //LEMBRE DA REGRESSÃO
  const navigate = useNavigate();
  function convertData(data){
    let dataarr = data.split(",");
    let dataarrreturn = [];
    for (let i in dataarr) {
      dataarrreturn.push(Number(dataarr[i]));
    }
    return dataarrreturn
  }
  function waveOption(wave){
    switch(wave) {
        case "Senóide":
            return 1
        case "Triangular":
            return 2
        case "Quadrada":
            return 3
        case "Dente-de-Serra":
            return 4
        default:
            alert("Opção Inválida!")
            return
    }
  } 

  function prepare() {
    const waveobj = {
    "sim": "waves",
    "args": {
      "option": waveOption(document.getElementById("onda").value),
      "harmonics": convertData(document.getElementById("harm").value)}
    }
    console.log(waveobj)
    sessionStorage.setItem("wave", JSON.stringify(waveobj));
    return navigate("/waveresult")
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
        <label>Selecione o tipo de onda:</label>
        <select name="onda" id="onda">
          <option>Senóide</option>
          <option>Triangular</option>
          <option>Quadrada</option>
          <option>Dente-de-Serra</option>
        </select>
        <br /><br />
        <label>Insira o valor dos harmônicos com uma vírgula entre eles (Ex.: 2,3,4).</label>
        <input id="harm">
        </input>
        <button onClick={prepare}>
          Enviar
        </button>
        <br /><br />
      </div>
    </>
  )
}

export default WaveSim