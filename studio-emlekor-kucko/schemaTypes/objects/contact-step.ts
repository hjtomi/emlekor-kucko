import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const contactStep = defineType({
  name: 'contactStep',
  title: 'Folyamat lépés',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'num',
      title: 'Sorszám',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Szöveg',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {num: 'num', title: 'title'},
    prepare({num, title}) {
      return {title: `${num ?? ''} ${title ?? ''}`.trim()}
    },
  },
})
