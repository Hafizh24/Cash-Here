/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/auth';
import axios from 'axios';
import apiClient from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  // check if user is already logged in
  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.get('auth/get-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('accessToken');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);

    const { token, userData } = response.data.data;

    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(token);
    setUser(userData);

    return response;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
