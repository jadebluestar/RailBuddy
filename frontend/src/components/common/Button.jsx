import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'font-medium rounded-lg focus:outline-none focus:ring-4 transition-all duration-200';
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-blue-300',
    secondary: 'bg-secondary text-white hover:bg-green-700 focus:ring-green-300',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white focus:ring-blue-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;