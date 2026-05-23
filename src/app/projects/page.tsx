import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portfolio of mobile apps built by Ujang Wahyu — Flutter, Android (Kotlin), and iOS (Swift) applications.',
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
