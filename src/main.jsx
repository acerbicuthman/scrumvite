import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./Pages/Learner/ScrollToTop";
import { ClipLoader } from "react-spinners";

function Root() {
  const [isLoading, setIsLoading] = useState(true); // 🛠 Fixed: useState capital "S"

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); // 🛠 Fixed: timeout name
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        {isLoading ? (
          <div className="spinner-container">
            <ClipLoader size={50} color="#36d7b7" loading={isLoading} />
          </div>
        ) : (
          <App />
        )}
      </BrowserRouter>
    </StrictMode>
  );
}

// ✅ Still rendering Root here, like you originally wanted
createRoot(document.getElementById("root")).render(<Root />);
