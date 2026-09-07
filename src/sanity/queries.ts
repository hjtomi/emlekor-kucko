import {defineQuery} from 'groq';

const imageFields = /* groq */ `
  asset->{_id, url},
  alt,
  hotspot,
  crop
`;

export const SITE_CONTENT_QUERY = defineQuery(/* groq */ `{
  "about": *[_id == "about"][0]{
    eyebrow,
    heading,
    tagline,
    founderBadge,
    introParagraphs,
    closingQuote,
    portrait { ${imageFields} },
    values[]{ _key, icon, title, text },
    storySections[]{ _key, heading, paragraphs }
  },
  "contact": *[_id == "contact"][0]{
    email,
    phone,
    headquarters,
    mailingAddress,
    location,
    instagram,
    facebook,
    steps[]{ _key, num, title, text }
  },
  "gallerySettings": *[_id == "gallerySettings"][0]{
    milkOrHairLabel,
    hairLabel,
    fixedLabel,
    prioritySurcharge,
    hourlyExtras[]{ _key, label, amount, unit }
  },
  "trustSettings": *[_id == "trustSettings"][0]{
    stats[]{ _key, value, label }
  },
  "galleryMainCategories": *[_type == "galleryMainCategory"] | order(sortOrder asc){
    _id,
    title,
    emptyPrompt,
    "id": slug.current,
    children[]->{
      _id,
      "id": slug.current,
      navLabel,
      shortLabel,
      heading,
      quote,
      paragraphs,
      specs,
      contactNote,
      metal,
      allowsPrioritySurcharge,
      extras[]{ _key, label, amount, unit },
      priceRows[]{ _key, filling, amount }
    }
  },
  "galleryItems": *[_type == "galleryItem"] | order(sortOrder asc){
    _id,
    title,
    caption,
    "category": category->slug.current,
    image { ${imageFields} }
  },
  "testimonials": *[_type == "testimonial"] | order(sortOrder asc){
    _id,
    name,
    location,
    quote,
    pieces[]{
      _key,
      label,
      fit,
      image { ${imageFields} }
    }
  },
  "faqItems": *[_type == "faqItem"] | order(sortOrder asc){
    _id,
    question,
    answer,
    bullets
  },
  "pressItems": *[_type == "pressItem"] | order(publishedAt desc){
    _id,
    outlet,
    title,
    publishedAt,
    excerpt,
    url,
    pullQuote
  }
}`);
