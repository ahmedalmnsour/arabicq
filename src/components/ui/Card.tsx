import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`card ${className}`} style={{ cursor: hover ? 'pointer' : 'default' }}>
      {children}
    </div>
  );
}