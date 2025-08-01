

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/authApi';

export function useSignIn() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    let user = null;


    if (userStr && userStr !== 'undefined') {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        console.error('Failed ', e);
        user = null;
      }
    }

    if (token && user?.role === 'admin') {
      navigate('/home');
    }
  }, [navigate]);


  const validate = () => {
    if (!phone || !pin) {
      setError('Please enter both Phone number and PIN');
      return false;
    }
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };


    const handleLogin = async () => {
    if (!validate()) return false;

    setLoading(true);
    setError('');
    try {
      const data = await login(phone, pin);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
      return true;
    } catch (e) {
      setError('Login failed, try again');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    phone,
    setPhone,
    pin,
    setPin,
    error,
    loading,
    handleLogin,
  };
}