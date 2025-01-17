import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KindeProvider
      clientId='287042c325ca4276a067b63f768bc2fe'
      domain='https://purplepages.kinde.com'
      logoutUri='https://purplepageszim.com'
      redirectUri='https://purplepageszim.com/prepare'
    >
       {/* <KindeProvider
      clientId='287042c325ca4276a067b63f768bc2fe'
      domain='https://purplepages.kinde.com'
      logoutUri='http://localhost:5173'
      redirectUri='http://localhost:5173/prepare'
    > */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lander/>} />
        <Route path="/prepare" element={<Prepare/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/onboard">
          <Route path="user" element={<UserOnboarding/>}/>
          <Route path="business" element={<BusinessOnboarding/>}/>
        </Route>
        <Route path="/legal">
          <Route path="privacy-policy" element={<PrivacyPolicy/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </KindeProvider>
  </StrictMode>,
)
