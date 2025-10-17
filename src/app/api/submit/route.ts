import { NextRequest, NextResponse } from 'next/server';
import { saveResultToFirestore, saveUserProgress } from '@/lib/firestore';
import { QuizResult } from '@/types/lesson';
import { analyzeWeakAreas } from '@/lib/results';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result: QuizResult = body.result;
    const uid: string = body.uid || 'anonymous';

    // حفظ النتيجة في Firestore
    const saved = await saveResultToFirestore(result, uid);

    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to save result' },
        { status: 500 }
      );
    }

    // تحديث تقدم المستخدم
    const weakAreas = analyzeWeakAreas(result);
    
    await saveUserProgress({
      uid,
      grade: result.grade,
      term: result.term,
      subjectType: result.subjectType,
      lessonId: result.lessonId,
      score: result.score,
      attempts: 0, // سيتم تحديثه في saveUserProgress
      weakAreas,
    });

    return NextResponse.json({
      success: true,
      message: 'Result saved successfully',
    });
  } catch (error) {
    console.error('Error in submit API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}