import {
  fallbackSiteContent,
  type AboutContent,
  type AboutValueIcon,
  type GalleryFillingId,
  type GalleryMetalId,
  type GalleryPriceExtra,
  type GalleryPriceTable,
  type SiteContent,
} from '../data/content';
import {urlForImage} from './image';

type SanityImage = {
  asset?: {_id?: string; url?: string} | null;
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
} | null;

type SanityPriceExtra = {
  _key?: string;
  label?: string | null;
  amount?: number | null;
  unit?: 'hour' | 'flat' | null;
};

type SanityLeaf = {
  _id?: string;
  id?: string | null;
  navLabel?: string | null;
  shortLabel?: string | null;
  heading?: string | null;
  quote?: string | null;
  paragraphs?: (string | null)[] | null;
  specs?: (string | null)[] | null;
  contactNote?: string | null;
  metal?: 'nemesacel' | 'ezust' | 'none' | null;
  allowsPrioritySurcharge?: boolean | null;
  extras?: SanityPriceExtra[] | null;
  priceRows?: {
    _key?: string;
    filling?: GalleryFillingId | null;
    amount?: number | null;
  }[] | null;
};

export type SanitySiteContent = {
  about?: {
    eyebrow?: string | null;
    heading?: string | null;
    tagline?: string | null;
    founderBadge?: string | null;
    introParagraphs?: (string | null)[] | null;
    closingQuote?: string | null;
    portrait?: SanityImage;
    values?: {
      _key?: string;
      icon?: string | null;
      title?: string | null;
      text?: string | null;
    }[] | null;
    storySections?: {
      _key?: string;
      heading?: string | null;
      paragraphs?: (string | null)[] | null;
    }[] | null;
  } | null;
  contact?: {
    email?: string | null;
    phone?: string | null;
    headquarters?: string | null;
    mailingAddress?: string | null;
    location?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    steps?: {
      _key?: string;
      num?: string | null;
      title?: string | null;
      text?: string | null;
    }[] | null;
  } | null;
  gallerySettings?: {
    milkOrHairLabel?: string | null;
    hairLabel?: string | null;
    fixedLabel?: string | null;
    prioritySurcharge?: string | null;
    hourlyExtras?: SanityPriceExtra[] | null;
  } | null;
  trustSettings?: {
    stats?: {_key?: string; value?: string | null; label?: string | null}[] | null;
  } | null;
  galleryMainCategories?: {
    _id?: string;
    id?: string | null;
    title?: string | null;
    emptyPrompt?: string | null;
    children?: SanityLeaf[] | null;
  }[] | null;
  galleryItems?: {
    _id: string;
    title?: string | null;
    caption?: string | null;
    category?: string | null;
    image?: SanityImage;
  }[] | null;
  testimonials?: {
    _id: string;
    name?: string | null;
    location?: string | null;
    quote?: string | null;
    pieces?: {
      _key?: string;
      label?: string | null;
      fit?: 'cover' | 'contain' | null;
      image?: SanityImage;
    }[] | null;
  }[] | null;
  faqItems?: {
    _id: string;
    question?: string | null;
    answer?: string | null;
    bullets?: (string | null)[] | null;
  }[] | null;
  pressItems?: {
    _id: string;
    outlet?: string | null;
    title?: string | null;
    publishedAt?: string | null;
    excerpt?: string | null;
    url?: string | null;
    pullQuote?: string | null;
  }[] | null;
};

const VALUE_ICONS: AboutValueIcon[] = ['heart', 'leaf', 'sparkles'];

function strings(values: (string | null)[] | null | undefined): string[] {
  return (values ?? []).filter((value): value is string => Boolean(value));
}

function mapExtra(extra: SanityPriceExtra): GalleryPriceExtra | null {
  if (!extra.label || extra.amount == null) return null;
  return {
    label: extra.label,
    amount: extra.amount,
    unit: extra.unit === 'hour' ? 'hour' : extra.unit === 'flat' ? 'flat' : undefined,
  };
}

