import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and tutorials on Flutter, Kotlin, iOS development, mobile architecture, and engineering best practices.',
};

export default function BlogPage() {
  return <BlogPageClient />;
}
