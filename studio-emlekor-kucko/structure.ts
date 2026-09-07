import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HeartIcon} from '@sanity/icons/Heart'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {ImageIcon} from '@sanity/icons/Image'
import {ImagesIcon} from '@sanity/icons/Images'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {UserIcon} from '@sanity/icons/User'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Tartalom')
    .items([
      S.listItem()
        .title('Rólam')
        .icon(UserIcon)
        .child(S.document().schemaType('about').documentId('about').title('Rólam')),
      S.listItem()
        .title('Kapcsolat')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contact').documentId('contact').title('Kapcsolat')),
      S.divider(),
      S.listItem()
        .title('Galéria')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Galéria')
            .items([
              S.documentTypeListItem('galleryMainCategory').title('Fő kategóriák').icon(TagIcon),
              S.documentTypeListItem('galleryLeaf').title('Típusok').icon(TagIcon),
              S.documentTypeListItem('galleryItem').title('Darabok').icon(ImageIcon),
              S.listItem()
                .title('Árak és extrák')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('gallerySettings')
                    .documentId('gallerySettings')
                    .title('Árak és extrák'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Visszajelzések')
        .icon(HeartIcon)
        .child(
          S.list()
            .title('Visszajelzések')
            .items([
              S.documentTypeListItem('testimonial').title('Vélemények').icon(HeartIcon),
              S.listItem()
                .title('Bizalmi számok')
                .icon(StarIcon)
                .child(
                  S.document()
                    .schemaType('trustSettings')
                    .documentId('trustSettings')
                    .title('Bizalmi számok'),
                ),
            ]),
        ),
      S.documentTypeListItem('pressItem').title('Sajtó').icon(DocumentTextIcon),
      S.documentTypeListItem('faqItem').title('GYIK').icon(HelpCircleIcon),
    ])
