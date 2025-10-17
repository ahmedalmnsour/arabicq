import Link from 'next/link';
import { TEXT } from '@/constants/text';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-card)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
        padding: 'var(--space-2xl) 0',
      }}
    >
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-xl)',
          marginBottom: 'var(--space-xl)',
        }}>
          {/* القسم الأول */}
          <div>
            <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-primary)' }}>
              {TEXT.siteName}
            </h3>
            <p style={{ color: '#6c757d', lineHeight: 1.6 }}>
              منصة تعليمية تفاعلية للغة العربية - النحو والبلاغة
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 style={{ marginBottom: 'var(--space-md)' }}>روابط سريعة</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <li>
                <Link href="/" style={{ color: '#6c757d', transition: 'color var(--transition-fast)' }}>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#6c757d', transition: 'color var(--transition-fast)' }}>
                  عن المنصة
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#6c757d', transition: 'color var(--transition-fast)' }}>
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* سياسات */}
          <div>
            <h4 style={{ marginBottom: 'var(--space-md)' }}>السياسات</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <li>
                <Link href="/privacy" style={{ color: '#6c757d', transition: 'color var(--transition-fast)' }}>
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: '#6c757d', transition: 'color var(--transition-fast)' }}>
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر */}
        <div 
          className="divider" 
          style={{ margin: 'var(--space-xl) 0' }}
        ></div>
        <p style={{ textAlign: 'center', color: '#6c757d' }}>
          © {currentYear} {TEXT.siteName}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}