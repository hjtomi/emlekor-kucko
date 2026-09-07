import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const gallerySettings = defineType({
  name: 'gallerySettings',
  title: 'Árak és extrák',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'milkOrHairLabel',
      title: 'Anyatej/haj árcímke',
      type: 'string',
      initialValue: 'Anyatej és/vagy haj',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hairLabel',
      title: 'Csak haj árcímke',
      type: 'string',
      initialValue: 'Csak haj',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fixedLabel',
      title: 'Fix ár címke',
      type: 'string',
      initialValue: 'Ár',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hourlyExtras',
      title: 'Óradíjas extrák',
      description: 'Akkor jelenik meg, ha a típusnak anyatej/haj ára van.',
      type: 'array',
      of: [defineArrayMember({type: 'priceExtra'})],
    }),
    defineField({
      name: 'prioritySurcharge',
      title: 'Elsőbbségi felár szövege',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Árak és extrák'}
    },
  },
})
