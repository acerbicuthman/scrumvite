import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, useNavigate} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import {ClerkProvider, RedirectToSignIn} from '@clerk/clerk-react'



// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// const navigate = useNavigate()
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }

// function ClerkWithRouter() {
  // const navigate = useNavigate()
  // return(
    // <ClerkProvider
    // publishableKey={PUBLISHABLE_KEY}
    //     navigate={navigate}
    //     afterSignOutUrl="/landing"
    //     >
      // <App />
    // </ClerkProvider>
//   )
// }


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     {/* <GoogleOAuthProvider> */}
     {/* <ClerkWithRouter/> */}
     <App/>
     {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/landing' > */}

    {/* </ClerkProvider> */}
    {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </StrictMode>,
)