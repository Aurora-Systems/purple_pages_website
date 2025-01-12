import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import Lander from './pages/lander.tsx'
import Success from './pages/success.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KindeProvider
      clientId='287042c325ca4276a067b63f768bc2fe'
      domain='https://purplepages.kinde.com'
      logoutUri='https://purplepageszim.com'
      redirectUri='https://purplepageszim.com/success'
    >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lander/>}/>
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </BrowserRouter>
    </KindeProvider>
  </StrictMode>,
)
