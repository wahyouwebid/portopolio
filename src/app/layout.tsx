import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CursorAnimation from '@/components/layout/CursorAnimation';
import { Toaster } from 'react-hot-toast';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Ujang Wahyu — Mobile Engineer',
    template: '%s | Ujang Wahyu',
  },
  description:
    'Mobile Engineer specializing in Flutter, Kotlin, and Swift. Building world-class mobile applications with 6+ years of experience.',
  keywords: ['Mobile Engineer', 'Flutter Developer', 'Kotlin', 'iOS', 'Android', 'Ujang Wahyu'],
  authors: [{ name: 'Ujang Wahyu' }],
  creator: 'Ujang Wahyu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ujangwahyu.dev',
    siteName: 'Ujang Wahyu',
    title: 'Ujang Wahyu — Mobile Engineer',
    description: 'Mobile Engineer specializing in Flutter, Kotlin & Swift.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ujang Wahyu — Mobile Engineer',
    description: 'Mobile Engineer specializing in Flutter, Kotlin & Swift.',
    creator: '@ujangwahyu',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://ujangwahyu.dev'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-slate-100`}>
        <CursorAnimation />
        {!isAdmin && <Navbar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#16161f',
              color: '#e2e8f0',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
