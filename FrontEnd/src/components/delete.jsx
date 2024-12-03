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

  let selectedId = ""
  function handleOptionClick(option) {
    selectedId = option;
    console.log(selectedId)
    console.log(selectedId.idpesquisa)
  }

  function prepare() {
    console.log(String(selectedId.idpesquisa))   
    fetch("http://localhost:8080/delete", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pesquisa: String(selectedId.idpesquisa),
        }),
      })
      .then(async function (response) {
        if (response.status === 200) {
          const text = await response.text(); // Await the text only if status is 201
          alert("Documento deletado com sucesso!")
        } else {
          alert(`Documento não encontrado!`); // Throw an error for non-201 status codes
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.error(error);
        confirm("Failed to proceed: " + error.message);
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
        <option>--Selecionar--</option>
        {options.map((option, index) => (
              <option onClick={() => handleOptionClick(option)} id={index} key={index} value={option}>
                {option.idpesquisa}
              </option>
            ))}
        </select>
        <button onClick={() => prepare()}>
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