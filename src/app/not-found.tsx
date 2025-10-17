import Link from 'next/link';
import { TEXT } from '@/constants/text';

export default function NotFound() {
  return (
    <div className="container flex-center" style={{ minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        الصفحة غير موجودة
      </h2>
      <p style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '2rem' }}>
        عذراً، الصفحة التي تبحث عنها غير متوفرة.
      </p>
      <Link href="/" className="btn btn-primary">
        العودة للرئيسية
      </Link>
    </div>
  );
}