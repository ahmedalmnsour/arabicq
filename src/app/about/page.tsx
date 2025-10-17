import { TEXT } from '@/constants/text';
import { Container } from '@/components/layout/Container';

export const metadata = {
  title: `عن المنصة - ${TEXT.siteName}`,
  description: 'تعرف على منصة ArabicQ التعليمية',
};

export default function AboutPage() {
  return (
    <Container>
      <div style={{ padding: 'var(--space-2xl) 0' }}>
        <h1 style={{ marginBottom: 'var(--space-lg)' }}>عن المنصة</h1>
        
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>من نحن؟</h2>
          <p>
            <strong>{TEXT.siteName}</strong> هي منصة تعليمية تفاعلية مصممة خصيصاً لطلاب المرحلة الثانوية
            في الكويت (الصفوف 10-12) لتعلم وممارسة اللغة العربية بشكل ممتع وفعال.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2>رؤيتنا</h2>
          <p>
            نسعى لجعل تعلم اللغة العربية أكثر تفاعلية ومتعة من خلال توفير اختبارات ذكية
            وتقييم فوري يساعد الطلاب على تحسين مستواهم.
          </p>
        </div>

        <div className="card">
          <h2>ما نقدمه</h2>
          <ul style={{ marginRight: 'var(--space-lg)', lineHeight: 2 }}>
            <li>✅ اختبارات تفاعلية في النحو والبلاغة</li>
            <li>✅ تقييم فوري وتفصيلي للإجابات</li>
            <li>✅ تتبع التقدم الدراسي</li>
            <li>✅ محتوى متوافق مع المنهج الكويتي</li>
            <li>✅ واجهة سهلة الاستخدام</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}