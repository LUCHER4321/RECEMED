import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RutLogin from './assets/Login/RutLogin.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RutLogin />
  </StrictMode>,
)
