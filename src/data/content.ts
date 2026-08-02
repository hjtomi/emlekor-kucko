export type GalleryCategory = 'anyatej' | 'hajtincs' | 'kombinált';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  image: string;
  alt: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Anyatej és Arany Füstlemez Medál',
    caption: 'Az első csepp anyatej, arany füsttel ölelve – egy életre szóló emlék.',
    category: 'anyatej',
    image:
      'https://images.pexels.com/photos/8895530/pexels-photo-8895530.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gyanta medál anyatej és arany füstlemezzel',
  },
  {
    id: 'g2',
    title: 'Gyermekhaj Tincs Gyűrű',
    caption: 'Egy apró tincs, örökre befoglalva – a legfinomabb kéz nyomán.',
    category: 'hajtincs',
    image:
      'https://images.pexels.com/photos/8895651/pexels-photo-8895651.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gyanta gyűrű gyermekhaj tincsével',
  },
  {
    id: 'g3',
    title: 'Anyatej Gyöngy Nyaklánc',
    caption: 'Gyöngyszerű anyatej csepp, antik ezüst láncon.',
    category: 'anyatej',
    image:
      'https://images.pexels.com/photos/8929952/pexels-photo-8929952.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Anyatej gyöngy nyaklánc',
  },
  {
    id: 'g4',
    title: 'Haj és Virágszirom Medál',
    caption: 'Csecsemőhaj és szárított szirmok – a természet és az emlék együtt.',
    category: 'kombinált',
    image:
      'https://images.pexels.com/photos/8895536/pexels-photo-8895536.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gyanta medál hajjal és szárított virágszirommal',
  },
  {
    id: 'g5',
    title: 'Arany Füstös Anyatej Karkötő',
    caption: 'Anyatej gyöngyök arany füsttel – diszkrét, mégis ünnepi ékszer.',
    category: 'anyatej',
    image:
      'https://images.pexels.com/photos/8895541/pexels-photo-8895541.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gyanta karkötő anyatejjel és arany füsttel',
  },
  {
    id: 'g6',
    title: 'Első Tincs Fülbevaló Pár',
    caption: 'Az első hajtincs két apró cseppben – anyának és gyermeknek.',
    category: 'hajtincs',
    image:
      'https://images.pexels.com/photos/8895648/pexels-photo-8895648.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gyanta fülbevaló hajtincsével',
  },
  {
    id: 'g7',
    title: 'Anyatej és Haj Emléköves Szett',
    caption: 'Anyatej gyöngy és hajtincs egy medálban – a teljes emlék együtt.',
    category: 'kombinált',
    image:
      'https://images.pexels.com/photos/8929955/pexels-photo-8929955.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Kombinált gyanta ékszersett anyatejjel és hajjal',
  },
  {
    id: 'g8',
    title: 'Levendulás Hajtincs Medál',
    caption: 'Hajtincs és szárított levendula – nyugalom és emlék együtt.',
    category: 'kombinált',
    image:
      'https://images.pexels.com/photos/8895545/pexels-photo-8895545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gyanta medál hajtincsével és levendulával',
  },
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
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
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
      'Amikor megkaptam a medált, sírtam. Pontosan olyan lett, amilyennek elképzeltem – finom, diszkrét, és mintha egy darabka a kislányomból lenne velem minden nap.',
    name: 'Kata',
    location: 'Budapest',
    category: 'Anyatejes medál',
  },
  {
    id: 't2',
    quote:
      'Féltem elküldeni az első hajtincset, de Szabina végig nyugodt volt, mindent elmagyarázott. A gyűrű gyönyörű, és örökre megmarad az emlék.',
    name: 'Eszter',
    location: 'Debrecen',
    category: 'Hajas gyűrű',
  },
  {
    id: 't3',
    quote:
      'Ajándékba rendeltem anyukámnak – a csomagolás is gyönyörű volt. Látszik, hogy szívvel-lélekkel készül minden darab, nem csak egy ékszer.',
    name: 'Anna',
    location: 'Szeged',
    category: 'Kombinált szett',
  },
];

export const trustStats: { value: string; label: string }[] = [
  { value: '100%', label: 'kézi munka' },
  { value: '6+', label: 'éve emlékeket őrzök' },
  { value: '✓', label: 'Diszkrét, biztonságos feldolgozás' },
];
