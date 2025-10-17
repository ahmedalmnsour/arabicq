'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AnyQuestion } from '@/types/question';
import { useQuiz } from '@/hooks/useQuiz';
import { Container } from '@/components/layout/Container';
import { Loading } from '@/components/ui/Loading';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';

interface QuizContainerProps {
  lessonId: string;
  lessonTitle: string;
  grade: string;
  term: string;
  subjectType: string;
  questions: AnyQuestion[];
}

export function QuizContainer({
  lessonId,
  lessonTitle,
  grade,
  term,
  subjectType,
  questions,
}: QuizContainerProps) {
  const router = useRouter();

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    isFinished,
    submitAnswer,
  } = useQuiz({
    lessonId,
    lessonTitle,
    grade,
    term,
    subjectType,
    questions,
    shuffleQuestions: true,
  });

  // عند انتهاء الاختبار، انتقل لصفحة النتيجة
  React.useEffect(() => {
    if (isFinished) {
      router.push(`/${grade}/${term}/${subjectType}/${lessonId}/result`);
    }
  }, [isFinished, router, grade, term, subjectType, lessonId]);

  // إذا لم يكن هناك أسئلة
  if (!questions || questions.length === 0) {
    return (
      <Container>
        <div style={{ padding: 'var(--space-2xl) 0' }}>
          <div className="alert alert-error">
            عذراً، لا توجد أسئلة متاحة لهذا الدرس.
          </div>
        </div>
      </Container>
    );
  }

  // أثناء التحميل
  if (!currentQuestion) {
    return <Loading fullScreen />;
  }

  return (
    <Container>
      <div style={{ padding: 'var(--space-2xl) 0' }}>
        {/* شريط التقدم */}
        <ProgressBar
          current={currentIndex + 1}
          total={totalQuestions}
          percentage={progress}
        />

        {/* بطاقة السؤال */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          onSubmit={submitAnswer}
        />

        {/* معلومات إضافية */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: 'var(--space-lg)',
          color: '#6c757d',
          fontSize: '0.9rem',
        }}>
          <p>📚 {lessonTitle}</p>
          <p style={{ marginTop: '4px' }}>
            الصف {grade} - الفصل {term} - {subjectType === 'nahw' ? 'النحو' : 'البلاغة'}
          </p>
        </div>
      </div>
    </Container>
  );
}