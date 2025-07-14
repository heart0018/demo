import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const GoogleOAuthWrapper = ({ children }) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!clientId || clientId === "demo" || clientId === "demo_client_id") {
    console.log("Running in demo mode without Google OAuth");
    return children;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthWrapper>
  </StrictMode>
);
