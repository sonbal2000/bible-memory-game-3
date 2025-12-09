import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-2xl text-xl transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-purple-500 hover:bg-purple-600 text-white border-b-4 border-purple-700 active:border-b-0 active:translate-y-1",
    secondary: "bg-white hover:bg-gray-50 text-purple-600 border-b-4 border-gray-200 active:border-b-0 active:translate-y-1",
    outline: "border-2 border-purple-300 text-purple-500 hover:bg-purple-50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;