import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان الدرس',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'grade',
      title: 'المرحلة',
      type: 'string',
      options: {
        list: [
          { title: 'الصف العاشر', value: '10' },
          { title: 'الصف الحادي عشر', value: '11' },
          { title: 'الصف الثاني عشر', value: '12' },
        ],
      },
    }),
    defineField({
      name: 'term',
      title: 'الفصل',
      type: 'string',
      options: {
        list: [
          { title: 'الفصل الأول', value: '1' },
          { title: 'الفصل الثاني', value: '2' },
        ],
      },
    }),
    defineField({
      name: 'subjectType',
      title: 'القسم',
      type: 'string',
      options: {
        list: [
          { title: 'النحو', value: 'nahw' },
          { title: 'البلاغة', value: 'balagha' },
        ],
      },
    }),
        defineField({
      name: 'lessonId',
      title: 'معرّف الدرس',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
    }),
    defineField({
      name: 'questions',
      title: 'الأسئلة',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'question' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      grade: 'grade',
      term: 'term',
      subjectType: 'subjectType',
    },
    prepare({ title, grade, term, subjectType }) {
      return {
        title: title,
        subtitle: `${subjectType === 'nahw' ? 'النحو' : 'البلاغة'} - صف ${grade} - فصل ${term}`,
      }
    },
  },
})