import {defineArrayMember, defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const galleryMainCategory = defineType({
  name: 'galleryMainCategory',
  title: 'Galéria fő kategória',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Megnevezés',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Azonosító',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emptyPrompt',
      title: 'Üres állapot szövege',
      description: 'Akkor jelenik meg, ha a kategória ki van választva, de típus még nincs.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'children',
      title: 'Típusok',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'galleryLeaf'}]})],
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
    select: {title: 'title', slug: 'slug.current'},
    prepare({title, slug}) {
      return {title, subtitle: slug}
    },
  },
})