function mapAbout(about: NonNullable<SanitySiteContent['about']>): AboutContent {
  const portraitUrl = urlForImage(about.portrait, 900);
  return {
    eyebrow: about.eyebrow || fallbackSiteContent.about.eyebrow,
    heading: about.heading || fallbackSiteContent.about.heading,
    tagline: about.tagline || fallbackSiteContent.about.tagline,
    founderBadge: about.founderBadge || fallbackSiteContent.about.founderBadge,
    introParagraphs: strings(about.introParagraphs).length
      ? strings(about.introParagraphs)
      : fallbackSiteContent.about.introParagraphs,
    closingQuote: about.closingQuote || fallbackSiteContent.about.closingQuote,
    portrait: {
      image: portraitUrl || fallbackSiteContent.about.portrait.image,
      alt: about.portrait?.alt || fallbackSiteContent.about.portrait.alt,
    },
    values: (about.values ?? [])
      .filter((value) => value.title && value.text)
      .map((value) => ({
        icon: VALUE_ICONS.includes(value.icon as AboutValueIcon)
          ? (value.icon as AboutValueIcon)
          : 'heart',
        title: value.title as string,
        text: value.text as string,
      })),
    storySections: (about.storySections ?? [])
      .map((section) => ({
        heading: section.heading || undefined,
        paragraphs: strings(section.paragraphs),
      }))
      .filter((section) => section.paragraphs.length > 0),
  };
}

