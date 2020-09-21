import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import "./assets/theme/global.scss";
import AuthProvider from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "react-router-dom";
import history from "./history";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
    <ToastContainer
      closeButton={false}
      style={{
        fontSize: "0.95rem",
        fontWeight: "300",
        fontFamily: "Poppins",
        lineHeight: "1.5rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
