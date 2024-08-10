import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { testRUT } from './assets/TestRUT';
import { page } from './assets/Page';
import { requestData } from './assets/RequestData';
import { prescription } from './assets/Prescription';

function App() {
  const [RUT, setRUT] = useState('');
  const [pass, setPass] = useState('');
  const [currentPage, setCurrentPage] = useState('RUTPage');
  const [jsonResponse, setJsonResponse] = useState('');
  const [firstProfile, setFirstProfile] = useState(null);
  const nextButton = () => {
      const valid = testRUT(RUT);
      if (valid) {
          setCurrentPage('passPage');
      } else {
          alert("RUT inválido");
      }
  };
  const login = async () => {
    const response = await requestData(RUT, pass);
    if(response.error){
      setJsonResponse(`Error: ${response.error}`);
    }
    else{
      setCurrentPage('');
      const profile = response.data.profiles[0];
      const token = response.data.token;
      setJsonResponse(token);
      setFirstProfile(prescription(profile, token));
    }
  };
  const RUTPage = page("Ingresa tu RUT", RUT, setRUT, "Siguiente", nextButton); // RUT = 11111111-1
  const passPage = page("Ingresa tu contraseña", pass, setPass, "Ingresar", login); // PASS = 11223344
  return (
      <div className="flex flex-col items-center relative">
          {currentPage === 'RUTPage' && RUTPage}
          {currentPage === 'passPage' && passPage}
          <p>{jsonResponse}</p>
      </div>
  );
}

export default App
