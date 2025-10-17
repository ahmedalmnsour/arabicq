'use client';

import React, { useState } from 'react';
import { InputQuestion as InputQuestionType, CorrectionQuestion } from '@/types/question';
import { Button } from '@/components/ui/Button';

interface InputQuestionProps {
  question: InputQuestionType | CorrectionQuestion;
  onSubmit: (answer: string) => void;
}

export function InputQuestion({ question, onSubmit }: InputQuestionProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim()) {
      handleSubmit();
    }
  };

  return (
    <div>
      {/* نص السؤال */}
      <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.5rem' }}>
        {question.stem}
      </h2>

      {/* حقل الإدخال */}
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <label 
          htmlFor="answer-input"
          style={{ 
            display: 'block',
            marginBottom: 'var(--space-sm)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
          }}
        >
          اكتب إجابتك:
        </label>
        
        <input
          id="answer-input"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="اكتب الإجابة هنا..."
          className="input"
          style={{
            fontSize: '1.2rem',
            padding: 'var(--space-md)',
          }}
          autoFocus
        />

        <p style={{ 
          marginTop: 'var(--space-sm)', 
          fontSize: '0.9rem', 
          color: '#6c757d' 
        }}>
          💡 نصيحة: اكتب الإجابة بوضوح دون أخطاء إملائية
        </p>
      </div>

      {/* زر الإرسال */}
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={!answer.trim()}
        style={{ width: '100%' }}
      >
        تأكيد الإجابة
      </Button>
    </div>
  );
}