'use client';

import React, { useState } from 'react';
import { MCQQuestion as MCQQuestionType } from '@/types/question';
import { Button } from '@/components/ui/Button';

interface MCQQuestionProps {
  question: MCQQuestionType;
  onSubmit: (answer: number) => void;
}

export function MCQQuestion({ question, onSubmit }: MCQQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      onSubmit(selectedIndex);
    }
  };

  return (
    <div>
      {/* نص السؤال */}
      <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.5rem' }}>
        {question.stem}
      </h2>

      {/* الاختيارات */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            style={{
              padding: 'var(--space-md)',
              textAlign: 'right',
              fontSize: '1.1rem',
              border: `2px solid ${selectedIndex === index ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: 'var(--size-radius)',
              backgroundColor: selectedIndex === index ? 'rgba(0, 46, 99, 0.05)' : 'var(--color-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            className="choice-button"
          >
            <span style={{ 
              display: 'inline-block',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: selectedIndex === index ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'white',
              textAlign: 'center',
              lineHeight: '32px',
              marginLeft: '12px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
            }}>
              {String.fromCharCode(65 + index)}
            </span>
            {choice}
          </button>
        ))}
      </div>

      {/* زر الإرسال */}
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={selectedIndex === null}
        style={{ width: '100%' }}
      >
        تأكيد الإجابة
      </Button>

      <style jsx>{`
        .choice-button:hover {
          border-color: var(--color-primary);
          transform: translateX(-4px);
        }
        
        .choice-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}