export type GalleryMainId = 'gyuruk' | 'emlek-gyongyok' | 'medalok';
export type GalleryLeafId = 'mithril' | 'csepp' | 'emlek-gyongyok' | 'medalok';

export interface GallerySubcategory {
  id: GalleryLeafId;
  label: string;
  priceFrom: number;
}

export interface GalleryMainCategory {
  id: GalleryMainId;
  label: string;
  children?: GallerySubcategory[];
  priceFrom?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: GalleryLeafId;
  image: string;
  alt: string;
}

export const GALLERY_LEAF_LABELS: Record<GalleryLeafId, string> = {
  mithril: 'Mithril gyűrű',
  csepp: 'Csepp gyűrű',
  'emlek-gyongyok': 'Emlék gyöngy',
  medalok: 'Medál',
};

// PLACEHOLDER: confirm starting prices with Szabina before public launch.
export const galleryCategories: GalleryMainCategory[] = [
  {
    id: 'gyuruk',
    label: 'Gyűrűk',
    children: [
      { id: 'mithril', label: 'Mithril gyűrűk', priceFrom: 25000 },
      { id: 'csepp', label: 'Csepp gyűrűk', priceFrom: 25000 },
    ],
  },
  {
    id: 'emlek-gyongyok',
    label: 'Emlék gyöngyök',
    priceFrom: 15000,
  },
  {
    id: 'medalok',
    label: 'Medálok',
    priceFrom: 15000,
  },
];

export function getGalleryLeafMeta(leafId: GalleryLeafId): { label: string; priceFrom: number } {
  for (const main of galleryCategories) {
    const child = main.children?.find((entry) => entry.id === leafId);
    if (child) {
      return { label: GALLERY_LEAF_LABELS[leafId], priceFrom: child.priceFrom };
    }
    if (main.id === leafId && typeof main.priceFrom === 'number') {
      return { label: GALLERY_LEAF_LABELS[leafId], priceFrom: main.priceFrom };
    }
  }
  return { label: GALLERY_LEAF_LABELS[leafId], priceFrom: 0 };
}

function galleryGroup(
  category: GalleryLeafId,
  title: string,
  caption: string,
  alt: string,
  files: string[],
): GalleryItem[] {
  return files.map((image, index) => ({
    id: `${category}-${index + 1}`,
    title: files.length === 1 ? title : `${title} ${index + 1}`,
    caption,
    category,
    image,
    alt,
  }));
}

// PLACEHOLDER titles/captions: replace with Szabina-approved piece names before launch.
export const galleryItems: GalleryItem[] = [
  ...galleryGroup(
    'mithril',
    'Mithril gyűrű',
    'Egyedi mithril gyűrű, kézzel foglalt emlékkel.',
    'Kézzel készített mithril emlékgyűrű',
    [
      'images/gallery/gyuruk/mithril/IMG_20260605_171907.jpg',
      'images/gallery/gyuruk/mithril/IMG_20260726_122024.jpg',
      'images/gallery/gyuruk/mithril/IMG_20260726_140347.jpg',
      'images/gallery/gyuruk/mithril/IMG_20260802_001421.jpg',
      'images/gallery/gyuruk/mithril/IMG_20260802_001528.jpg',
    ],
  ),
  ...galleryGroup(
    'csepp',
    'Csepp gyűrű',
    'Csepp formájú gyűrű – egy korábbi, egyedi elkészítésű darab.',
    'Kézzel készített csepp formájú emlékgyűrű',
    [
      'images/gallery/gyuruk/csepp/IMG_20260716_180147.jpg',
      'images/gallery/gyuruk/csepp/IMG_20260716_180245.jpg',
    ],
  ),
  ...galleryGroup(
    'emlek-gyongyok',
    'Emlék gyöngy',
    'Emlék gyöngy – anyatejből vagy hajból, kézzel formázva.',
    'Kézzel készített emlék gyöngy',
    [
      'images/gallery/emlekgyongyok/IMG_20250424_141031.png',
      'images/gallery/emlekgyongyok/IMG_20250728_172208.jpg',
      'images/gallery/emlekgyongyok/IMG_20251024_144353.jpg',
      'images/gallery/emlekgyongyok/IMG_20251101_210514.jpg',
      'images/gallery/emlekgyongyok/IMG_20251101_210550.jpg',
      'images/gallery/emlekgyongyok/IMG_20260129_163445.jpg',
      'images/gallery/emlekgyongyok/IMG_20260606_235216.jpg',
      'images/gallery/emlekgyongyok/IMG_20260606_235303.jpg',
      'images/gallery/emlekgyongyok/IMG_20260607_154714.jpg',
      'images/gallery/emlekgyongyok/IMG_20260702_230040.jpg',
      'images/gallery/emlekgyongyok/IMG_20260704_223453.jpg',
      'images/gallery/emlekgyongyok/IMG_20260713_175126.jpg',
      'images/gallery/emlekgyongyok/IMG_20260718_161922.jpg',
      'images/gallery/emlekgyongyok/IMG_20260726_161505.jpg',
    ],
  ),
  ...galleryGroup(
    'medalok',
    'Medál',
    'Egyedi medál, kézzel készített emlékőrző darab.',
    'Kézzel készített emlékőrző medál',
    [
      'images/gallery/medalok/IMG_20251120_205757.jpg',
      'images/gallery/medalok/IMG_20260316_160811.jpg',
      'images/gallery/medalok/IMG_20260323_100757.jpg',
      'images/gallery/medalok/IMG_20260629_165353.jpg',
      'images/gallery/medalok/IMG_20260702_224800.jpg',
    ],
  ),
];

