import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { testRUT } from './assets/TestRUT';
import { page } from './assets/Page';

function App() {
  const [RUT, setRUT] = useState('');
  const [pass, setPass] = useState('');
  const [currentPage, setCurrentPage] = useState('RUTPage');
  const nextButton = () => {
      const valid = testRUT(RUT);
      if (valid) {
          setCurrentPage('passPage');
      } else {
          alert("RUT inválido");
      }
  };
  const RUTPage = page("Ingresa tu RUT", RUT, setRUT, "Siguiente", nextButton); // RUT = 11111111-1
  const passPage = page("Ingresa tu contraseña", pass, setPass, "Ingresar"); // PASS = 11223344
  return (
      <div className="flex flex-col items-center">
          {currentPage === 'RUTPage' && RUTPage}
          {currentPage === 'passPage' && passPage}
      </div>
  );
}

export default App
