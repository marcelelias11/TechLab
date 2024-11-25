import { useState,useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function WellResult(){
    const [options, setOptions] = useState([]);
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
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Resultado:</h1>
      <div className="card">       
        <img src={`data:image/jpeg;base64,${options}`} />
      </div>
    </>
    )
}