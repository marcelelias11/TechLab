import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css'

function Load() {
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
  }
  function prepare() {   
    console.log(selectedId)
    if (selectedId === "") {
      alert("No data found for the selected option.");
    } else {
      console.log(selectedId)
      sessionStorage.setItem("calc", selectedId.dados);
      navigate("/calcresult");
    }
  }

  return (
    <>
      <div>
      </div>
      <h1>Calculator</h1>
      <div className="card">
        <form>
        <label>Selecione os dados salvos:</label>
        <select name="options" id="options">
          <option>--Selecionar--</option>
        {options.map((option, index) => (
              <option onClick={() => handleOptionClick(option)} id={index} key={index} value={option}>
                {option.idpesquisa}
              </option>
            ))}
        </select>
        <button onClick={prepare}>
          Selecionar
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

export default Load