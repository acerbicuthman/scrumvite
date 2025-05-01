// src/pages/OAuthSuccess.js
import { useEffect } from "react";

const OAuthSuccess = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token && window.opener) {
      window.opener.postMessage(
        {
          type: "google-auth-success",
          token,
        },
        window.location.origin // secure: only send to same origin
      );
      window.close();
    }
  }, []);

  return <p className="text-center mt-10">Logging you in...</p>;
};

export default OAuthSuccess;
