/**
 * أنواع الأسئلة المدعومة
 */
export type QuestionType = 'mcq' | 'tf' | 'input' | 'correction';

/**
 * السؤال الأساسي
 */
export interface Question {
  _id: string;
  type: QuestionType;
  stem: string; // نص السؤال
  explanation?: string; // الشرح/السبب
}

/**
 * سؤال اختيار من متعدد (MCQ)
 */
export interface MCQQuestion extends Question {
  type: 'mcq';
  choices: string[]; // الاختيارات
  answerIndex: number; // رقم الإجابة الصحيحة (0-based)
}

/**
 * سؤال صح/خطأ (True/False)
 */
export interface TFQuestion extends Question {
  type: 'tf';
  answerBool: boolean; // true = صح, false = خطأ
}

/**
 * سؤال إدخال نصي (Input)
 */
export interface InputQuestion extends Question {
  type: 'input';
  validAnswers: string[]; // الإجابات الصحيحة المقبولة
}

/**
 * سؤال التصحيح (Correction)
 */
export interface CorrectionQuestion extends Question {
  type: 'correction';
  validAnswers: string[];
}

/**
 * نوع موحد لجميع الأسئلة
 */
export type AnyQuestion = MCQQuestion | TFQuestion | InputQuestion | CorrectionQuestion;

/**
 * إجابة المستخدم
 */
export interface UserAnswer {
  questionId: string;
  answer: string | number | boolean;
  isCorrect: boolean;
  timeTaken?: number; // بالثواني
}

/**
 * حالة السؤال في الاختبار
 */
export interface QuestionState {
  question: AnyQuestion;
  userAnswer?: UserAnswer;
  isAnswered: boolean;
}