import { AnyQuestion } from './question';

/**
 * الدرس
 */
export interface Lesson {
  _id: string;
  title: string;
  grade: string;
  term: string;
  subjectType: string;
  lessonId?: string; // أصبح اختيارياً
  order: number;
  description?: string;
  questions: AnyQuestion[];
}

/**
 * نتيجة الاختبار
 */
export interface QuizResult {
  lessonId: string;
  lessonTitle: string;
  grade: string;
  term: string;
  subjectType: string;
  score: number; // عدد الإجابات الصحيحة
  total: number; // إجمالي الأسئلة
  percentage: number; // النسبة المئوية
  timeTaken: number; // الوقت المستغرق بالثواني
  answers: {
    questionId: string;
    questionStem: string;
    userAnswer: string | number | boolean;
    correctAnswer: string | number | boolean;
    isCorrect: boolean;
    explanation?: string;
  }[];
  completedAt: string; // ISO date string
}

/**
 * تقدم المستخدم
 */
export interface UserProgress {
  uid: string;
  grade: string;
  term: string;
  subjectType: string;
  lessonId: string;
  score: number;
  attempts: number;
  lastAttempt: string; // ISO date string
  bestScore?: number;
  weakAreas?: string[]; // مواضيع يحتاج تحسين فيها
}