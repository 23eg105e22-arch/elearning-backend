import { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = () => {
      // Temporarily disabled session persistence to force login
      // const session = loadFromStorage('edulearn_session', null);
      // if (session) {
      //   setUser(session);
      // }
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    saveToStorage('edulearn_session', userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edulearn_session');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};