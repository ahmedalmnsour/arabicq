import { TEXT } from '@/constants/text';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: `سياسة الخصوصية - ${TEXT.siteName}`,
  description: 'سياسة الخصوصية وحماية البيانات في ArabicQ',
};

export default function PrivacyPage() {
  return (
    <Container>
      <div style={{ padding: 'var(--space-2xl) 0' }}>
        <h1 style={{ marginBottom: 'var(--space-lg)' }}>سياسة الخصوصية</h1>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <p style={{ color: '#6c757d' }}>
            آخر تحديث: {new Date().toLocaleDateString('ar-KW')}
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>1. جمع البيانات</h2>
          <p>
            نحن في {TEXT.siteName} نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
            نقوم بجمع المعلومات التالية:
          </p>
          <ul style={{ marginRight: 'var(--space-lg)', lineHeight: 2 }}>
            <li>معلومات الحساب (الاسم، البريد الإلكتروني)</li>
            <li>بيانات الأداء والتقدم الدراسي</li>
            <li>معلومات الجهاز والمتصفح</li>
          </ul>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>2. استخدام البيانات</h2>
          <p>
            نستخدم المعلومات التي نجمعها للأغراض التالية:
          </p>
          <ul style={{ marginRight: 'var(--space-lg)', lineHeight: 2 }}>
            <li>توفير وتحسين خدماتنا التعليمية</li>
            <li>تتبع تقدمك الدراسي</li>
            <li>التواصل معك بخصوص الخدمة</li>
            <li>تحسين تجربة المستخدم</li>
          </ul>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>3. حماية البيانات</h2>
          <p>
            نستخدم إجراءات أمنية متقدمة لحماية بياناتك من الوصول غير المصرح به
            أو التعديل أو الإفصاح أو الإتلاف.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>4. مشاركة البيانات</h2>
          <p>
            نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة
            إلا في الحالات التي يتطلبها القانون.
          </p>
        </div>

        <div className="card">
          <h2>5. حقوقك</h2>
          <p>
            لديك الحق في:
          </p>
          <ul style={{ marginRight: 'var(--space-lg)', lineHeight: 2 }}>
            <li>الوصول إلى بياناتك الشخصية</li>
            <li>تصحيح البيانات غير الدقيقة</li>
            <li>حذف بياناتك</li>
            <li>الاعتراض على معالجة بياناتك</li>
          </ul>
          <p style={{ marginTop: 'var(--space-md)' }}>
            للاستفسارات حول سياسة الخصوصية، يرجى التواصل معنا على: 
            <a 
              href="mailto:privacy@arabicq.com" 
              style={{ color: 'var(--color-primary)', marginRight: '8px' }}
            >
              privacy@arabicq.com
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
}