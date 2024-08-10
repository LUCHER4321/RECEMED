import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PassLogin from './assets/Login/PassLogin'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PassLogin />
  </StrictMode>,
)
