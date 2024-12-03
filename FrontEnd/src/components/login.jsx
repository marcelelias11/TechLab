import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Login() {
  const navigate = useNavigate();

  function loginCheck() {
    if (document.getElementById("user").value === "") {
      alert("Favor inserir usuário");
    }
    else if (document.getElementById("pass").value === "") {
      alert("Favor inserir senha");
    } else {
      return navigate("/select")
    }
  }
  
  return (
    <>
      <div>
      </div>
      <h1>Login</h1>
      <form>
        <label>Usuário:</label>
        <input id="user">
        </input>
        <br /><br />
        <label>Senha:</label>
        <input id="pass" type="password" name="password">
        </input>
        <br /><br />
      </form>
      <button onClick={loginCheck}>
          Continuar
        </button>
    </>
  )
}

export default Login