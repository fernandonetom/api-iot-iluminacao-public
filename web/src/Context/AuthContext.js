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
    updateUser,
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
        updateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}
