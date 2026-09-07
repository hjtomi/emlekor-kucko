import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export const trustStat = defineType({
  name: 'trustStat',
  title: 'Bizalmi adat',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Érték',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Címke',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})
