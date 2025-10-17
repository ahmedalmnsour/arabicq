import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secretFromBody = body.secret;
    const secretFromHeader = request.headers.get('x-sanity-webhook-secret');
    
    const receivedSecret = secretFromBody || secretFromHeader;
    
    if (receivedSecret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Invalid webhook secret' },
        { status: 401 }
      );
    }

    // إعادة بناء شاملة
    revalidateTag('lesson');
    revalidateTag('question');
    revalidatePath('/', 'layout');
    
    console.log('✅ Webhook: Cache fully revalidated');

    return NextResponse.json({
      success: true,
      message: 'Cache revalidated successfully',
      revalidated: {
        tags: ['lesson', 'question'],
        paths: ['/']
      },
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