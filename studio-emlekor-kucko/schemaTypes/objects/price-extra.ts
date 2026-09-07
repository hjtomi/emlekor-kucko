import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const priceExtra = defineType({
  name: 'priceExtra',
  title: 'Ár extra',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Megnevezés',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Összeg (Ft)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'unit',
      title: 'Egység',
      type: 'string',
      initialValue: 'flat',
      options: {
        list: [
          {title: 'Óradíj', value: 'hour'},
          {title: 'Egyszeri díj', value: 'flat'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', amount: 'amount', unit: 'unit'},
    prepare({title, amount, unit}) {
      const suffix = unit === 'hour' ? ' Ft/óra' : ' Ft'
      return {title, subtitle: `${amount ?? 0}${suffix}`}
    },
  },
})
