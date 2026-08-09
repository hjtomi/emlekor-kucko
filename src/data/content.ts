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
      'images/gallery/gallery-01.jfif',
    alt: 'Gyanta medál anyatej és arany füstlemezzel',
  },
  {
    id: 'g2',
    title: 'Gyermekhaj Tincs Gyűrű',
    caption: 'Egy apró tincs, örökre befoglalva – a legfinomabb kéz nyomán.',
    category: 'hajtincs',
    image:
      'images/gallery/gallery-02.jfif',
    alt: 'Gyanta gyűrű gyermekhaj tincsével',
  },
  {
    id: 'g3',
    title: 'Anyatej Gyöngy Nyaklánc',
    caption: 'Gyöngyszerű anyatej csepp, antik ezüst láncon.',
    category: 'anyatej',
    image:
      'images/gallery/gallery-03.jfif',
    alt: 'Anyatej gyöngy nyaklánc',
  },
  {
    id: 'g4',
    title: 'Haj és Virágszirom Medál',
    caption: 'Csecsemőhaj és szárított szirmok – a természet és az emlék együtt.',
    category: 'kombinált',
    image:
      'images/gallery/gallery-04.jfif',
    alt: 'Gyanta medál hajjal és szárított virágszirommal',
  },
  {
    id: 'g5',
    title: 'Arany Füstös Anyatej Karkötő',
    caption: 'Anyatej gyöngyök arany füsttel – diszkrét, mégis ünnepi ékszer.',
    category: 'anyatej',
    image:
      'images/gallery/gallery-05.jfif',
    alt: 'Gyanta karkötő anyatejjel és arany füsttel',
  },
  {
    id: 'g6',
    title: 'Első Tincs Fülbevaló Pár',
    caption: 'Az első hajtincs két apró cseppben – anyának és gyermeknek.',
    category: 'hajtincs',
    image:
      'images/gallery/gallery-06.jfif',
    alt: 'Gyanta fülbevaló hajtincsével',
  },
  {
    id: 'g7',
    title: 'Anyatej és Haj Emléköves Szett',
    caption: 'Anyatej gyöngy és hajtincs egy medálban – a teljes emlék együtt.',
    category: 'kombinált',
    image:
      'images/gallery/gallery-07.jfif',
    alt: 'Kombinált gyanta ékszersett anyatejjel és hajjal',
  },
  {
    id: 'g8',
    title: 'Levendulás Hajtincs Medál',
    caption: 'Hajtincs és szárított levendula – nyugalom és emlék együtt.',
    category: 'kombinált',
    image:
      'images/gallery/gallery-08.jfif',
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
      'A mintát diszkrét, jól záró csomagolásban küldheted el postán vagy futárral. A részletes útmutatót a kapcsolatfelvétel után elküldöm – mit jelölj a csomagon, hogyan tartsd hűvösen az anyatejet, és hogyan óvd a hajtincset. Gondosan kezelem minden küldeményt, amint megérkezik.',
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
    id: 'faq4',
    question: 'Biztonságos és higiénikus a feldolgozás?',
    answer:
      'Igen. A mintádat tisztelettel, tiszta munkaterületen, elkülönítve kezelem – ahogy azt én is elvárnám, ha a saját emlékemet bíznám másra. Minden lépést gondosan dokumentálok magamnak, hogy biztosan a te emlékeidből készüljön az ékszer.',
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
      'Gyanta alapra dolgozom, és választhatsz arany- vagy ezüstfüstöt, szárított virágszirmokat, valamint klasszikus vagy egyedi formákat. A tájékoztató áraknál (Alap, Prémium, Szett) látod, mi jár általában az egyes szintekhez – a pontos összeállítást a konzultáción rögzítjük.',
  },
  {
    id: 'faq7',
    question: 'Mennyibe kerül egy ékszer?',
    answer:
      'A weboldalon tájékoztató kezdőárakat találsz. Mivel minden darab személyre szabott, a végleges árat a konzultáció után tudom megmondani – anyag, forma és csomagolás alapján. Nincs rejtett költség: amit megbeszélünk, az lesz az ár.',
  },
  {
    id: 'faq8',
    question: 'Tudok ajándékba rendelni?',
    answer:
      'Igen, szívesen. A Prémium és Szett kategóriákban dísz- vagy prémium ajándékcsomagolás is kérhető. Ha meglepetésnek szánod, a kommunikációt és a szállítást diszkréten intézzük – a címzettnek nem derül ki előre, mi érkezik.',
  },
];
