import {defineArrayMember, defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const galleryLeaf = defineType({
  name: 'galleryLeaf',
  title: 'Galéria típus',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'navLabel',
      title: 'Navigációs címke',
      description: 'A típusválasztó gombon jelenik meg.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortLabel',
      title: 'Rövid címke',
      description: 'A kártyákon, a kép fölött jelenik meg.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Azonosító',
      type: 'slug',
      options: {source: 'navLabel'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Árblokk címe',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Idézet',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'paragraphs',
      title: 'Leírás',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
    }),
    defineField({
      name: 'specs',
      title: 'Specifikációk',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'contactNote',
      title: 'Kapcsolatfelvételi megjegyzés',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'metal',
      title: 'Fém',
      type: 'string',
      initialValue: 'nemesacel',
      options: {
        list: [
          {title: 'Nemesacél', value: 'nemesacel'},
          {title: 'Ezüst', value: 'ezust'},
          {title: 'Nincs (pl. utalvány)', value: 'none'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceRows',
      title: 'Árak',
      type: 'array',
      of: [defineArrayMember({type: 'galleryPriceRow'})],
    }),
    defineField({
      name: 'extras',
      title: 'Típus-specifikus extrák',
      type: 'array',
      of: [defineArrayMember({type: 'priceExtra'})],
    }),
    defineField({
      name: 'allowsPrioritySurcharge',
      title: 'Elsőbbségi felár kérhető',
      type: 'boolean',
      initialValue: true,
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
    select: {title: 'navLabel', slug: 'slug.current'},
    prepare({title, slug}) {
      return {title, subtitle: slug}
    },
  },
})
