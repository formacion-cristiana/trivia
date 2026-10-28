// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/App.css";
import "./index.css";


const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("p");

if (redirectPath && redirectPath.startsWith("/")) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.history.replaceState(null, "", base + redirectPath);
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
