import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export const testimonialPiece = defineType({
  name: 'testimonialPiece',
  title: 'Ékszerfotó',
  type: 'object',
  icon: ImageIcon,
  fields: [
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
      name: 'label',
      title: 'Címke',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fit',
      title: 'Képillesztés',
      type: 'string',
      initialValue: 'cover',
      options: {
        list: [
          {title: 'Kitöltés (cover)', value: 'cover'},
          {title: 'Befoglalás (contain)', value: 'contain'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {title: 'label', media: 'image'},
  },
})
