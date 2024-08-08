import React from 'react';
import RegistrationForm from './RegistrationForm';
import '../styles/RegisterPageStyle.css';

interface RegisterPageProps {
  setActivePage: (page: string) => void;
  setUserData: (userData: { name: string; email: string; password: string, profilePicture:string }) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setActivePage, setUserData }) => {
  return (
    <div className="register-page">
      <div className="decor"></div>
      <h1>MyWork</h1>
      <RegistrationForm setActivePage={setActivePage} setUserData={setUserData} /> 
      <div className="register-footer">
        <p>
          Already have an account?{' '}
          <a href="#" onClick={() => setActivePage('login')}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
