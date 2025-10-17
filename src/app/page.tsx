import { TEXT } from '@/constants/text';

export default function HomePage() {
  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {TEXT.siteName}
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#6c757d', textAlign: 'center' }}>
        منصة تعليمية تفاعلية للغة العربية
      </p>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
        🚀 Layer 1 جاهز!
      </p>
    </div>
  );
}