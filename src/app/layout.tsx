import type { Metadata, Viewport } from 'next';
import { TEXT } from '@/constants/text';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/variables.css';
import '@/styles/globals.css';
import '@/styles/typography.css';
import '@/styles/theme.css';
import '@/styles/components.css';

export const metadata: Metadata = {
  title: TEXT.siteName,
  description: 'منصة تعليمية تفاعلية للغة العربية - النحو والبلاغة',
  keywords: ['اللغة العربية', 'النحو', 'البلاغة', 'تعليم', 'اختبارات', 'الكويت'],
  authors: [{ name: 'ArabicQ Team' }],
  robots: 'index, follow',
  openGraph: {
    title: TEXT.siteName,
    description: 'منصة تعليمية تفاعلية للغة العربية',
    type: 'website',
    locale: 'ar_KW',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}