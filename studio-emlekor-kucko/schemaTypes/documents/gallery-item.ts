import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Galéria darab',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Felirat',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Típus',
      type: 'reference',
      to: [{type: 'galleryLeaf'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Fotó',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt szöveg',
          type: 'string',
          validation: (rule) => rule.required().warning('Az alt szöveg a képernyőolvasókhoz kell'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sorrend',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sorrend',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.navLabel',
      media: 'image',
    },
  },
})
