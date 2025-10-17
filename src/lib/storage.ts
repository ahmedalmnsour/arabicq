import { QuizResult } from '@/types/lesson';
import { logger } from '@/utils/logger';

/**
 * مفاتيح التخزين المحلي
 */
const STORAGE_KEYS = {
  RESULTS: 'arabicq_results',
  CURRENT_QUIZ: 'arabicq_current_quiz',
  USER_PREFS: 'arabicq_user_prefs',
} as const;

/**
 * حفظ البيانات في localStorage
 */
function saveToStorage<T>(key: string, data: T): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    logger.debug(`Data saved to storage: ${key}`);
    return true;
  } catch (error) {
    logger.error(`Failed to save to storage: ${key}`, error);
    return false;
  }
}

/**
 * قراءة البيانات من localStorage
 */
function loadFromStorage<T>(key: string): T | null {
  try {
    if (typeof window === 'undefined') return null;
    
    const serialized = localStorage.getItem(key);
    if (!serialized) return null;
    
    const data = JSON.parse(serialized) as T;
    logger.debug(`Data loaded from storage: ${key}`);
    return data;
  } catch (error) {
    logger.error(`Failed to load from storage: ${key}`, error);
    return null;
  }
}

/**
 * حذف البيانات من localStorage
 */
function removeFromStorage(key: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    
    localStorage.removeItem(key);
    logger.debug(`Data removed from storage: ${key}`);
    return true;
  } catch (error) {
    logger.error(`Failed to remove from storage: ${key}`, error);
    return false;
  }
}

// ========== النتائج ==========

/**
 * حفظ نتيجة اختبار
 */
export function saveQuizResult(result: QuizResult): boolean {
  const results = getAllResults();
  results.push(result);
  
  // الاحتفاظ بآخر 50 نتيجة فقط
  const limitedResults = results.slice(-50);
  
  return saveToStorage(STORAGE_KEYS.RESULTS, limitedResults);
}

/**
 * الحصول على جميع النتائج المحفوظة
 */
export function getAllResults(): QuizResult[] {
  return loadFromStorage<QuizResult[]>(STORAGE_KEYS.RESULTS) || [];
}

/**
 * الحصول على نتائج درس معين
 */
export function getLessonResults(lessonId: string): QuizResult[] {
  const allResults = getAllResults();
  return allResults.filter((r) => r.lessonId === lessonId);
}

/**
 * الحصول على أفضل نتيجة لدرس معين
 */
export function getBestResult(lessonId: string): QuizResult | null {
  const lessonResults = getLessonResults(lessonId);
  
  if (lessonResults.length === 0) return null;
  
  return lessonResults.reduce((best, current) =>
    current.percentage > best.percentage ? current : best
  );
}

/**
 * الحصول على آخر نتيجة لدرس معين
 */
export function getLatestResult(lessonId: string): QuizResult | null {
  const lessonResults = getLessonResults(lessonId);
  
  if (lessonResults.length === 0) return null;
  
  return lessonResults[lessonResults.length - 1];
}

/**
 * حذف جميع النتائج
 */
export function clearAllResults(): boolean {
  return removeFromStorage(STORAGE_KEYS.RESULTS);
}

// ========== الاختبار الحالي ==========

/**
 * حفظ حالة الاختبار الحالي
 */
export function saveCurrentQuiz(data: {
  lessonId: string;
  answers: any[];
  startTime: number;
  currentIndex: number;
}): boolean {
  return saveToStorage(STORAGE_KEYS.CURRENT_QUIZ, data);
}

/**
 * قراءة حالة الاختبار الحالي
 */
export function loadCurrentQuiz(): {
  lessonId: string;
  answers: any[];
  startTime: number;
  currentIndex: number;
} | null {
  return loadFromStorage(STORAGE_KEYS.CURRENT_QUIZ);
}

/**
 * حذف حالة الاختبار الحالي
 */
export function clearCurrentQuiz(): boolean {
  return removeFromStorage(STORAGE_KEYS.CURRENT_QUIZ);
}

// ========== الإحصائيات ==========

/**
 * حساب إحصائيات المستخدم
 */
export function getUserStats(): {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  averageScore: number;
  bestScore: number;
  recentActivity: QuizResult[];
} {
  const results = getAllResults();
  
  if (results.length === 0) {
    return {
      totalQuizzes: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      averageScore: 0,
      bestScore: 0,
      recentActivity: [],
    };
  }

  const totalQuizzes = results.length;
  const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
  const correctAnswers = results.reduce((sum, r) => sum + r.score, 0);
  const averageScore = Math.round(
    results.reduce((sum, r) => sum + r.percentage, 0) / results.length
  );
  const bestScore = Math.max(...results.map((r) => r.percentage));
  const recentActivity = results.slice(-5).reverse();

  return {
    totalQuizzes,
    totalQuestions,
    correctAnswers,
    averageScore,
    bestScore,
    recentActivity,
  };
}