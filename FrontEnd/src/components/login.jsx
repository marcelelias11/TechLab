import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Login() {
  const navigate = useNavigate();
  
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
      <h1>Login</h1>
      <form>
        <label>Usuário:</label>
        <input id="user">
        </input>
        <br /><br />
        <label>Senha:</label>
        <input id="user" type="password" name="password">
        </input>
        <br /><br />
      </form>
      <button onClick={() => navigate("/select")}>
          Continuar
        </button>
    </>
  )
}

export default Login