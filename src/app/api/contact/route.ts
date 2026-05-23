import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    if (message.length < 20) {
      return NextResponse.json({ success: false, error: 'Message must be at least 20 characters' }, { status: 400 });
    }

    // In production: send email via nodemailer / Resend / SendGrid
    console.log('Contact form submission:', { name, email, subject, message });

    return NextResponse.json({ success: true, message: 'Message received' });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
