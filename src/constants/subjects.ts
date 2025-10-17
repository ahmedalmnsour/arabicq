export interface Subject {
  key: string;
  title: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  questionCount: number;
}

export interface Grade {
  grade: string;
  terms: Term[];
}

export interface Term {
  term: string;
  subjects: SubjectWithLessons[];
}

export interface SubjectWithLessons extends Subject {
  lessons: Lesson[];
}

// المواد الأساسية
export const SUBJECTS: Subject[] = [
  {
    key: 'nahw',
    title: 'النحو',
    description: 'دروس وتمارين في النحو العربي',
  },
  {
    key: 'balagha',
    title: 'البلاغة',
    description: 'دروس وتمارين في البلاغة العربية',
  },
];

// بيانات وهمية للمراحل والدروس (سيتم استبدالها بـ Sanity في Layer 4)
export const GRADES_DATA: Grade[] = [
  {
    grade: '10',
    terms: [
      {
        term: '1',
        subjects: [
          {
            key: 'nahw',
            title: 'النحو',
            description: 'دروس النحو للصف العاشر - الفصل الأول',
            lessons: [
              {
                id: 'lesson-1',
                title: 'المبتدأ والخبر',
                description: 'تعريف المبتدأ والخبر وأنواعهما',
                order: 1,
                questionCount: 10,
              },
              {
                id: 'lesson-2',
                title: 'كان وأخواتها',
                description: 'دراسة الأفعال الناسخة وأحكامها',
                order: 2,
                questionCount: 12,
              },
            ],
          },
          {
            key: 'balagha',
            title: 'البلاغة',
            description: 'دروس البلاغة للصف العاشر - الفصل الأول',
            lessons: [
              {
                id: 'lesson-1',
                title: 'التشبيه',
                description: 'أركان التشبيه وأنواعه',
                order: 1,
                questionCount: 8,
              },
            ],
          },
        ],
      },
      {
        term: '2',
        subjects: [
          {
            key: 'nahw',
            title: 'النحو',
            description: 'دروس النحو للصف العاشر - الفصل الثاني',
            lessons: [
              {
                id: 'lesson-3',
                title: 'إن وأخواتها',
                description: 'دراسة الحروف الناسخة',
                order: 3,
                questionCount: 10,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: '11',
    terms: [
      {
        term: '1',
        subjects: [
          {
            key: 'nahw',
            title: 'النحو',
            description: 'دروس النحو للصف الحادي عشر - الفصل الأول',
            lessons: [
              {
                id: 'lesson-1',
                title: 'الفاعل ونائب الفاعل',
                description: 'دراسة الفاعل ونائب الفاعل وأحكامهما',
                order: 1,
                questionCount: 15,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: '12',
    terms: [
      {
        term: '1',
        subjects: [
          {
            key: 'nahw',
            title: 'النحو',
            description: 'دروس النحو للصف الثاني عشر - الفصل الأول',
            lessons: [
              {
                id: 'lesson-1',
                title: 'الإعراب والبناء',
                description: 'مراجعة شاملة للإعراب والبناء',
                order: 1,
                questionCount: 20,
              },
            ],
          },
        ],
      },
    ],
  },
];

// دوال مساعدة
export function getGradeData(grade: string): Grade | undefined {
  return GRADES_DATA.find((g) => g.grade === grade);
}

export function getTermData(grade: string, term: string): Term | undefined {
  const gradeData = getGradeData(grade);
  return gradeData?.terms.find((t) => t.term === term);
}

export function getSubjectData(
  grade: string,
  term: string,
  subjectKey: string
): SubjectWithLessons | undefined {
  const termData = getTermData(grade, term);
  return termData?.subjects.find((s) => s.key === subjectKey);
}

export function getLessonData(
  grade: string,
  term: string,
  subjectKey: string,
  lessonId: string
): Lesson | undefined {
  const subjectData = getSubjectData(grade, term, subjectKey);
  return subjectData?.lessons.find((l) => l.id === lessonId);
}