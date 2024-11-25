import { useState,useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Calc() {
  const [bound, setBound] = useState()
  //LEMBRE DA REGRESSÃO
  const navigate = useNavigate();
  function convertData(){
    let dataarr = document.getElementById("data").value.split(",");
    let dataarrreturn = [];
    for (let i in dataarr) {
      dataarrreturn.push(Number(dataarr[i]));
    }
    return [dataarrreturn]
  }  

  function prepare() {
    let boundsetter = document.getElementById("bound").value.split(",")
    setBound(boundsetter)
    console.log(bound)
    const calcobj = {
      "data": convertData(),
      "unb": [Number(document.getElementById("unb").value)],
      "eq": document.getElementById("eq").value,
      "lb": Number(bound[0]),
      "ub": Number(bound[bound.length - 1])
    }
    console.log(calcobj)
    sessionStorage.setItem("calc", JSON.stringify(calcobj));
    return navigate("/calcresult")
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
        <label>Insira os dados com uma vírgula entre eles (Ex.: 5,5.1,5.5,5.3,4.9):</label>
        <input id="data">
        </input>
        <br /><br />
        <label>Insira a incerteza instrumental:</label>
        <input id="unb">
        </input>
        <label>Insira a equação a ser utilizada (Utilize / para divisão, * para multiplicação e ** para exponenciação.
          Utilize parênteses para evitar ambiguidades.):</label>
        <input id="eq">
        </input>
        <label>Insira os limites superiores e inferiores com uma vírgula entre eles (Ex.: -10,10):</label>
        <input id="bound">
        </input>
        <button onClick={prepare}>
          Enviar
        </button>
        <br /><br />
      </div>
    </>
  )
}

export default Calc