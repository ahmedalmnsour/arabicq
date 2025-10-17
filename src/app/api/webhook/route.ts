import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // التحقق من Webhook Secret
    const secret = request.headers.get('sanity-webhook-secret');
    
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Invalid webhook secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // إعادة بناء جميع الصفحات المرتبطة بالدروس
    revalidateTag('lesson');
    revalidateTag('question');
    
    // إعادة بناء الصفحة الرئيسية
    revalidatePath('/');

    console.log('✅ Webhook received - Cache revalidated');

    return NextResponse.json({
      success: true,
      message: 'Cache revalidated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}