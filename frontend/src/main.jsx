import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home'
import Login from './components/pages/Login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
