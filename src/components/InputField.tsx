import React, { useState, ChangeEvent, FocusEvent } from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  iconSrc: string;
  defaultIconSrc: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, value, onChange, placeholder, iconSrc, defaultIconSrc }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(e.target.value !== '');
  };

  return (
    <div className="input-field">
      <img src={(isFocused || value) ? iconSrc : defaultIconSrc} alt={`${name}-icon`} className="input-icon" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
