import { useState,useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function createOption() {
    
    return options
}

export default function SearchCampus(){
    const [options, setOptions] = useState([]);
    useEffect(() => {
        fetch("https://localhost:8080/stat", {
            method: "POST",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: sessionStorage.getItem("calc"),
          })
      .then(async function (response) {
        return await response.json();
      })
      .then(async function (text) {
        console.log(text)
        setOptions(text)
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
      <h1>Simulator</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Simulator goes here
        </p>
      </div>
      <p className="read-the-docs">
        This should be a nightmare
      </p>
    </>
    )
}