import React from "react";

interface InputFieldProps {
  name?: string;
  type?: string;
  checked?: boolean;
  className?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}

const Input: React.FC<InputFieldProps> = ({ 
    name,
    type,
    checked,
    className,
    id,
    placeholder,
    value,
    onChange
  }) => { 
  return (
    <input 
      name={name}
      type={type}
      checked={checked}
      className={className}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
    </input>
  );
}

export default Input;