function mapGallery(data: SanitySiteContent, next: SiteContent) {
  const categories = (data.galleryMainCategories ?? [])
    .filter((category) => category.id && category.title)
    .map((category) => ({
      id: category.id as string,
      label: category.title as string,
      emptyPrompt: category.emptyPrompt || undefined,
      children: (category.children ?? [])
        .filter((child) => child.id && child.navLabel)
        .map((child) => ({
          id: child.id as string,
          label: child.navLabel as string,
        })),
    }));

  if (categories.length === 0) return;

  const descriptions: SiteContent['galleryLeafDescriptions'] = {};
  const labels: Record<string, string> = {};
  const prices: Record<string, GalleryPriceTable> = {};
  const leafExtras: SiteContent['galleryLeafExtras'] = {};
  const allowsPriorityByLeaf: Record<string, boolean> = {};

  for (const category of data.galleryMainCategories ?? []) {
    for (const leaf of category.children ?? []) {
      if (!leaf.id) continue;
      const id = leaf.id;
      descriptions[id] = {
        heading: leaf.heading || leaf.navLabel || id,
        paragraphs: strings(leaf.paragraphs),
        quote: leaf.quote || undefined,
        specs: strings(leaf.specs),
        contactNote: leaf.contactNote || undefined,
      };
      labels[id] = leaf.shortLabel || leaf.navLabel || id;
      allowsPriorityByLeaf[id] = Boolean(leaf.allowsPrioritySurcharge);

      const metal = leaf.metal && leaf.metal !== 'none' ? (leaf.metal as GalleryMetalId) : undefined;
      prices[id] = {
        metals: metal ? [metal] : [],
        rows: (leaf.priceRows ?? [])
          .filter((row) => row.filling && row.amount != null)
          .map((row) => ({
            filling: row.filling as GalleryFillingId,
            prices: metal ? {[metal]: row.amount as number} : {},
          })),
      };

      const extras = (leaf.extras ?? [])
        .map(mapExtra)
        .filter((extra): extra is GalleryPriceExtra => extra != null);
      if (extras.length > 0) leafExtras[id] = extras;
    }
  }

  next.galleryCategories = categories;
  next.galleryLeafDescriptions = descriptions;
  next.galleryLeafLabels = labels;
  next.galleryPrices = prices;
  next.galleryLeafExtras = leafExtras;
  next.allowsPriorityByLeaf = allowsPriorityByLeaf;

  const items = (data.galleryItems ?? [])
    .map((item) => {
      const image = urlForImage(item.image, 1400);
      if (!image || !item.category) return null;
      return {
        id: item._id,
        title: item.title || 'Darab',
        caption: item.caption || '',
        category: item.category,
        image,
        alt: item.image?.alt || item.title || 'Galéria kép',
      };
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  if (items.length > 0) next.galleryItems = items;
}

export function mapSanityToSiteContent(data: SanitySiteContent | null | undefined): SiteContent {
  const next: SiteContent = {
    ...fallbackSiteContent,
    galleryPrices: {...fallbackSiteContent.galleryPrices},
    galleryLeafExtras: {...fallbackSiteContent.galleryLeafExtras},
    galleryLeafDescriptions: {...fallbackSiteContent.galleryLeafDescriptions},
    galleryLeafLabels: {...fallbackSiteContent.galleryLeafLabels},
    fillingLabels: {...fallbackSiteContent.fillingLabels},
    allowsPriorityByLeaf: {...fallbackSiteContent.allowsPriorityByLeaf},
  };

  if (!data) return next;

  if (data.about) {
    const mapped = mapAbout(data.about);
    if (mapped.values.length === 0) mapped.values = fallbackSiteContent.about.values;
    if (mapped.storySections.length === 0) mapped.storySections = fallbackSiteContent.about.storySections;
    next.about = mapped;
  }

  if (data.contact) {
    next.contactInfo = {
      email: data.contact.email || fallbackSiteContent.contactInfo.email,
      phone: data.contact.phone || fallbackSiteContent.contactInfo.phone,
      headquarters: data.contact.headquarters || fallbackSiteContent.contactInfo.headquarters,
      mailingAddress: data.contact.mailingAddress || fallbackSiteContent.contactInfo.mailingAddress,
      location: data.contact.location || fallbackSiteContent.contactInfo.location,
      instagram: data.contact.instagram || fallbackSiteContent.contactInfo.instagram,
      facebook: data.contact.facebook || fallbackSiteContent.contactInfo.facebook,
    };
    const steps = (data.contact.steps ?? [])
      .filter((step) => step.num && step.title && step.text)
      .map((step) => ({
        num: step.num as string,
        title: step.title as string,
        text: step.text as string,
      }));
    if (steps.length > 0) next.contactSteps = steps;
  }

  if (data.gallerySettings) {
    next.fillingLabels = {
      'milk-or-hair':
        data.gallerySettings.milkOrHairLabel || fallbackSiteContent.fillingLabels['milk-or-hair'],
      hair: data.gallerySettings.hairLabel || fallbackSiteContent.fillingLabels.hair,
      fixed: data.gallerySettings.fixedLabel || fallbackSiteContent.fillingLabels.fixed,
    };
    const extras = (data.gallerySettings.hourlyExtras ?? [])
      .map(mapExtra)
      .filter((extra): extra is GalleryPriceExtra => extra != null);
    if (extras.length > 0) next.galleryPriceExtras = extras;
    if (data.gallerySettings.prioritySurcharge) {
      next.galleryPrioritySurcharge = data.gallerySettings.prioritySurcharge;
    }
  }

  mapGallery(data, next);

  const testimonials = (data.testimonials ?? [])
    .map((item) => {
      const pieces = (item.pieces ?? [])
        .map((piece) => {
          const image = urlForImage(piece.image, 1400);
          if (!image) return null;
          return {
            image,
            label: piece.label || 'Darab',
            alt: piece.image?.alt || piece.label || item.name || 'Visszajelzés fotó',
            fit: piece.fit === 'contain' ? ('contain' as const) : ('cover' as const),
          };
        })
        .filter((piece): piece is NonNullable<typeof piece> => piece != null);
      if (!item.quote || !item.name || pieces.length === 0) return null;
      return {
        id: item._id,
        quote: item.quote,
        name: item.name,
        location: item.location || '',
        pieces,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item != null);

  if (testimonials.length > 0) next.testimonials = testimonials;

  const stats = (data.trustSettings?.stats ?? [])
    .filter((stat) => stat.value && stat.label)
    .map((stat) => ({value: stat.value as string, label: stat.label as string}));
  if (stats.length > 0) next.trustStats = stats;

  const faqItems = (data.faqItems ?? [])
    .filter((item) => item.question)
    .map((item) => ({
      id: item._id,
      question: item.question as string,
      answer: item.answer || '',
      bullets: strings(item.bullets),
    }));
  if (faqItems.length > 0) next.faqItems = faqItems;

  if (Array.isArray(data.pressItems) && data.pressItems.length > 0) {
    next.pressItems = data.pressItems
      .filter((item) => item.title && item.outlet && item.url)
      .map((item) => ({
        id: item._id,
        outlet: item.outlet as string,
        title: item.title as string,
        date: item.publishedAt || '',
        excerpt: item.excerpt || '',
        url: item.url as string,
        pullQuote: item.pullQuote || undefined,
      }));
  }

  return next;
}
