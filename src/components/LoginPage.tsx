import React from 'react';
import LoginForm from './LoginForm';
import '../styles/LoginPageStyle.css';

interface LoginPageProps {
  setActivePage: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setActivePage }) => {
  return (
    <div className="login-page">
      <div className="decor"></div>
      <h1>MyWork</h1>
      <LoginForm setActivePage={setActivePage} />
      <div className="login-footer">
        <p>
          Don't have an account? <a href="#" onClick={() => setActivePage('register')}>Sign up</a>
          <br />
          <a href="#" onClick={(e) => {e.preventDefault(); setActivePage('forgot-password');}}>Forgot password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;