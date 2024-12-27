import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserRole } from "../api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("token") !== null;
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  const login = async (token, username) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    try {
      const roleData = await getUserRole(username);
      localStorage.setItem("userRole", roleData.roleDescription);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
