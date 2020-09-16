import React, { createContext } from "react";
import useAuth from "./hooks/useAuth";
export const Context = createContext();

export default function AuthProvider({ children }) {
  const {
    authenticated,
    userData,
    authLoading,
    handleLogin,
    handleLogout,
    redirectIfLogged,
    responseObserver,
  } = useAuth();
  return (
    <Context.Provider
      value={{
        authenticated,
        userData,
        authLoading,
        handleLogin,
        handleLogout,
        redirectIfLogged,
        responseObserver,
      }}
    >
      {children}
    </Context.Provider>
  );
}
