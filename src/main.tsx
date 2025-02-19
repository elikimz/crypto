import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import CryptoList from './components/crypto.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
    <CryptoList/>
  </StrictMode>,
)
