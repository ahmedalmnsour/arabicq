import { TEXT } from '@/constants/text';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: `شروط الاستخدام - ${TEXT.siteName}`,
  description: 'شروط وأحكام استخدام منصة ArabicQ',
};

export default function TermsPage() {
  return (
    <Container>
      <div style={{ padding: 'var(--space-2xl) 0' }}>
        <h1 style={{ marginBottom: 'var(--space-lg)' }}>شروط الاستخدام</h1>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <p style={{ color: '#6c757d' }}>
            آخر تحديث: {new Date().toLocaleDateString('ar-KW')}
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>1. قبول الشروط</h2>
          <p>
            باستخدامك لمنصة {TEXT.siteName}، فإنك توافق على الالتزام بهذه الشروط والأحكام.
            إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>2. استخدام المنصة</h2>
          <p>
            يحق لك استخدام المنصة للأغراض التعليمية الشخصية فقط. يُمنع:
          </p>
          <ul style={{ marginRight: 'var(--space-lg)', lineHeight: 2 }}>
            <li>نسخ أو توزيع المحتوى دون إذن</li>
            <li>استخدام المنصة لأغراض تجارية</li>
            <li>محاولة اختراق أو تعطيل المنصة</li>
            <li>مشاركة حسابك مع الآخرين</li>
          </ul>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>3. حقوق الملكية الفكرية</h2>
          <p>
            جميع المحتويات المتاحة على المنصة (النصوص، الأسئلة، التصميمات) محمية بحقوق الملكية الفكرية
            ومملوكة لـ {TEXT.siteName} أو مرخصة لها.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>4. المسؤولية</h2>
          <p>
            نسعى لتوفير محتوى دقيق ومحدث، لكننا لا نضمن خلو المنصة من الأخطاء.
            استخدامك للمنصة يكون على مسؤوليتك الخاصة.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>5. إنهاء الحساب</h2>
          <p>
            نحتفظ بالحق في تعليق أو إنهاء حسابك في حالة انتهاك هذه الشروط
            دون إشعار مسبق.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>6. التعديلات</h2>
          <p>
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية
            عبر البريد الإلكتروني أو من خلال إشعار على المنصة.
          </p>
        </div>

        <div className="card">
          <h2>7. القانون الحاكم</h2>
          <p>
            تخضع هذه الشروط لقوانين دولة الكويت، وأي نزاع يتم حله وفقاً للقوانين المعمول بها.
          </p>
          <p style={{ marginTop: 'var(--space-md)' }}>
            للاستفسارات حول الشروط والأحكام، يرجى التواصل معنا على: 
            <a 
              href="mailto:legal@arabicq.com" 
              style={{ color: 'var(--color-primary)', marginRight: '8px' }}
            >
              legal@arabicq.com
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
}