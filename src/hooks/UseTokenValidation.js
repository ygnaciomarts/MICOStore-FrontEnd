import { useEffect, useContext, useRef } from "react";
import { authFetch } from "../util/authFetch";
import { AuthContext } from "../AuthContext";

const UseTokenValidation = () => {
  const { logout } = useContext(AuthContext);
  const logoutRef = useRef(logout);

  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await authFetch("https://mico-api.ygnaciomarts.com/auth/ping");
      } catch (err) {
        console.log("Token expired or invalid:", err);
        logoutRef.current(); // usa referencia estable
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default UseTokenValidation;