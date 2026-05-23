import { NextResponse } from 'next/server';
import { projects } from '@/data/projects';

export async function GET() {
  return NextResponse.json({ success: true, data: projects });
}

export async function POST() {
  // In production: validate auth token, persist to DB
  return NextResponse.json({ success: false, error: 'Not implemented — use the admin UI' }, { status: 501 });
}
