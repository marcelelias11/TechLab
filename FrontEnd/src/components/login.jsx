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
      fetch("http://localhost:8080/login", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: document.getElementById("user").value,
          senha: document.getElementById("pass").value,
        }),
      })
      .then(async function (response) {
        if (response.status === 201) {
          const text = await response.text(); // Await the text only if status is 201
          sessionStorage.setItem("id", document.getElementById("user").value);
          navigate("/select");
        } else {
          alert(`Login ou senha inválidos!`); // Throw an error for non-201 status codes
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to proceed: " + error.message);
      });
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