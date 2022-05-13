import React from "react";

interface StandardFormProps {
  onSubmit?: (e: any) => void;
  children?: React.ReactNode;
}

const StandardForm: React.FC<StandardFormProps> = ({ 
    onSubmit,
    children
  }) => { 
  return (
    <form
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default StandardForm;
