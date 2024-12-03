import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
import './App.css'

function Cadastro() {
  const navigate = useNavigate();

  function loginCheck() {
    if (document.getElementById("user").value === "") {
      alert("Favor inserir usuário");
    }
    else if (document.getElementById("pass").value === "") {
      alert("Favor inserir senha");
    } else if (document.getElementById("confirm").value === "") {
      alert("Favor confirmar senha");
    } else if (document.getElementById("confirm").value != document.getElementById("pass").value) {
      alert("A confirmação não bate com a senha");
    } else {
      fetch("http://localhost:8080/cadastro", {
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
          alert(`Cadastro já realizado!`); // Throw an error for non-201 status codes
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
      <h1>Cadastro</h1>
      <form>
        <label>Usuário:</label>
        <input id="user">
        </input>
        <br /><br />
        <label>Senha:</label>
        <input id="pass" type="password" name="password">
        </input>
        <label>Confirmar Senha:</label>
        <input id="confirm" type="password" name="password">
        </input>
        <br /><br />
      </form>
      <button onClick={loginCheck}>
          Continuar
        </button>
    </>
  )
}

export default Cadastro