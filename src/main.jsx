import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SubmissionsProvider } from "./context/SubmissionsContext";
import { RegistrationsProvider } from "./context/RegistrationsContext";
import "./assets/styles/variables.css";
import "./index.css";
import "./assets/styles/global.css";
import "./assets/styles/layout.css";
import "./assets/styles/components.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RegistrationsProvider>
        <SubmissionsProvider>
          <App />
        </SubmissionsProvider>
      </RegistrationsProvider>
    </AuthProvider>
  </BrowserRouter>
);