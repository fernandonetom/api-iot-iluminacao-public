import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import "./assets/theme/global.scss";
import AuthProvider from "./Context/AuthContext";
import ToastContainer from "./components/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "react-router-dom";
import history from "./history";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router history={history}>
        <Routes />
        <ToastContainer />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
