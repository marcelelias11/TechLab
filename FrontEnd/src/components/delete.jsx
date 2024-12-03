import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css'

function Delete() {
  const [options, setOptions] = useState([])
  const navigate = useNavigate();

useEffect(() => {
  fetch("http://localhost:8080/load", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sessionStorage.getItem("id"),
    }),
  })
  .then(async function (response) {
    return await response.json();
  })
  .then(async function (text) {
    console.log(text);
    setOptions(text)
  })
  .catch((error) => {
    console.error(error);
    alert(error);
  }); 
}, [])    

  function prepare() {   
    fetch("http://localhost:8080/delete", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pesquisa: document.getElementById("options").value,
        }),
      })
      .then(async function (response) {
        if (response.status === 201) {
          const text = await response.text(); // Await the text only if status is 201
          alert("Documento deletado com sucesso!")
        } else {
          alert(`Documento não encontrado!`); // Throw an error for non-201 status codes
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to proceed: " + error.message);
      });
  }

  return (
    <>
      <div>
      </div>
      <h1>Calculator</h1>
      <div className="card">
        <form>
        <label>Selecione os dados para deletar:</label>
        <select name="options" id="options">
        {options.map((option, index) => (
              <option id={index} key={index} value={option}>
                {option.idpesquisa}
              </option>
            ))}
        </select>
        <button onClick={prepare}>
          Deletar
        </button>
        <button onClick={() => navigate("/precalc")}>
          Voltar
        </button>
        <button onClick={() => navigate("/select")}>
          Menu Principal
        </button>
        </form>
        <br /><br />
      </div>
    </>
  )
}

export default Delete