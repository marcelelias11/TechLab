import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const [count, setCount] = useState(0);
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
      <h1>Home</h1>
      <div className="card">
        <button onClick={() => navigate("/login")}>
          Realizar login
        </button>
        <p>
          Home goes here
        </p>
      </div>
    </>
  )
}

export default Home