export interface PriceTier {
  id: string;
  name: string;
  priceFrom: number;
  blurb: string;
  includes: string[];
  accent: 'blush' | 'lavender' | 'sage';
  featured?: boolean;
}

export const priceTiers: PriceTier[] = [
  {
    id: 'p1',
    name: 'Alap Emlékőrző Medálok',
    priceFrom: 15000,
    blurb: 'A legszerényebb, mégis legőszintébb emlékőrző darabok.',
    includes: [
      'Egyedi gyanta kivitelezés',
      'Hajtincs vagy anyatej minta befoglalása',
      'Klasszikus medál vagy gyűrű forma',
      'Egyszerű, elegáns láncon',
    ],
    accent: 'blush',
  },
  {
    id: 'p2',
    name: 'Prémium Gyűrűk & Medálok',
    priceFrom: 25000,
    blurb: 'Nemes fémek és természetes szirmok, egyedi formákban.',
    includes: [
      'Arany- vagy ezüstfüstös gyanta',
      'Szárított virágszirom befoglalása',
      'Egyedi forma és méret',
      'Kézzel polírozott, fénylő felület',
      'Díszcsomagolás',
    ],
    accent: 'lavender',
    featured: true,
  },
  {
    id: 'p3',
    name: 'Egyedi Szettek',
    priceFrom: 40000,
    blurb: 'Egymáshoz illő darabok, az igazi ünnepi ajándékhoz.',
    includes: [
      'Illő medál és gyűrű szett',
      'Prémium nemesfém és szirmos kivitelezés',
      'Személyre szabott gravírozás',
      'Prémium ajándékcsomagolás kézzel',
      'Személyes átadás vagy biztos küldemény',
    ],
    accent: 'sage',
  },
];

export const contactInfo = {
  email: 'hello@emlekor-kucko.hu',
  phone: '+36 30 123 4567',
  location: 'Magyarország',
  instagram: 'https://www.instagram.com/emlekor_kucko.simonszabina/',
  facebook: 'https://www.facebook.com/profile.php?id=100091594750333',
};

// PLACEHOLDER: Replace with Szabina-approved client quotes before public launch.
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  category?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Nagyon elégedett vagyok vele, kedves precíz és alapos. Csodaszép gyűrűt és kulcstartót készített nekem anyatejjel és babahajjal ❤️',
    name: 'Alexa',
    location: 'Budapest',
    category: 'Anyatejes medál',
  },
  {
    id: 't2',
    quote:
      'Szabina gyönyörű dolgokat alkot. Csak ajánlani tudom mindenkinek,aki ilyen emléket szeretne készíttetni. Odafigyel a részletekre, alapos és körültekintő. Minden munkájába szívét és lelkét beleteszi.',
    name: 'Annamária',
    location: 'Debrecen',
    category: 'Hajas gyűrű',
  },
  {
    id: 't3',
    quote:
      'Nehéz szavakba leírni mennyire csodálatos lett a charm amit nekem készített. Szívből ajánlom mindenkinek aki precíz és tökéletes ékszert szeretne! ❤️ Külön kiemelném hogy a készítést lépésről lépésre végig kísérhettem! 🥰🌸',
    name: 'Kitti',
    location: 'Szeged',
    category: 'Kombinált szett',
  },
];

