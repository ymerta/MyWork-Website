import React, { useState, ChangeEvent, FormEvent } from 'react';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import ProfilePictureInput from './ProfilePictureInput';
import { registerWithEmailPassword } from '../authService';

import userIcon from '../images/user.svg';
import defaultUserIcon from '../images/def-user.svg';
import emailIcon from '../images/default-message-green.svg';
import defaultEmailIcon from '../images/def-message.svg';
import lockIcon from '../images/key.svg';
import defaultLockIcon from '../images/default-key.svg';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture:string;
}

interface RegistrationFormProps {
  setActivePage: (page: string) => void;
  setUserData: (userData: { name: string; email: string; phone: string; password: string, profilePicture: string }) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ setActivePage, setUserData }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture:''
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (file: File | null) => {
    setProfilePicture(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await registerWithEmailPassword(formData.email, formData.password, formData.name, profilePicture);

      setUserData({
        name: formData.name,
        email: formData.email,
        phone: '', 
        password: formData.password,
        profilePicture: formData.profilePicture
      });

      setError('');
      setActivePage('News'); 
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-form">
      <h2>Create a MyWork Account</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your Name and Surname"
          iconSrc={userIcon}
          defaultIconSrc={defaultUserIcon}
        />
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your mail"
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
        <InputField
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          iconSrc={lockIcon}
          defaultIconSrc={defaultLockIcon}
        />

       
        <ProfilePictureInput onFileChange={handleProfilePictureChange} />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
