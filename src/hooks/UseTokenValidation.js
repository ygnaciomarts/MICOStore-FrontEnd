import { useEffect, useContext, useRef } from "react";
import { authFetch } from "../util/authFetch";
import { AuthContext } from "../AuthContext";

const UseTokenValidation = () => {
  const { logout } = useContext(AuthContext);
  const logoutRef = useRef(logout);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const PING_ENDPOINT = `${API_BASE_URL}/auth/ping`;

  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await authFetch(PING_ENDPOINT);
        console.log("Token is valid.");
      } catch (err) {
        console.log("Token expired or invalid:", err);
        logoutRef.current();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [PING_ENDPOINT]);
};

export default UseTokenValidation;