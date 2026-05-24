import type { Metadata } from 'next';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for mobile applications and website by Ujang Wahyu — Mobile Engineer. Learn how your data is collected, used, and protected.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
