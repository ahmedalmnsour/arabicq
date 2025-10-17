import { sanityFetch } from './sanity.client';
import { AnyQuestion } from '@/types/question';
import { logger } from '@/utils/logger';

/**
 * GROQ Query لجلب سؤال واحد
 */
const QUESTION_BY_ID_QUERY = `
  *[_type == "question" && _id == $questionId][0] {
    _id,
    type,
    stem,
    choices,
    answerIndex,
    answerBool,
    validAnswers,
    explanation
  }
`;

/**
 * GROQ Query لجلب جميع الأسئلة
 */
const ALL_QUESTIONS_QUERY = `
  *[_type == "question"] {
    _id,
    type,
    stem,
    choices,
    answerIndex,
    answerBool,
    validAnswers,
    explanation
  }
`;

/**
 * جلب سؤال واحد بواسطة ID
 */
export async function fetchQuestionById(questionId: string): Promise<AnyQuestion | null> {
  try {
    const question = await sanityFetch<AnyQuestion>({
      query: QUESTION_BY_ID_QUERY,
      params: { questionId },
      tags: ['question', `question-${questionId}`],
    });

    if (!question) {
      logger.warn('Question not found', { questionId });
      return null;
    }

    logger.info('Fetched question from Sanity', { questionId });
    return question;
  } catch (error) {
    logger.error('Failed to fetch question from Sanity', { questionId, error });
    return null;
  }
}

/**
 * جلب جميع الأسئلة
 */
export async function fetchAllQuestions(): Promise<AnyQuestion[]> {
  try {
    const questions = await sanityFetch<AnyQuestion[]>({
      query: ALL_QUESTIONS_QUERY,
      tags: ['question'],
    });

    logger.info('Fetched all questions from Sanity', { count: questions.length });
    return questions;
  } catch (error) {
    logger.error('Failed to fetch questions from Sanity', error);
    return [];
  }
}

/**
 * جلب أسئلة متعددة بواسطة IDs
 */
export async function fetchQuestionsByIds(questionIds: string[]): Promise<AnyQuestion[]> {
  try {
    const query = `
      *[_type == "question" && _id in $questionIds] {
        _id,
        type,
        stem,
        choices,
        answerIndex,
        answerBool,
        validAnswers,
        explanation
      }
    `;

    const questions = await sanityFetch<AnyQuestion[]>({
      query,
      params: { questionIds },
      tags: ['question'],
    });

    logger.info('Fetched questions by IDs', { count: questions.length });
    return questions;
  } catch (error) {
    logger.error('Failed to fetch questions by IDs', error);
    return [];
  }
}