import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ujang Wahyu — available for freelance projects and full-time positions.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
