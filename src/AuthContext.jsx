// src/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const clearSessionExpired = () => setSessionExpired(false);

  useEffect(() => {
    console.log("AuthContext useEffect triggered. Token:", token); 

    const checkToken = () => {
      if (!token) {
        console.log("AuthContext: No token disponible");
        setUser(null);
        setSessionExpired(false);
        setLoading(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        console.log("AuthContext: token exp:", payload.exp, "now:", now);

        if (payload.exp < now) {
          console.log("AuthContext: Token expirado");
          setSessionExpired(true);
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        } else {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log("AuthContext: Usuario cargado:", JSON.parse(storedUser));
          }
          setSessionExpired(false);
        }
      } catch (error) {
        console.error("AuthContext: Error validando token", error);
        setUser(null);
        setToken(null);
        setSessionExpired(false);
      } finally {
        setLoading(false);
        console.log("AuthContext: loading terminado");
      }
    };

    checkToken();

    const intervalId = setInterval(() => {
      console.log("AuthContext: chequeando expiración del token...");
      checkToken();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setSessionExpired(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        sessionExpired,
        setSessionExpired,
        clearSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };