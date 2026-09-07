import {defineField, defineType} from 'sanity'
import {HeartIcon} from '@sanity/icons/Heart'

export const aboutValue = defineType({
  name: 'aboutValue',
  title: 'Érték',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      initialValue: 'heart',
      options: {
        list: [
          {title: 'Szív', value: 'heart'},
          {title: 'Levél', value: 'leaf'},
          {title: 'Csillogás', value: 'sparkles'},
        ],
        layout: 'radio',
      },
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
    select: {title: 'title', subtitle: 'text'},
  },
})
