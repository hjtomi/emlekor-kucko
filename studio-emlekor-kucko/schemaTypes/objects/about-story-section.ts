import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const aboutStorySection = defineType({
  name: 'aboutStorySection',
  title: 'Történet szakasz',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Címsor',
      type: 'string',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Bekezdések',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: {title: 'heading', paragraphs: 'paragraphs'},
    prepare({title, paragraphs}) {
      const first = Array.isArray(paragraphs) ? paragraphs[0] : ''
      return {
        title: title || 'Szakasz',
        subtitle: typeof first === 'string' ? first : undefined,
      }
    },
  },
})
