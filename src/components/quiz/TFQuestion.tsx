'use client';

import React, { useState } from 'react';
import { TFQuestion as TFQuestionType } from '@/types/question';
import { Button } from '@/components/ui/Button';

interface TFQuestionProps {
  question: TFQuestionType;
  onSubmit: (answer: boolean) => void;
}

export function TFQuestion({ question, onSubmit }: TFQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onSubmit(selectedAnswer);
    }
  };

  return (
    <div>
      {/* نص السؤال */}
      <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.5rem' }}>
        {question.stem}
      </h2>

      {/* الاختيارات: صح / خطأ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {/* صح */}
        <button
          onClick={() => setSelectedAnswer(true)}
          style={{
            padding: 'var(--space-lg)',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            border: `3px solid ${selectedAnswer === true ? 'var(--color-success)' : 'var(--color-border)'}`,
            borderRadius: 'var(--size-radius)',
            backgroundColor: selectedAnswer === true ? 'rgba(40, 167, 69, 0.1)' : 'var(--color-card)',
            color: selectedAnswer === true ? 'var(--color-success)' : 'var(--color-text)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          className="tf-button"
        >
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✓</div>
          <div>صح</div>
        </button>

        {/* خطأ */}
        <button
          onClick={() => setSelectedAnswer(false)}
          style={{
            padding: 'var(--space-lg)',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            border: `3px solid ${selectedAnswer === false ? 'var(--color-error)' : 'var(--color-border)'}`,
            borderRadius: 'var(--size-radius)',
            backgroundColor: selectedAnswer === false ? 'rgba(220, 53, 69, 0.1)' : 'var(--color-card)',
            color: selectedAnswer === false ? 'var(--color-error)' : 'var(--color-text)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          className="tf-button"
        >
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✗</div>
          <div>خطأ</div>
        </button>
      </div>

      {/* زر الإرسال */}
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        style={{ width: '100%' }}
      >
        تأكيد الإجابة
      </Button>

      <style jsx>{`
        .tf-button:hover {
          transform: scale(1.05);
        }
        
        .tf-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}