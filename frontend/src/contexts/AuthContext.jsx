import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiClient } from "../api/client";
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('AUTH_USER');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('AUTH_USER', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('AUTH_USER');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loginReponse = await apiClient.post('/users/login', { email, password });
      localStorage.setItem('AUTH_TOKEN', loginReponse.data.accessToken);
      const profileResponse = await apiClient.get('/users/me', {
        headers: {
          Authorization: `Bearer ${loginReponse.data.accessToken}`
        }
      });
      setCurrentUser(profileResponse.data);
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
    localStorage.removeItem('AUTH_TOKEN');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};