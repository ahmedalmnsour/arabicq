import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { QuizResult, UserProgress } from '@/types/lesson';
import { logger } from '@/utils/logger';

/**
 * حفظ نتيجة الاختبار في Firestore
 */
export async function saveResultToFirestore(
  result: QuizResult,
  uid?: string
): Promise<boolean> {
  try {
    const userId = uid || 'anonymous';
    const resultId = `${userId}_${result.lessonId}_${Date.now()}`;

    await setDoc(doc(db, 'results', resultId), {
      ...result,
      uid: userId,
      createdAt: serverTimestamp(),
    });

    logger.info('Result saved to Firestore', { resultId });
    return true;
  } catch (error) {
    logger.error('Failed to save result to Firestore', error);
    return false;
  }
}

/**
 * حفظ/تحديث تقدم المستخدم
 */
export async function saveUserProgress(
  progress: Omit<UserProgress, 'lastAttempt'>
): Promise<boolean> {
  try {
    const progressId = `${progress.uid}_${progress.grade}_${progress.term}_${progress.subjectType}_${progress.lessonId}`;

    const progressDoc = await getDoc(doc(db, 'progress', progressId));

    let attempts = 1;
    let bestScore = progress.score;

    if (progressDoc.exists()) {
      const existing = progressDoc.data() as UserProgress;
      attempts = existing.attempts + 1;
      bestScore = Math.max(existing.bestScore || 0, progress.score);
    }

    await setDoc(doc(db, 'progress', progressId), {
      ...progress,
      attempts,
      bestScore,
      lastAttempt: serverTimestamp(),
    });

    logger.info('User progress saved to Firestore', { progressId });
    return true;
  } catch (error) {
    logger.error('Failed to save user progress to Firestore', error);
    return false;
  }
}

/**
 * جلب تقدم المستخدم لدرس معين
 */
export async function getUserProgress(
  uid: string,
  grade: string,
  term: string,
  subjectType: string,
  lessonId: string
): Promise<UserProgress | null> {
  try {
    const progressId = `${uid}_${grade}_${term}_${subjectType}_${lessonId}`;
    const progressDoc = await getDoc(doc(db, 'progress', progressId));

    if (!progressDoc.exists()) {
      return null;
    }

    return progressDoc.data() as UserProgress;
  } catch (error) {
    logger.error('Failed to get user progress from Firestore', error);
    return null;
  }
}

/**
 * جلب جميع نتائج المستخدم
 */
export async function getUserResults(
  uid: string,
  limitCount: number = 10
): Promise<QuizResult[]> {
  try {
    const resultsQuery = query(
      collection(db, 'results'),
      where('uid', '==', uid),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(resultsQuery);
    return snapshot.docs.map((doc) => doc.data() as QuizResult);
  } catch (error) {
    logger.error('Failed to get user results from Firestore', error);
    return [];
  }
}

/**
 * جلب أفضل نتيجة لدرس معين
 */
export async function getBestResultForLesson(
  uid: string,
  lessonId: string
): Promise<QuizResult | null> {
  try {
    const resultsQuery = query(
      collection(db, 'results'),
      where('uid', '==', uid),
      where('lessonId', '==', lessonId),
      orderBy('percentage', 'desc'),
      limit(1)
    );

    const snapshot = await getDocs(resultsQuery);
    
    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as QuizResult;
  } catch (error) {
    logger.error('Failed to get best result from Firestore', error);
    return null;
  }
}