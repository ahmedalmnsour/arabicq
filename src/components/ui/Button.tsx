import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  loading = false, 
  children, 
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' : '';
  
  return (
    <button 
      className={`btn ${variantClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="loading" style={{ marginLeft: '8px' }}></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}