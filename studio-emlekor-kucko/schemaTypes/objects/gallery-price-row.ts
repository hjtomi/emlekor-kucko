import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const galleryPriceRow = defineType({
  name: 'galleryPriceRow',
  title: 'Ársor',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'filling',
      title: 'Töltés',
      type: 'string',
      options: {
        list: [
          {title: 'Anyatej és/vagy haj', value: 'milk-or-hair'},
          {title: 'Csak haj', value: 'hair'},
          {title: 'Ár', value: 'fixed'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Ár (Ft)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
  ],
  preview: {
    select: {filling: 'filling', amount: 'amount'},
    prepare({filling, amount}) {
      const labels: Record<string, string> = {
        'milk-or-hair': 'Anyatej és/vagy haj',
        hair: 'Csak haj',
        fixed: 'Ár',
      }
      return {
        title: labels[filling] ?? filling,
        subtitle: amount != null ? `${amount} Ft` : undefined,
      }
    },
  },
})
