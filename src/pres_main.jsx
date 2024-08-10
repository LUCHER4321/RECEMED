import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { prescription } from './assets/Prescription'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {await prescription(localStorage.getItem("first_name"), localStorage.getItem("last_name"), localStorage.getItem("token"))}
  </StrictMode>,
)
