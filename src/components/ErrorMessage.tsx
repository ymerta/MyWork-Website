import React from 'react';
import icon from '../images/caution.png';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message">
      <div className="error-header">
        <img src={icon} alt="Error icon" className="error-icon" />
        <p>Registration error</p>
      </div>
      <ul>
        <li>{message}</li>
      </ul>
    </div>
  );
};

export default ErrorMessage;
