import { TEXT } from '@/constants/text';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: `تواصل معنا - ${TEXT.siteName}`,
  description: 'تواصل مع فريق ArabicQ',
};

export default function ContactPage() {
  return (
    <Container>
      <div style={{ padding: 'var(--space-2xl) 0' }}>
        <h1 style={{ marginBottom: 'var(--space-lg)' }}>تواصل معنا</h1>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>نسعد بتواصلك معنا</h2>
          <p>
            إذا كان لديك أي استفسار أو اقتراح أو ملاحظة، لا تتردد في التواصل معنا.
            فريقنا جاهز لمساعدتك!
          </p>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3>📧 البريد الإلكتروني</h3>
            <p>
              <a 
                href="mailto:info@arabicq.com" 
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
              >
                info@arabicq.com
              </a>
            </p>
          </div>

          <div className="card">
            <h3>📱 الهاتف</h3>
            <p style={{ direction: 'ltr', textAlign: 'right' }}>
              <a 
                href="tel:+96512345678" 
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
              >
                +965 1234 5678
              </a>
            </p>
          </div>

          <div className="card">
            <h3>📍 العنوان</h3>
            <p>
              الكويت - حولي<br />
              مجمع التعليم التفاعلي
            </p>
          </div>

          <div className="card">
            <h3>⏰ ساعات العمل</h3>
            <p>
              الأحد - الخميس<br />
              8:00 صباحاً - 4:00 مساءً
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}