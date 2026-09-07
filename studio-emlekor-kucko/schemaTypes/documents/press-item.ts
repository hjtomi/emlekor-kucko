import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const pressItem = defineType({
  name: 'pressItem',
  title: 'Sajtó megjelenés',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'outlet',
      title: 'Média',
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
      name: 'publishedAt',
      title: 'Dátum',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Kivonat',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Cikk URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https']}).error('Érvényes http(s) URL kell'),
    }),
    defineField({
      name: 'pullQuote',
      title: 'Kiemelt idézet',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'outletLogo',
      title: 'Média logó',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  orderings: [
    {
      title: 'Dátum (újabb elöl)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'outlet'},
  },
})
