import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'النوع',
      type: 'string',
      options: {
        list: [
          { title: 'اختيار من متعدد', value: 'mcq' },
          { title: 'صح أو خطأ', value: 'tf' },
          { title: 'إدخال نصي', value: 'input' },
          { title: 'تصحيح', value: 'correction' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'stem',
      title: 'نص السؤال',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'choices',
      title: 'الاختيارات',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.type !== 'mcq',
    }),
    defineField({
      name: 'answerIndex',
      title: 'إجابة الاختيار (إن وجد)',
      type: 'number',
      hidden: ({ parent }) => parent?.type !== 'mcq',
    }),
    defineField({
      name: 'answerBool',
      title: 'إجابة صح/خطأ (إن وجد)',
      type: 'boolean',
      hidden: ({ parent }) => parent?.type !== 'tf',
    }),
    defineField({
      name: 'validAnswers',
      title: 'إجابات نصية صحيحة (إن وجدت)',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.type !== 'input' && parent?.type !== 'correction',
    }),
    defineField({
      name: 'explanation',
      title: 'سبب/شرح',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      stem: 'stem',
      type: 'type',
    },
    prepare({ stem, type }) {
      const typeLabels: Record<string, string> = {
        mcq: 'اختيار من متعدد',
        tf: 'صح أو خطأ',
        input: 'إدخال نصي',
        correction: 'تصحيح',
      }
      return {
        title: stem,
        subtitle: typeLabels[type] || type,
      }
    },
  },
})