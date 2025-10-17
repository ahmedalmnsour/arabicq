# 🎯 ArabicQ

منصة تعليمية تفاعلية للغة العربية - النحو والبلاغة

## 📚 نظرة عامة

ArabicQ هو تطبيق تعليمي مصمم لطلاب المرحلة الثانوية (الصفوف 10-12) في الكويت، يوفر اختبارات تفاعلية في:
- **النحو** (Nahw)
- **البلاغة** (Balagha)

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **CMS**: Sanity.io
- **Styling**: Custom CSS (RTL Support)
- **Backend** (Optional): Firebase Firestore

## 🚀 البدء السريع

### المتطلبات
- Node.js >= 18.0.0
- npm >= 9.0.0

### التثبيت
```bash
# نسخ المشروع
git clone https://github.com/yourusername/arabicq.git
cd arabicq

# تثبيت المكتبات
npm install

# إعداد البيئة
cp .env.example .env.local
# ثم عدّل ملف .env.local بالقيم الصحيحة

# تشغيل المشروع
npm run dev