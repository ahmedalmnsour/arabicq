'use client';

import React from 'react';
import { AnyQuestion } from '@/types/question';
import { MCQQuestion } from './MCQQuestion';
import { TFQuestion } from './TFQuestion';
import { InputQuestion } from './InputQuestion';

interface QuestionCardProps {
  question: AnyQuestion;
  questionNumber: number;
  onSubmit: (answer: string | number | boolean) => void;
}

export function QuestionCard({ question, questionNumber, onSubmit }: QuestionCardProps) {
  // اختيار المكون المناسب حسب نوع السؤال
  const renderQuestion = () => {
    switch (question.type) {
      case 'mcq':
        return <MCQQuestion question={question} onSubmit={onSubmit} />;
      
      case 'tf':
        return <TFQuestion question={question} onSubmit={onSubmit} />;
      
      case 'input':
      case 'correction':
        return <InputQuestion question={question} onSubmit={onSubmit} />;
      
      default:
        return <div className="alert alert-error">نوع السؤال غير مدعوم</div>;
    }
  };

  // أيقونة نوع السؤال
  const getQuestionIcon = () => {
    switch (question.type) {
      case 'mcq':
        return '📝';
      case 'tf':
        return '✓✗';
      case 'input':
        return '✍️';
      case 'correction':
        return '🔧';
      default:
        return '❓';
    }
  };

  // اسم نوع السؤال
  const getQuestionTypeName = () => {
    switch (question.type) {
      case 'mcq':
        return 'اختيار من متعدد';
      case 'tf':
        return 'صح أو خطأ';
      case 'input':
        return 'إدخال نصي';
      case 'correction':
        return 'تصحيح';
      default:
        return 'غير محدد';
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* رأس البطاقة */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 'var(--space-lg)',
        paddingBottom: 'var(--space-md)',
        borderBottom: '2px solid var(--color-border)',
      }}>
        <span style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: 'var(--color-primary)',
        }}>
          السؤال {questionNumber}
        </span>
        
        <span className="badge" style={{ fontSize: '0.9rem' }}>
          {getQuestionIcon()} {getQuestionTypeName()}
        </span>
      </div>

      {/* محتوى السؤال */}
      {renderQuestion()}
    </div>
  );
}