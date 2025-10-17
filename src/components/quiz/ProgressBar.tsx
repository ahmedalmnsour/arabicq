import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

export function ProgressBar({ current, total, percentage }: ProgressBarProps) {
  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      {/* النص */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: 'var(--space-sm)',
          fontSize: '0.9rem',
          color: '#6c757d',
        }}
      >
        <span>السؤال {current} من {total}</span>
        <span>{percentage}%</span>
      </div>

      {/* شريط التقدم */}
      <div 
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--color-border)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            transition: 'width var(--transition-base)',
          }}
        />
      </div>
    </div>
  );
}