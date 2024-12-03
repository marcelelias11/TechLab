import { useNavigate } from 'react-router-dom';
import './App.css'

function WaveSim() {
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
    sessionStorage.setItem("calc", JSON.stringify(waveobj));
    return navigate("/waveresult")
  }

  return (
    <>
      <div>
      </div>
      <h1>Calculator</h1>
      <div className="card">
        <form>
        <label>Selecione os dados salvos:</label>
        <select name="onda" id="onda">
        </select>
        <button onClick={prepare}>
          Enviar
        </button>
        <button onClick={() => navigate("/precalc")}>
          Voltar
        </button>
        <button onClick={() => navigate("/select")}>
          Menu Principal
        </button>
        </form>
        <br /><br />
      </div>
    </>
  )
}

export default WaveSim