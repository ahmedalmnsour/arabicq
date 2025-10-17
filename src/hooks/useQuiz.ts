'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnyQuestion, UserAnswer } from '@/types/question';
import { QuizResult } from '@/types/lesson';
import { shuffle } from '@/lib/shuffle';
import { checkTextAnswer } from '@/lib/normalizeAnswer';
import { createQuizResult } from '@/lib/results';
import { saveQuizResult, saveCurrentQuiz, clearCurrentQuiz } from '@/lib/storage';
import { logger } from '@/utils/logger';

interface UseQuizProps {
  lessonId: string;
  lessonTitle: string;
  grade: string;
  term: string;
  subjectType: string;
  questions: AnyQuestion[];
  shuffleQuestions?: boolean;
}

export function useQuiz({
  lessonId,
  lessonTitle,
  grade,
  term,
  subjectType,
  questions,
  shuffleQuestions = true,
}: UseQuizProps) {
  // الحالة
  const [quizQuestions, setQuizQuestions] = useState<AnyQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  // تهيئة الأسئلة
  useEffect(() => {
    if (questions.length > 0) {
      const prepared = shuffleQuestions ? shuffle(questions) : questions;
      setQuizQuestions(prepared);
      setStartTime(Date.now());
      logger.info('Quiz initialized', { lessonId, questionCount: questions.length });
    }
  }, [questions, shuffleQuestions, lessonId]);

  // السؤال الحالي
  const currentQuestion = quizQuestions[currentIndex];
  const isLastQuestion = currentIndex === quizQuestions.length - 1;
  const progress = quizQuestions.length > 0 
    ? Math.round(((currentIndex + 1) / quizQuestions.length) * 100)
    : 0;

  // التحقق من صحة الإجابة
  const checkAnswer = useCallback((question: AnyQuestion, answer: string | number | boolean): boolean => {
    switch (question.type) {
      case 'mcq':
        return answer === question.answerIndex;
      
      case 'tf':
        return answer === question.answerBool;
      
      case 'input':
      case 'correction':
        return typeof answer === 'string' 
          ? checkTextAnswer(answer, question.validAnswers)
          : false;
      
      default:
        return false;
    }
  }, []);

  // إرسال الإجابة
  const submitAnswer = useCallback((answer: string | number | boolean) => {
    if (!currentQuestion) return;

    const isCorrect = checkAnswer(currentQuestion, answer);
    
    const userAnswer: UserAnswer = {
      questionId: currentQuestion._id,
      answer,
      isCorrect,
      timeTaken: Math.floor((Date.now() - startTime) / 1000),
    };

    const newAnswers = [...answers, userAnswer];
    setAnswers(newAnswers);

    logger.info('Answer submitted', {
      questionId: currentQuestion._id,
      isCorrect,
      currentIndex,
    });

    // حفظ التقدم
    saveCurrentQuiz({
      lessonId,
      answers: newAnswers,
      startTime,
      currentIndex: currentIndex + 1,
    });

    // الانتقال للسؤال التالي أو إنهاء الاختبار
    if (isLastQuestion) {
      finishQuiz(newAnswers);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentQuestion, answers, currentIndex, isLastQuestion, startTime, lessonId, checkAnswer]);

  // إنهاء الاختبار
  const finishQuiz = useCallback(async (finalAnswers: UserAnswer[]) => {
    const quizResult = createQuizResult(
      lessonId,
      lessonTitle,
      grade,
      term,
      subjectType,
      quizQuestions,
      finalAnswers,
      startTime
    );

    setResult(quizResult);
    setIsFinished(true);
    
    // حفظ النتيجة محلياً
    saveQuizResult(quizResult);

    // حفظ النتيجة في Firebase
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          result: quizResult,
          uid: 'anonymous', // سيتم تحديثه عند إضافة Auth
        }),
      });
      logger.info('Result saved to Firebase');
    } catch (error) {
      logger.error('Failed to submit result to Firebase', error);
    }

    clearCurrentQuiz();

    logger.info('Quiz finished', {
      lessonId,
      score: quizResult.score,
      total: quizResult.total,
      percentage: quizResult.percentage,
    });
  }, [lessonId, lessonTitle, grade, term, subjectType, quizQuestions, startTime]);

  // إعادة المحاولة
  const retry = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setStartTime(Date.now());
    setIsFinished(false);
    setResult(null);
    
    const prepared = shuffleQuestions ? shuffle(questions) : questions;
    setQuizQuestions(prepared);
    
    clearCurrentQuiz();
    logger.info('Quiz restarted', { lessonId });
  }, [questions, shuffleQuestions, lessonId]);

  // تخطي السؤال (اختياري)
  const skipQuestion = useCallback(() => {
    if (isLastQuestion) {
      finishQuiz(answers);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLastQuestion, answers, finishQuiz]);

  return {
    // الحالة
    currentQuestion,
    currentIndex,
    totalQuestions: quizQuestions.length,
    progress,
    isLastQuestion,
    isFinished,
    result,
    answers,
    
    // الإجراءات
    submitAnswer,
    retry,
    skipQuestion,
  };
}