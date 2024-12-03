import { useState,useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

export default function WellResult(){
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();
    console.log(sessionStorage.getItem("well"))
    useEffect(() => {
        fetch("http://localhost:8080/sim", {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: sessionStorage.getItem("well"),
          })
      .then(async function (response) {
        return await response.json();
      })
      .then(async function (text) {
        console.log(text)
        console.log(text.plot.graph)
        setOptions(text.plot.graph)
      })
      .catch((error) => {
        console.error(error);
      });
     }, [])
     console.log(options)
    return(
        <>
      <div>
      </div>
      <h1>Resultado:</h1>
      <div className="simgraph">       
        <img src={`data:image/jpeg;base64,${options}`} />
      </div>
      <button onClick={() => navigate("/wellsim")}>
          Voltar
        </button>
        <button onClick={() => navigate("/select")}>
          Menu Principal
        </button>
    </>
    )
}