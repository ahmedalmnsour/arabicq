'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { getLatestResult } from '@/lib/storage';
import { QuizResult } from '@/types/lesson';
import { TEXT } from '@/constants/text';
import { getScoreLabel, getScoreColor } from '@/utils/getScoreLabel';

export default function ResultPage() {
  const params = useParams();
  const { grade, term, subject, lesson } = params as {
    grade: string;
    term: string;
    subject: string;
    lesson: string;
  };

  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب آخر نتيجة من localStorage
    const latestResult = getLatestResult(lesson);
    setResult(latestResult);
    setLoading(false);
  }, [lesson]);

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!result) {
    return (
      <Container>
        <div style={{ padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
          <div className="alert alert-error" style={{ marginBottom: 'var(--space-xl)' }}>
            لم يتم العثور على نتيجة لهذا الاختبار.
          </div>
          <Link href={`/${grade}/${term}/${subject}/${lesson}`}>
            <Button variant="primary">ابدأ الاختبار</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const percentage = result.percentage;
  const scoreLabel = getScoreLabel(percentage);
  const scoreColor = getScoreColor(percentage);

  return (
    <Container>
      <div style={{ padding: 'var(--space-2xl) 0' }}>
        {/* النتيجة الرئيسية */}
        <div className="card" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ marginBottom: 'var(--space-lg)' }}>
            🎉 أحسنت!
          </h1>

          <div 
            style={{
              width: '200px',
              height: '200px',
              margin: '0 auto var(--space-lg)',
              borderRadius: '50%',
              border: `8px solid ${scoreColor}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-background)',
            }}
          >
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: scoreColor }}>
              {percentage}%
            </div>
            <div style={{ fontSize: '1.2rem', color: '#6c757d', marginTop: '8px' }}>
              {result.score}/{result.total}
            </div>
          </div>

          <h2 style={{ color: scoreColor, marginBottom: 'var(--space-md)' }}>
            {scoreLabel}
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
            {result.lessonTitle}
          </p>
        </div>

        {/* تفاصيل النتيجة */}
        <div className="grid grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="card">
            <h3>✅ الإجابات الصحيحة</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-success)' }}>
              {result.score}
            </p>
          </div>

          <div className="card">
            <h3>❌ الإجابات الخاطئة</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-error)' }}>
              {result.total - result.score}
            </p>
          </div>

          <div className="card">
            <h3>⏱️ الوقت المستغرق</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
              {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}
            </p>
          </div>

          <div className="card">
            <h3>📊 التقييم</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: scoreColor }}>
              {scoreLabel}
            </p>
          </div>
        </div>

        {/* مراجعة الأسئلة */}
        <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>📝 مراجعة الأسئلة</h3>
          
          {result.answers.map((answer, index) => (
            <div 
              key={index}
              style={{
                padding: 'var(--space-md)',
                marginBottom: 'var(--space-md)',
                borderRadius: 'var(--size-radius)',
                border: `2px solid ${answer.isCorrect ? 'var(--color-success)' : 'var(--color-error)'}`,
                backgroundColor: answer.isCorrect ? 'rgba(40, 167, 69, 0.05)' : 'rgba(220, 53, 69, 0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>السؤال {index + 1}</strong>
                <span className={answer.isCorrect ? 'badge-success' : 'badge-error'} style={{ padding: '4px 12px', borderRadius: '12px', color: 'white' }}>
                  {answer.isCorrect ? '✓ صحيح' : '✗ خاطئ'}
                </span>
              </div>
              
              <p style={{ marginBottom: '8px' }}>{answer.questionStem}</p>
              
              {!answer.isCorrect && (
                <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                  <p>إجابتك: <strong>{String(answer.userAnswer)}</strong></p>
                  <p>الإجابة الصحيحة: <strong style={{ color: 'var(--color-success)' }}>{String(answer.correctAnswer)}</strong></p>
                </div>
              )}

              {answer.explanation && (
                <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--color-background)', borderRadius: '4px' }}>
                  <strong>💡 التفسير:</strong>
                  <p style={{ marginTop: '4px', marginBottom: 0 }}>{answer.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* الإجراءات */}
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>ماذا تريد أن تفعل؟</h3>
          
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${grade}/${term}/${subject}/${lesson}`}>
              <Button variant="primary">
                {TEXT.retry}
              </Button>
            </Link>

            <Link href="/">
              <Button variant="secondary" style={{ backgroundColor: '#6c757d', color: 'white' }}>
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}