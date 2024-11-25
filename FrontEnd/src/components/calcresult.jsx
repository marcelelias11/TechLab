import { useState,useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

export default function CalcResult(){
    const [options, setOptions] = useState([]);
    console.log("Session Storage:" + sessionStorage.getItem("calc"))
    useEffect(() => {
        fetch("http://localhost:8080/stat", {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: sessionStorage.getItem("calc"),
          })
      .then(async function (response) {
        console.log("Initial Response: " + response)
        return await response.json();
      })
      .then(async function (text) {
        console.log("Response:" + text)
        console.log(text.stats.stats)
        setOptions(text.stats.stats[0])
      })
      .catch((error) => {
        console.error(error);
      });
     }, [])
     console.log(options)
    return(
        <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Resultados</h1>
      <p> Media: {JSON.stringify(options.avg)} <br /> Desvio Padrão: {JSON.stringify(options.std)} <br /> 
      Incerteza Experimental: {JSON.stringify(options.una)} <br /> Incerteza Instrumental: {JSON.stringify(options.unb)} <br /> 
      Incerteza Combinada: {JSON.stringify(options.unc)} <br />Incerteza Propagada: {JSON.stringify(options.unz)}</p>
      <div className="card">       
        <img src={`data:image/jpeg;base64,${options.graph}`} />
      </div>
    </>
    )
}