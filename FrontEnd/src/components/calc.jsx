import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Calc() {
  const [count, setCount] = useState(0)
  //LEMBRE DA REGRESSÃO
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
      <h1>Calculator</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Calculator goes here
        </p>
      </div>
      <p className="read-the-docs">
        This should be fun
      </p>
    </>
  )
}

export default Calc