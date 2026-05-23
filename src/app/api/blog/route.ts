import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';

export async function GET() {
  const published = blogPosts.filter((p) => p.published);
  return NextResponse.json({ success: true, data: published });
}

export async function POST() {
  return NextResponse.json({ success: false, error: 'Not implemented — use the admin UI' }, { status: 501 });
}
