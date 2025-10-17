import { sanityFetch, sanityClient } from './sanity.client';
import { Lesson } from '@/types/lesson';
import { AnyQuestion } from '@/types/question';
import { logger } from '@/utils/logger';

/**
 * GROQ Query لجلب جميع الدروس
 */
const ALL_LESSONS_QUERY = `
  *[_type == "lesson"] | order(order asc) {
    _id,
    title,
    grade,
    term,
    subjectType,
    "lessonId": lessonId.current,
    order,
    description,
    "questions": questions[]-> {
      _id,
      type,
      stem,
      choices,
      answerIndex,
      answerBool,
      validAnswers,
      explanation
    }
  }
`;

/**
 * GROQ Query لجلب درس واحد بواسطة lessonId (slug)
 */
const LESSON_BY_ID_QUERY = `
  *[_type == "lesson" && lessonId.current == $lessonId][0] {
    _id,
    title,
    grade,
    term,
    subjectType,
    "lessonId": lessonId.current,
    order,
    description,
    "questions": questions[]-> {
      _id,
      type,
      stem,
      choices,
      answerIndex,
      answerBool,
      validAnswers,
      explanation
    }
  }
`;

/**
 * GROQ Query لجلب دروس حسب grade, term, subject
 */
const LESSONS_BY_FILTERS_QUERY = `
  *[_type == "lesson" 
    && grade == $grade 
    && term == $term 
    && subjectType == $subjectType
  ] | order(order asc) {
    _id,
    title,
    grade,
    term,
    subjectType,
    "lessonId": lessonId.current,
    order,
    description,
    "questions": questions[]-> {
      _id,
      type,
      stem,
      choices,
      answerIndex,
      answerBool,
      validAnswers,
      explanation
    }
  }
`;

/**
 * جلب جميع الدروس
 */
export async function fetchAllLessons(): Promise<Lesson[]> {
  try {
    const lessons = await sanityFetch<Lesson[]>({
      query: ALL_LESSONS_QUERY,
      tags: ['lesson'],
    });

    logger.info('Fetched all lessons from Sanity', { count: lessons.length });
    return lessons;
  } catch (error) {
    logger.error('Failed to fetch lessons from Sanity', error);
    return [];
  }
}

/**
 * جلب درس واحد بواسطة lessonId (slug)
 */
export async function fetchLessonById(lessonId: string): Promise<Lesson | null> {
  try {
    const lesson = await sanityClient.fetch<Lesson>(
      LESSON_BY_ID_QUERY,
      { lessonId }
    );

    if (!lesson) {
      logger.warn('Lesson not found', { lessonId });
      return null;
    }

    logger.info('Fetched lesson from Sanity', { lessonId, title: lesson.title });
    return lesson;
  } catch (error) {
    logger.error('Failed to fetch lesson from Sanity', { lessonId, error });
    return null;
  }
}

/**
 * جلب دروس بواسطة grade, term, subjectType
 */
export async function fetchLessonsByFilters(
  grade: string,
  term: string,
  subjectType: string
): Promise<Lesson[]> {
  try {
    const lessons = await sanityFetch<Lesson[]>({
      query: LESSONS_BY_FILTERS_QUERY,
      params: { grade, term, subjectType },
      tags: ['lesson', `lessons-${grade}-${term}-${subjectType}`],
    });

    logger.info('Fetched lessons by filters', {
      grade,
      term,
      subjectType,
      count: lessons.length,
    });

    return lessons;
  } catch (error) {
    logger.error('Failed to fetch lessons by filters', {
      grade,
      term,
      subjectType,
      error,
    });
    return [];
  }
}

/**
 * التحقق من وجود درس
 */
export async function lessonExists(lessonId: string): Promise<boolean> {
  const lesson = await fetchLessonById(lessonId);
  return lesson !== null;
}