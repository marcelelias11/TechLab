import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Calc() {
  const [bound, setBound] = useState()
  const navigate = useNavigate();
  function convertData(){
    let dataarr = document.getElementById("data").value.split(",");
    let dataarrreturn = [];
    for (let i in dataarr) {
      dataarrreturn.push(Number(dataarr[i]));
    }
    return [dataarrreturn]
  }
  function convertData2(){
    let dataarr = document.getElementById("data2").value.split(",");
    let dataarrreturn = [];
    for (let i in dataarr) {
      dataarrreturn.push(Number(dataarr[i]));
    }
    return dataarrreturn
  }
  function setterBound() {
    let boundsetter = document.getElementById("bound").value.split(",")
    let boundarr = []
    for (let i in boundsetter) {
      boundarr.push(Number(boundsetter[i]));
    }
    return boundarr
  }  

  function prepare() {
    const calcobj = {
      "data": convertData(),
      "y": convertData2(),
      "unb": [Number(document.getElementById("unb").value)],
      "eq": document.getElementById("eq").value,
      "lb": Number(setterBound()[0]),
      "ub": Number(setterBound()[setterBound().length - 1])
    }
    if (document.getElementById("data").value === "") {
      alert("Favor inserir dados");
    }
    else if (document.getElementById("unb").value === "") {
      alert("Favor inserir incerteza");
    } else if (document.getElementById("eq").value === "") {
      alert("Favor inserir equação");
    } else if (document.getElementById("bound").value === "") {
      alert("Favor inserir limites");
    } else if (calcobj.lb >= calcobj.ub) {
      alert("O limite inferior não pode ser maior que o limite superior");
      return
    } else {
      console.log(calcobj)
      sessionStorage.setItem("calc", JSON.stringify(calcobj));
      return navigate("/calcresult")
    }
  }

  return (
    <>
      <div>
      </div>
      <h1>Calculator</h1>
      <form>
        <label>Insira os dados do eixo x com uma vírgula entre eles (Ex.: 5,5.1,5.5,5.3,4.9):</label>
        <input id="data">
        </input>
        <label>Insira os dados do eixo f(x) com uma vírgula entre eles (Ex.: 5,5.1,5.5,5.3,4.9):</label>
        <input id="data2">
        </input>
        <br /><br />
        <label>Insira a incerteza instrumental:</label>
        <input id="unb">
        </input>
        <label>Insira a equação a ser utilizada em função apenas de x (Utilize / para divisão, * para multiplicação e ** para exponenciação.
          Utilize parênteses para evitar ambiguidades.):</label>
        <input id="eq">
        </input>
        <label>Insira os limites superiores e inferiores com uma vírgula entre eles (Ex.: -10,10):</label>
        <input id="bound">
        </input>
        <button onClick={prepare}>
          Enviar
        </button>
        <button onClick={() => navigate("/precalc")}>
          Voltar
        </button>
        <button onClick={() => navigate("/select")}>
          Menu Principal
        </button>
        <br /><br />
      </form>
    </>
  )
}

export default Calc