import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export const about = defineType({
  name: 'about',
  title: 'Rólam',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Kis címke',
      type: 'string',
      initialValue: 'Rólam',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Név / főcím',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Alcím',
      type: 'string',
    }),
    defineField({
      name: 'portrait',
      title: 'Portré',
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
      name: 'founderBadge',
      title: 'Portré jelvény',
      type: 'string',
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Bevezető bekezdések',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: 'values',
      title: 'Értékek',
      type: 'array',
      of: [defineArrayMember({type: 'aboutValue'})],
    }),
    defineField({
      name: 'storySections',
      title: 'Történet',
      type: 'array',
      of: [defineArrayMember({type: 'aboutStorySection'})],
    }),
    defineField({
      name: 'closingQuote',
      title: 'Záró idézet',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'tagline', media: 'portrait'},
  },
})
