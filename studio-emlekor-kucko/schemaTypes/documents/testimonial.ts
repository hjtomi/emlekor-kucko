import {defineArrayMember, defineField, defineType} from 'sanity'
import {HeartIcon} from '@sanity/icons/Heart'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Visszajelzés',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Név',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Helyszín',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Idézet',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pieces',
      title: 'Ékszerfotók',
      type: 'array',
      of: [defineArrayMember({type: 'testimonialPiece'})],
      validation: (rule) => rule.min(1).required(),
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
    select: {title: 'name', subtitle: 'location', media: 'pieces.0.image'},
  },
})