export const trustStats: { value: string; label: string }[] = [
  { value: '100%', label: 'kézi munka' },
  { value: '3+', label: 'éve emlékeket őrzök' },
  { value: '✓', label: 'Diszkrét, biztonságos feldolgozás' },
];

export interface PressItem {
  id: string;
  outlet: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
  outletLogo?: string;
  pullQuote?: string;
}

export const pressItems: PressItem[] = [
  {
    id: 'press1',
    outlet: 'Veritex.hu',
    title: 'Egyedi ajándék – az Emlékőr Kuckó ékszerei',
    date: '2025-10-27',
    excerpt:
      'A legszebb ajándékok nem a csomagolásban rejlenek, hanem az emlékekben. Az Emlékőr Kuckó arról szól, hogyan válhat egy apró ékszer az élet legfontosabb pillanatainak őrzőjévé – anyatejből és hajból készült gyanta darabokban.',
    url: 'https://www.veritex.hu/hasznos-tippek-otthonra-unnepekre-kreativ-otletek-karrierhez/unnepek-tippek-otletek/egyedi-ajandek-az-emlekor-kucko-ekszerei/',
    pullQuote:
      'Az Emlékőr Kuckó értetek van, hogy megörökítse életetek fontos pillanatait.',
  },
];

// PLACEHOLDER facts (timelines, amounts, shipping): confirm with Szabina before public launch.
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  bullets?: string[];
}

export const faqItems: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Hogyan küldhetem el az anyatejet vagy a hajtincset?',
    answer:
      'Erre egy általam kitalált, könnyen követhető rendszer van. A kapcsolatfelvétel után a minta elküldési folyamatról a csomagolási utasításokat elküldöm.',
  },
  {
    id: 'faq2',
    question: 'Mennyi anyag szükséges egy ékszerhez?',
    answer:
      'Kevesebb is elég, mint sokan gondolják – a pontos mennyiség a formától függ. Tájékoztatóan:',
    bullets: [
      'Medál: néhány csepp anyatej vagy egy apró hajtincs',
      'Gyűrű: hasonlóan kevés minta, a mérettől függően',
      'Nyaklánc / több darab: egyeztetünk, hogy mindenhova jusson',
    ],
  },
  {
    id: 'faq3',
    question: 'Mennyi idő az elkészítés?',
    answer:
      'Először egyeztetünk az elképzelésedről, majd a minta megérkezése után általában 2–4 hét az elkészítés. Ünnepi időszakban vagy összetettebb daraboknál ez hosszabb lehet – a várható időpontot mindig előre megbeszéljük.',
  },
  {
    id: 'faq5',
    question: 'Egyedi az ékszer, vagy van sablon?',
    answer:
      'Minden darab egyedi. A galéria inspiráció: abból kiindulva közösen alakítjuk ki a formát, a színeket és a részleteket. Két egyforma ékszer sosem készül – a tied a te történetedre születik.',
  },
  {
    id: 'faq6',
    question: 'Milyen formákat és anyagokat választhatok?',
    answer:
      '',
      bullets: [
        'Forma: A formákról a galériában megtalálod a lehetőségeket.',
        'Anyag: Nemesacéllal illetve ezüst tartalmú ötvözetekkel dolgozom.',
      ],
  },
  {
    id: 'faq7',
    question: 'Mennyibe kerül egy ékszer?',
    answer:
      'Az egyes ékszerek árairól a galériában tájékozódhatsz.',
  },
  {
    id: 'faq8',
    question: 'Tudok ajándékba rendelni?',
    answer:
      'Igen. A kézbesítés lehetőségeiről a konzultáción részletesen beszélünk.'
  },
];
