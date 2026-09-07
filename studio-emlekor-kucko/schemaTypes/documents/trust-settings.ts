import {defineArrayMember, defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export const trustSettings = defineType({
  name: 'trustSettings',
  title: 'Bizalmi számok',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'stats',
      title: 'Számok',
      type: 'array',
      of: [defineArrayMember({type: 'trustStat'})],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Bizalmi számok'}
    },
  },
})
