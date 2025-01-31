import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "react-phone-input-2/lib/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css" 
import './index.css'
import Lander from './pages/lander.tsx'
import Success from './pages/success.tsx'
import Prepare from './pages/prepare.tsx'
import UserOnboarding from './pages/user_onboard.tsx'
import BusinessOnboarding from './pages/business_onboard.tsx'
import PrivacyPolicy from './pages/privacypolicy.tsx'
import Authenticate from './pages/authenticate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lander/>} />
        <Route path="/prepare" element={<Prepare/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/authenticate" element={<Authenticate/>} />
        <Route path="/onboard">
          <Route path="user" element={<UserOnboarding/>}/>
          <Route path="business" element={<BusinessOnboarding/>}/>
        </Route>
        <Route path="/legal">
          <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  
  </StrictMode>,
)
