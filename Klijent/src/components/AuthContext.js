import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const isUserAdmin = () => {
  const { userRole } = useAuth();
  return userRole === 'admin';
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setAuthState({
        isAuthenticated: true,
        userRole: decoded.role 
      });
    }
  }, []);

  const updateAuthStatus = (status, token = null) => {
    if (status && token) {
      const decoded = jwtDecode(token);
      setAuthState({
        isAuthenticated: status,
        userRole: decoded.role
      });
    } else {
      setAuthState({
        isAuthenticated: status,
        userRole: null
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
