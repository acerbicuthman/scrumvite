import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./Pages/Learner/ScrollToTop";
import { RingLoader } from "react-spinners";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";

function Root() {
  const [isLoading, setIsLoading] = useState(true); 
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log("Google Client ID:", CLIENT_ID);


  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); 
  }, []);

  return (
    <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <ScrollToTop />
        {isLoading ? (
          <div className="spinner-container">
            <RingLoader size={150} color="#575D97" loading={isLoading} />
          </div>
        ) : (
          <App />
        )}
      </BrowserRouter>
    </GoogleOAuthProvider>
    </StrictMode>
  );
}


createRoot(document.getElementById("root")).render(<Root />);
