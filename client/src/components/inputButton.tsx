import React from "react";

interface InputButtonProps {
  type?: string;
  value?: string;
  className?: string;
}

const InputButton: React.FC<InputButtonProps> = ({ 
    type,
    value,
    className,
  }) => { 
  return (
    <input 
      type={type}
      value={value}
      className={className}
    >
    </input>
  );
}

export default InputButton;