import React from 'react';
import { TEXT } from '@/constants/text';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ text = TEXT.loading, fullScreen = false }: LoadingProps) {
  const containerStyle: React.CSSProperties = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-background)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-2xl)',
      };

  return (
    <div style={containerStyle}>
      <div 
        className="loading" 
        style={{ 
          width: '40px', 
          height: '40px',
          borderColor: 'var(--color-primary)',
          borderTopColor: 'transparent',
        }}
      ></div>
      <p style={{ marginTop: 'var(--space-md)', color: 'var(--color-text)' }}>
        {text}
      </p>
    </div>
  );
}