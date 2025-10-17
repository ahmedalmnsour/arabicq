import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // جلب Secret من Body أو Headers
    const body = await request.json();
    const secretFromBody = body.secret;
    const secretFromHeader = request.headers.get('x-sanity-webhook-secret');
    
    const receivedSecret = secretFromBody || secretFromHeader;
    
    if (receivedSecret !== process.env.SANITY_WEBHOOK_SECRET) {
      console.log('❌ Invalid secret:', { receivedSecret, expected: process.env.SANITY_WEBHOOK_SECRET?.substring(0, 10) + '...' });
      return NextResponse.json(
        { error: 'Invalid webhook secret' },
        { status: 401 }
      );
    }

    // إعادة بناء جميع المسارات
    revalidatePath('/', 'layout');

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