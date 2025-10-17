import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { fetchLessonById } from '@/lib/fetchLessons';
import { TEXT } from '@/constants/text';

export const revalidate = 0;

interface LessonPageProps {
  params: {
    grade: string;
    term: string;
    subject: string;
    lesson: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { grade, term, subject, lesson } = params;

  const lessonData = await fetchLessonById(lesson);

  if (
    !lessonData ||
    lessonData.grade !== grade ||
    lessonData.term !== term ||
    lessonData.subjectType !== subject
  ) {
    notFound();
  }

  if (!lessonData.questions || lessonData.questions.length === 0) {
    return (
      <Container>
        <div style={{ padding: 'var(--space-2xl) 0' }}>
          <div className="alert alert-error">
            عذراً، لا توجد أسئلة متاحة لهذا الدرس حالياً.
          </div>
          <Link href="/">
            <button className="btn btn-primary">العودة للرئيسية</button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <QuizContainer
      lessonId={lessonData.lessonId || lessonData._id}
      lessonTitle={lessonData.title}
      grade={lessonData.grade}
      term={lessonData.term}
      subjectType={lessonData.subjectType}
      questions={lessonData.questions}
    />
  );
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { lesson } = params;
  const lessonData = await fetchLessonById(lesson);

  if (!lessonData) {
    return {
      title: 'الدرس غير موجود',
    };
  }

  return {
    title: `${lessonData.title} - ${TEXT.siteName}`,
    description: lessonData.description || `اختبار تفاعلي: ${lessonData.title}`,
  };
}