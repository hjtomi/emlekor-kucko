import {defineArrayMember, defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

export const contact = defineType({
  name: 'contact',
  title: 'Kapcsolat',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'headquarters',
      title: 'Székhely',
      type: 'string',
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Levelezési cím',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Ország',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('Érvényes http(s) URL kell'),
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).error('Érvényes http(s) URL kell'),
    }),
    defineField({
      name: 'steps',
      title: 'Folyamat lépései',
      type: 'array',
      of: [defineArrayMember({type: 'contactStep'})],
    }),
  ],
  preview: {
    select: {title: 'email', subtitle: 'phone'},
    prepare({title, subtitle}) {
      return {title: title || 'Kapcsolat', subtitle}
    },
  },
})
