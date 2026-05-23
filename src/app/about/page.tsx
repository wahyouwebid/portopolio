import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Ujang Wahyu — Mobile Engineer with 6+ years building Flutter, Kotlin, and Swift applications.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
