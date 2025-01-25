import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg'
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <div>
        
      </div>
      <img className='logo' src={logo}/>
      <h1>Home</h1>
      <div className="card">
        <button onClick={() => navigate("/login")}>
          Realizar login
        </button>
        <button onClick={() => navigate("/cadastro")}>
          Criar conta
        </button>
      </div>
    </>
  )
}

export default Home