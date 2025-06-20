import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiClient } from "../api/client";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from "use-local-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('AUTH_TOKEN', '');
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setCurrentUser(response.data))
      .catch(() => setCurrentUser(null));
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loginReponse = await apiClient.post('/users/login', { email, password });
      setToken(loginReponse.data.accessToken);
      toast.success('Logged in successfully');
      navigate(searchParams.get('returnUrl') || '/account');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await apiClient.post('/users/register', { name, email, password });
      toast.success('Account created successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken('');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const value = {
    token,
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};