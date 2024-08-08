// src/components/LoginForm.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import { loginWithEmailPassword } from '../authService';

import lockIcon from '../images/key.svg';
import defaultLockIcon from '../images/default-key.svg';
import emailIcon from '../images/default-message-green.svg';
import defaultEmailIcon from '../images/def-message.svg';

interface LoginFormProps {
  setActivePage: (page: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginWithEmailPassword(formData.email, formData.password);
      setError(''); 
      setActivePage('News'); 
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>Welcome back!</h2>
      <h3>Sign in to your account</h3>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          iconSrc={emailIcon}
          defaultIconSrc={defaultEmailIcon}
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          iconSrc={lockIcon}
          defaultIconSrc={defaultLockIcon}
        />
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default LoginForm;