import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'subject',
  title: 'Subject',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'المعرف',
      type: 'string',
      options: {
        list: [
          { title: 'النحو', value: 'nahw' },
          { title: 'البلاغة', value: 'balagha' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'الوصف',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      key: 'key',
    },
    prepare({ title, key }) {
      return {
        title: title,
        subtitle: key,
      }
    },
  },
})