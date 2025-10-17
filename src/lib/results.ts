import { QuizResult } from '@/types/lesson';
import { AnyQuestion, UserAnswer } from '@/types/question';
import { calculatePercentage } from '@/utils/getScoreLabel';

/**
 * حساب النتيجة من الإجابات
 */
export function calculateScore(answers: UserAnswer[]): {
  score: number;
  total: number;
  percentage: number;
} {
  const total = answers.length;
  const score = answers.filter((a) => a.isCorrect).length;
  const percentage = calculatePercentage(score, total);

  return { score, total, percentage };
}

/**
 * إنشاء كائن النتيجة الكامل
 */
export function createQuizResult(
  lessonId: string,
  lessonTitle: string,
  grade: string,
  term: string,
  subjectType: string,
  questions: AnyQuestion[],
  userAnswers: UserAnswer[],
  startTime: number
): QuizResult {
  const { score, total, percentage } = calculateScore(userAnswers);
  const timeTaken = Math.floor((Date.now() - startTime) / 1000); // بالثواني

  const answers = userAnswers.map((userAnswer) => {
    const question = questions.find((q) => q._id === userAnswer.questionId);
    
    if (!question) {
      throw new Error(`Question not found: ${userAnswer.questionId}`);
    }

    // الحصول على الإجابة الصحيحة حسب نوع السؤال
    let correctAnswer: string | number | boolean = '';
    
    switch (question.type) {
      case 'mcq':
        correctAnswer = question.answerIndex;
        break;
      case 'tf':
        correctAnswer = question.answerBool;
        break;
      case 'input':
      case 'correction':
        correctAnswer = question.validAnswers[0] || '';
        break;
    }

    return {
      questionId: question._id,
      questionStem: question.stem,
      userAnswer: userAnswer.answer,
      correctAnswer,
      isCorrect: userAnswer.isCorrect,
      explanation: question.explanation,
    };
  });

  return {
    lessonId,
    lessonTitle,
    grade,
    term,
    subjectType,
    score,
    total,
    percentage,
    timeTaken,
    answers,
    completedAt: new Date().toISOString(),
  };
}

/**
 * تحليل نقاط الضعف من النتائج
 */
export function analyzeWeakAreas(result: QuizResult): string[] {
  const weakAreas: string[] = [];
  
  // الأسئلة الخاطئة
  const wrongAnswers = result.answers.filter((a) => !a.isCorrect);
  
  if (wrongAnswers.length === 0) {
    return [];
  }

  // يمكن تحسين هذا لاحقاً بإضافة tags للأسئلة
  if (result.percentage < 60) {
    weakAreas.push('يحتاج مراجعة شاملة للدرس');
  }
  
  if (wrongAnswers.length > result.total / 2) {
    weakAreas.push('صعوبة في فهم المفاهيم الأساسية');
  }

  return weakAreas;
}

/**
 * مقارنة نتيجتين
 */
export function compareResults(
  result1: QuizResult,
  result2: QuizResult
): {
  improved: boolean;
  scoreDiff: number;
  percentageDiff: number;
} {
  const scoreDiff = result2.score - result1.score;
  const percentageDiff = result2.percentage - result1.percentage;
  const improved = percentageDiff > 0;

  return {
    improved,
    scoreDiff,
    percentageDiff,
  };
}