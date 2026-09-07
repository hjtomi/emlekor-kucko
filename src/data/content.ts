export type GalleryMainId = string;
export type GalleryLeafId = string;

export interface GallerySubcategory {
  id: GalleryLeafId;
  label: string;
}

export interface GalleryMainCategory {
  id: GalleryMainId;
  label: string;
  children: GallerySubcategory[];
  emptyPrompt?: string;
}

export type GalleryFillingId = 'milk-or-hair' | 'hair' | 'fixed';
export type GalleryMetalId = 'nemesacel' | 'ezust';

export const GALLERY_FILLING_LABELS: Record<GalleryFillingId, string> = {
  'milk-or-hair': 'Anyatej és/vagy haj',
  hair: 'Csak haj',
  fixed: 'Ár',
};

export interface GalleryPriceTable {
  metals: GalleryMetalId[];
  rows: {
    filling: GalleryFillingId;
    prices: Partial<Record<GalleryMetalId, number>>;
  }[];
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
  fulbevalok: 'Fülbevaló',
  'gyuruk-allithato': 'Állítható gyűrű',
  'gyuruk-karika': 'Karika gyűrű',
  'karkoto-ferfi': 'Férfi karkötő',
  'karkoto-noi': 'Női karkötő',
  kulcstarto: 'Kulcstartó',
  'kulcstarto-ferfi': 'Férfi kulcstartó',
  'dns-mentes-emlek-gyongy': 'DNS mentes emlék gyöngy',
  'dns-mentes-karkoto': 'Anya-gyermek karkötő',
  ajandekutalvanyok: 'Ajándékutalvány',
};

export const galleryCategories: GalleryMainCategory[] = [
  {
    id: 'ezust-otvozet',
    label: 'Ezüst tartalmú ötvözetből készült emlékőr ékszerek',
    emptyPrompt:
      'Válaszd ki a gyűrű típusát — Mithril gyűrűk vagy Csepp gyűrűk —, hogy lásd a darabokat és az árakat.',
    children: [
      { id: 'mithril', label: 'Mithril gyűrűk' },
      { id: 'csepp', label: 'Csepp gyűrűk' },
    ],
  },
  {
    id: 'nemesacel',
    label: 'Nemesacélból készült emlékőr ékszerek',
    emptyPrompt: 'Válaszd ki a típust, hogy lásd a darabokat és az árakat.',
    children: [
      { id: 'emlek-gyongyok', label: 'Emlék gyöngyök' },
      { id: 'medalok', label: 'Medálok' },
      { id: 'fulbevalok', label: 'Fülbevalók' },
      { id: 'gyuruk-allithato', label: 'Gyűrű (állítható méretű)' },
      { id: 'gyuruk-karika', label: 'Gyűrűk (karika)' },
      { id: 'karkoto-ferfi', label: 'Paracord férfi karkötő 1 db DNS gyönggyel' },
      { id: 'karkoto-noi', label: 'Paracord női karkötő tányéros alappal' },
      { id: 'kulcstarto', label: 'Kulcstartó' },
      { id: 'kulcstarto-ferfi', label: 'Férfi kulcstartó' },
    ],
  },
  {
    id: 'dns-mentes',
    label: 'DNS mentes ékszerek / emlékőrök',
    emptyPrompt:
      'Válaszd ki a típust — DNS mentes emlék gyöngy vagy paracord női karkötő —, hogy lásd a darabokat és az árakat.',
    children: [
      { id: 'dns-mentes-emlek-gyongy', label: 'DNS mentes emlék gyöngy (charm)' },
      { id: 'dns-mentes-karkoto', label: 'Paracord női karkötő anya-gyermek köztessel' },
    ],
  },
  {
    id: 'ajandekutalvanyok',
    label: 'Ajándékutalványok',
    emptyPrompt: 'Válassz egy kategóriát, hogy megtekinthesd a képeket és az árakat.',
    children: [{ id: 'ajandekutalvanyok', label: 'Ajándékutalványok' }],
  },
];

export interface GalleryLeafDescription {
  heading: string;
  paragraphs: string[];
  quote?: string;
  specs: string[];
  contactNote?: string;
}

export const galleryLeafDescriptions: Record<GalleryLeafId, GalleryLeafDescription> = {
  mithril: {
    heading: 'A Mithril Emlék gyűrű',
    paragraphs: [
      'A Mithril szó jelentése ritka és értékes, mint az a pillanat, amire ezt a gyűrűt terveztem, hogy méltó őrzője lehessen egy Anyatejkőnek, vagy egy apró tincs baba hajnak, mert bár könnyűnek tűnik, de benne van az az elpusztíthatatlan erő, ami csak egy Anyát és gyermekét kötheti össze.',
      'Ezüst tartalmú ötvözetből készült gyűrű, aminek a nevében is benne van, hogy ezüstből készült 800-as alatti ötvözetszámból.',
    ],
    specs: [
      'Méretre készül, 50-estől 59-es méretig rendelhető!',
      'Foglalat mérete: 6 mm.',
    ],
    contactNote: 'A személyre szabás érdekében mindenképp vedd fel velem a kapcsolatot.',
  },
  csepp: {
    heading: 'Csepp gyűrű',
    quote: 'Egy csepp Anyatej, hogy sose felejtsd el hogy milyen erő lakozik benned.',
    paragraphs: [
      'Ezüst tartalmú ötvözetből készült gyűrű, aminek a nevében is benne van, hogy ezüstből készült 800-as alatti ötvözetszámból.',
    ],
    specs: [
      'Méretre készül, 50-estől 59-es méretig rendelhető!',
      'Foglalat mérete: 6×8 mm.',
    ],
  },
  'emlek-gyongyok': {
    heading: 'Emlék gyöngyök',
    paragraphs: [
      'Nemes acél gyöngybetéttel ellátva (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
    ],
    specs: ['Furat átmérője 5 mm, Pandora karkötővel kompatibilis.'],
    contactNote: 'A személyre szabás miatt mindenképp vedd fel velem a kapcsolatot.',
  },
  medalok: {
    heading: 'Medálok',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával és mérettel dolgozom, ezt a személyre szabásnál egyeztetjük.',
    ],
    specs: [],
  },
  fulbevalok: {
    heading: 'Fülbevalók',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával és mérettel dolgozom, ezt a személyre szabásnál egyeztetjük. Francia kapcsos és bedugós változatban is elérhető.',
    ],
    specs: [],
  },
  'gyuruk-allithato': {
    heading: 'Gyűrű (állítható méretű)',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával dolgozom, ezt a személyre szabásnál egyeztetjük.',
    ],
    specs: [],
  },
  'gyuruk-karika': {
    heading: 'Gyűrűk (karika)',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle típussal és mérettel dolgozom. A méret ebben az esetben fix, próba szükséges az emlékőr elkészítése előtt.',
    ],
    specs: [],
    contactNote: 'Vedd fel velem a kapcsolatot a részletek egyeztetése miatt.',
  },
  'karkoto-ferfi': {
    heading: 'Paracord férfi karkötő 1 db DNS gyönggyel',
    paragraphs: [
      'Nemes acél csattal készült a karkötő a biztonságos viselés érdekében, illetve a benne lévő emlék gyöngy is nemes acél gyöngy betéttel készül (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
    ],
    specs: [
      'A gyöngy átmérője 14 mm, a paracord zsinór fonva 16 mm széles, 4 mm vastag.',
      'Méretre készül!',
    ],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
  },
  'karkoto-noi': {
    heading: 'Paracord női karkötő tányéros alappal',
    paragraphs: [
      'Nemes acél csattal készült a karkötő a biztonságos viselés érdekében, illetve a tányéros alapok is nemes acélból készültek (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle színű zsinórral és tányéros alappal dolgozom.',
    ],
    specs: ['Méretre készül!'],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
  },
  kulcstarto: {
    heading: 'Kulcstartó',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával és mérettel dolgozom, ezt a személyre szabásnál egyeztetjük.',
    ],
    specs: [],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
  },
  'kulcstarto-ferfi': {
    heading: 'Férfi kulcstartó',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Fekete és barna bőr kulcstartó alappal választható, kör és téglalap formában.',
    ],
    specs: [],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
  },
  'dns-mentes-emlek-gyongy': {
    heading: 'DNS mentes emlék gyöngy (charm)',
    paragraphs: [
      'Nemes acél gyöngybetéttel ellátva (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
    ],
    specs: ['Furat átmérője 5 mm, Pandora karkötővel kompatibilis.'],
    contactNote: 'A személyre szabáshoz kérlek vedd fel velem a kapcsolatot!',
  },
  'dns-mentes-karkoto': {
    heading: 'Paracord női karkötő anya-gyermek köztessel',
    paragraphs: [
      'Nemes acél csattal készült a karkötő a biztonságos viselés érdekében (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik. Ezüst színű cirkónia köves anya-gyermek kapcsoló elemmel, ami ezüst színű bronzból készült.',
    ],
    specs: ['Mérete: 23×24 mm'],
  },
  ajandekutalvanyok: {
    heading: 'Ajándékutalványok',
    paragraphs: [
      'Ha kész ékszer helyett választást szeretnél ajándékozni, ajándékutalvánnyal is készülök.',
    ],
    specs: [],
    contactNote: 'Az összeg és a részletek egyeztetése miatt vedd fel velem a kapcsolatot.',
  },
};

export interface GalleryPriceExtra {
  label: string;
  amount: number;
  unit?: 'hour' | 'flat';
}

export const galleryPriceExtras: GalleryPriceExtra[] = [
  { label: 'Hajjal rajzolás', amount: 4500, unit: 'hour' },
  { label: 'Hajjal betűrajzolás', amount: 3000, unit: 'hour' },
];

export const galleryLeafExtras: Partial<Record<GalleryLeafId, GalleryPriceExtra[]>> = {
  'emlek-gyongyok': [{ label: 'Feles öntés', amount: 4000, unit: 'flat' }],
};

export const galleryPrioritySurcharge =
  'Elsőbbségi (sürgős) elkészítés: az adott termék értékének +30%-a';

export function allowsPrioritySurcharge(leafId: GalleryLeafId): boolean {
  if (leafId === 'ajandekutalvanyok') return false;
  const ezust = galleryCategories.find((category) => category.id === 'ezust-otvozet');
  return !ezust?.children.some((child) => child.id === leafId);
}

export const galleryPrices: Record<GalleryLeafId, GalleryPriceTable> = {
  mithril: {
    metals: ['ezust'],
    rows: [
      { filling: 'milk-or-hair', prices: { ezust: 45000 } },
      { filling: 'hair', prices: { ezust: 38000 } },
    ],
  },
  csepp: {
    metals: ['ezust'],
    rows: [
      { filling: 'milk-or-hair', prices: { ezust: 40000 } },
      { filling: 'hair', prices: { ezust: 35000 } },
    ],
  },
  'emlek-gyongyok': {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 28000 } },
      { filling: 'hair', prices: { nemesacel: 19000 } },
    ],
  },
  medalok: {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 29000 } },
      { filling: 'hair', prices: { nemesacel: 20000 } },
    ],
  },
  fulbevalok: {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 26000 } },
      { filling: 'hair', prices: { nemesacel: 18000 } },
    ],
  },
  'gyuruk-allithato': {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 26000 } },
      { filling: 'hair', prices: { nemesacel: 18000 } },
    ],
  },
  'gyuruk-karika': {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 29000 } },
      { filling: 'hair', prices: { nemesacel: 21000 } },
    ],
  },
  'karkoto-ferfi': {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 31000 } },
      { filling: 'hair', prices: { nemesacel: 22000 } },
    ],
  },
  'karkoto-noi': {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 32000 } },
      { filling: 'hair', prices: { nemesacel: 23000 } },
    ],
  },
  kulcstarto: {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 30000 } },
      { filling: 'hair', prices: { nemesacel: 21000 } },
    ],
  },
  'kulcstarto-ferfi': {
    metals: ['nemesacel'],
    rows: [
      { filling: 'milk-or-hair', prices: { nemesacel: 30000 } },
      { filling: 'hair', prices: { nemesacel: 22000 } },
    ],
  },
  'dns-mentes-emlek-gyongy': {
    metals: ['nemesacel'],
    rows: [{ filling: 'fixed', prices: { nemesacel: 17000 } }],
  },
  'dns-mentes-karkoto': {
    metals: ['nemesacel'],
    rows: [{ filling: 'fixed', prices: { nemesacel: 9000 } }],
  },
  ajandekutalvanyok: {
    metals: [],
    rows: [],
  },
};

export function getGalleryLeafMeta(leafId: GalleryLeafId): { label: string } {
  return { label: GALLERY_LEAF_LABELS[leafId] };
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
    image: encodeURI(image),
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
      'images/gallery/medalok/1000032642.jpg',
      'images/gallery/medalok/1000032644.jpg',
      'images/gallery/medalok/1000034563.jpg',
      'images/gallery/medalok/IMG_20250511_103604.png',
      'images/gallery/medalok/IMG_20250906_141838.jpg',
      'images/gallery/medalok/IMG_20251024_133847.jpg',
      'images/gallery/medalok/IMG_20251120_205757.jpg',
      'images/gallery/medalok/IMG_20251207_155543.jpg',
      'images/gallery/medalok/IMG_20251214_153403.jpg',
      'images/gallery/medalok/IMG_20260103_135359.jpg',
      'images/gallery/medalok/IMG_20260316_160811.jpg',
      'images/gallery/medalok/IMG_20260323_100757.jpg',
      'images/gallery/medalok/IMG_20260629_165353.jpg',
      'images/gallery/medalok/IMG_20260702_224800.jpg',
    ],
  ),
  ...galleryGroup(
    'fulbevalok',
    'Fülbevaló',
    'Egyedi fülbevaló, kézzel készített emlékőrző darab.',
    'Kézzel készített emlékőrző fülbevaló',
    [
      'images/gallery/fulbevalok/IMG_20250312_182400 (2).png',
      'images/gallery/fulbevalok/IMG_20250718_221402 (1).jpg',
      'images/gallery/fulbevalok/IMG_20260629_165846.jpg',
      'images/gallery/fulbevalok/Photo_1734006800573.jpg',
    ],
  ),
  ...galleryGroup(
    'gyuruk-allithato',
    'Állítható gyűrű',
    'Nemesacél állítható gyűrű – egy korábbi, egyedi elkészítésű darab.',
    'Kézzel készített állítható emlékgyűrű',
    [
      'images/gallery/gyuruk_allithato/IMG_20260502_194716.jpg',
      'images/gallery/gyuruk_allithato/IMG_20260511_133659.jpg',
      'images/gallery/gyuruk_allithato/IMG_20260626_131055.jpg',
      'images/gallery/gyuruk_allithato/IMG_20260629_165432.jpg',
      'images/gallery/gyuruk_allithato/Photo_1707584687973.jpg',
    ],
  ),
  ...galleryGroup(
    'gyuruk-karika',
    'Karika gyűrű',
    'Nemesacél karika gyűrű – egy korábbi, egyedi elkészítésű darab.',
    'Kézzel készített karika emlékgyűrű',
    [
      'images/gallery/gyuruk_karika/IMG_20250618_213520 (1).jpg',
      'images/gallery/gyuruk_karika/IMG_20250731_202741 (1).jpg',
      'images/gallery/gyuruk_karika/IMG_20250731_203101 (1).jpg',
      'images/gallery/gyuruk_karika/IMG_20251219_184821 (2).jpg',
      'images/gallery/gyuruk_karika/IMG_20260219_165918.jpg',
      'images/gallery/gyuruk_karika/IMG_20260225_181655.jpg',
      'images/gallery/gyuruk_karika/IMG_20260316_161850.jpg',
      'images/gallery/gyuruk_karika/IMG_20260511_230304_1.jpg',
    ],
  ),
  ...galleryGroup(
    'karkoto-ferfi',
    'Férfi karkötő',
    'Paracord férfi karkötő DNS gyönggyel, kézzel készítve.',
    'Kézzel készített paracord férfi emlék karkötő',
    [
      'images/gallery/karkoto_ferfi/1767646305357.jpg',
      'images/gallery/karkoto_ferfi/1771146711390.jpg',
      'images/gallery/karkoto_ferfi/IMG_20250906_142640.jpg',
      'images/gallery/karkoto_ferfi/IMG_20251011_142231.jpg',
      'images/gallery/karkoto_ferfi/IMG_20251025_134220.jpg',
      'images/gallery/karkoto_ferfi/IMG_20251208_175905.jpg',
      'images/gallery/karkoto_ferfi/IMG_20260614_120935.jpg',
      'images/gallery/karkoto_ferfi/IMG_20260704_223811.jpg',
    ],
  ),
  ...galleryGroup(
    'karkoto-noi',
    'Női karkötő',
    'Paracord női karkötő tányéros alappal, kézzel készítve.',
    'Kézzel készített paracord női emlék karkötő',
    [
      'images/gallery/karkoto_noi/IMG_20250520_123103.png',
      'images/gallery/karkoto_noi/IMG_20250618_212105 (1).jpg',
      'images/gallery/karkoto_noi/IMG_20251011_141614.jpg',
      'images/gallery/karkoto_noi/IMG_20251021_074609.jpg',
      'images/gallery/karkoto_noi/IMG_20251203_185802.jpg',
      'images/gallery/karkoto_noi/IMG_20260201_165540.jpg',
      'images/gallery/karkoto_noi/IMG_20260423_172304.jpg',
      'images/gallery/karkoto_noi/IMG_20260617_105646.jpg',
      'images/gallery/karkoto_noi/IMG_20260619_094205.jpg',
    ],
  ),
  ...galleryGroup(
    'kulcstarto',
    'Kulcstartó',
    'Egyedi kulcstartó, kézzel készített emlékőrző darab.',
    'Kézzel készített emlékőrző kulcstartó',
    [
      'images/gallery/kulcstarto/IMG_20250424_134154.png',
      'images/gallery/kulcstarto/IMG_20250828_164840.jpg',
      'images/gallery/kulcstarto/IMG_20260316_161413.jpg',
      'images/gallery/kulcstarto/IMG_20260407_161634.jpg.jpg',
      'images/gallery/kulcstarto/IMG_20260702_225636.jpg',
      'images/gallery/kulcstarto/Photo_1734006412463.jpg',
    ],
  ),
  ...galleryGroup(
    'kulcstarto-ferfi',
    'Férfi kulcstartó',
    'Bőr alapú férfi kulcstartó, kézzel készített emlékőrző darab.',
    'Kézzel készített férfi emlékőrző kulcstartó',
    [
      'images/gallery/kulcstarto_ferfi/1000034029.jpg',
      'images/gallery/kulcstarto_ferfi/1000034561.jpg',
      'images/gallery/kulcstarto_ferfi/IMG_20260201_105515.jpg',
      'images/gallery/kulcstarto_ferfi/IMG_20260407_161511.jpg.jpg',
      'images/gallery/kulcstarto_ferfi/IMG_20260528_072308.jpg',
      'images/gallery/kulcstarto_ferfi/IMG_20260528_100011.jpg',
    ],
  ),
  ...galleryGroup(
    'dns-mentes-emlek-gyongy',
    'DNS mentes emlék gyöngy',
    'DNS mentes emlék gyöngy – kézzel formázva.',
    'Kézzel készített DNS mentes emlék gyöngy',
    [
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250731_111152 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250731_111342 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250731_111509 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250731_111750 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250817_161346 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250817_161427 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250817_161515 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250914_143131.jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250914_143214.jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20250914_143324.jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20251002_162510 (1).jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20260604_100840.jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20260604_100923.jpg',
      'images/gallery/dnsmentes_emlekgyongy/IMG_20260604_101000.jpg',
    ],
  ),
  ...galleryGroup(
    'dns-mentes-karkoto',
    'Anya-gyermek karkötő',
    'Paracord női karkötő anya-gyermek köztessel, kézzel készítve.',
    'Kézzel készített paracord női karkötő anya-gyermek köztessel',
    [
      'images/gallery/dnsmentes_karkoto/IMG_20250313_165230.png',
      'images/gallery/dnsmentes_karkoto/IMG_20250314_152613.png',
      'images/gallery/dnsmentes_karkoto/IMG_20250315_131157.png',
    ],
  ),
  ...galleryGroup(
    'ajandekutalvanyok',
    'Ajándékutalvány',
    'Ajándékutalvány az Emlékőr Kuckó ékszereire.',
    'Emlékőr Kuckó ajándékutalvány',
    [
      'images/gallery/ajandekutalvany/Beige and Pink Simple Watercolor Floral Gift Certificate _20250919_140103_0000.jpg',
      'images/gallery/ajandekutalvany/Beige and Pink Simple Watercolor Floral Gift Certificate _20251120_095547_0000.jpg',
    ],
  ),
];

export const contactInfo = {
  email: 'hello@emlekor-kucko.hu',
  phone: '+36 30 605 82 86',
  headquarters: '3300 Eger, Deák Ferenc utca 80. as 4.',
  mailingAddress: '3398 Nagytálya, Váci Mihály utca 10.',
  location: 'Magyarország',
  instagram: 'https://www.instagram.com/emlekor_kucko.simonszabina/',
  facebook: 'https://www.facebook.com/profile.php?id=100091594750333',
};

// PLACEHOLDER: Replace with Szabina-approved client quotes before public launch.
export interface TestimonialPiece {
  image: string;
  label: string;
  alt: string;
  fit?: 'cover' | 'contain';
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  pieces: TestimonialPiece[];
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Nagyon elégedett vagyok vele, kedves precíz és alapos. Csodaszép gyűrűt és kulcstartót készített nekem anyatejjel és babahajjal ❤️',
    name: 'Alexa',
    location: 'Miskolc',
    pieces: [
      {
        image: 'images/trust/Alexa2.jpg',
        label: 'Gyűrű',
        alt: 'Alexa szív alakú emlékgyűrűje',
      },
      {
        image: 'images/trust/Alexa1.jpg',
        label: 'Kulcstartó',
        alt: 'Alexa bőr emlék kulcstartója',
      },
    ],
  },
  {
    id: 't2',
    quote:
      'Szabina gyönyörű dolgokat alkot. Csak ajánlani tudom mindenkinek,aki ilyen emléket szeretne készíttetni. Odafigyel a részletekre, alapos és körültekintő. Minden munkájába szívét és lelkét beleteszi.',
    name: 'Annamária',
    location: 'Debrecen',
    pieces: [
      {
        image: 'images/trust/Annamária.jpg',
        label: 'Medál',
        alt: 'Annamária kerek emlékmedálja, hajból formált szívvel és virágokkal',
      },
    ],
  },
  {
    id: 't3',
    quote:
      'Nehéz szavakba leírni mennyire csodálatos lett a charm amit nekem készített. Szívből ajánlom mindenkinek aki precíz és tökéletes ékszert szeretne! ❤️ Külön kiemelném hogy a készítést lépésről lépésre végig kísérhettem! 🥰🌸',
    name: 'Kitti',
    location: 'Szeged',
    pieces: [
      {
        image: 'images/trust/Kitti.jpg',
        label: 'Charm',
        alt: 'Kitti életfa mintás emlékcharmjai, hajjal és virágokkal',
        fit: 'contain',
      },
    ],
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
      'Először egyeztetünk az elképzelésedről, majd a minta megérkezése után általában 2–4 hét az elkészítés. Ünnepi időszakban vagy összetettebb daraboknál ez hosszabb lehet – a várható időpontot mindig előre megbeszéljük. Ha ennél hamarabb kell: Elsőbbségi (sürgős) elkészítés: az adott termék értékének +30%-a. Ezüst tartalmú ötvözetből készült ékszereknél sürgősségi elkészítés nem kérhető.',
  },
  {
    id: 'faq5',
    question: 'Egyedi az ékszer, vagy van sablon?',
    answer:
      'Minden darab egyedi. Az Árak és galéria szekció inspiráció: abból kiindulva közösen alakítjuk ki a formát, a színeket és a részleteket. Két egyforma ékszer sosem készül – a tied a te történetedre születik.',
  },
  {
    id: 'faq6',
    question: 'Milyen formákat és anyagokat választhatok?',
    answer:
      '',
      bullets: [
        'Forma: A formákról az Árak és galéria szekcióban megtalálod a lehetőségeket.',
        'Anyag: Nemesacéllal illetve ezüst tartalmú ötvözetekkel dolgozom. A Mithril és Csepp gyűrűk ezüst tartalmú ötvözetből, a többi emlékőr ékszer nemesacélból készül. DNS mentes darabok és ajándékutalványok is elérhetők.',
      ],
  },
  {
    id: 'faq7',
    question: 'Mennyibe kerül egy ékszer?',
    answer:
      'Az egyes ékszerek árairól az Árak és galéria szekcióban tájékozódhatsz.',
  },
  {
    id: 'faq8',
    question: 'Tudok ajándékba rendelni?',
    answer:
      'Igen. Ajándékutalvány is kérhető, a kézbesítés lehetőségeiről a konzultáción részletesen beszélünk.'
  },
];

export interface ContactStep {
  num: string;
  title: string;
  text: string;
}

export const contactSteps: ContactStep[] = [
  {
    num: '01',
    title: 'Kapcsolatfelvétel & megbeszélés',
    text: 'Üzenj nekem Facebookon vagy Instagramon, és átbeszéljük az elképzelésedet.',
  },
  {
    num: '02',
    title: 'A minta biztonságos elküldése',
    text: 'A kapcsolatfelvétel után mindenről részletesen tájékoztatlak. Küldök majd csomagolási utasítást, hogy mit és hogyan kell összekészítened és feladnod nekem.',
  },
  {
    num: '03',
    title: 'Az ékszer elkészítése szeretettel',
    text: 'Gondos kézi munkával elkészítem a te egyedi emlékőrző ékszeredet.',
  },
];

export type AboutValueIcon = 'heart' | 'leaf' | 'sparkles';

export interface AboutValue {
  icon: AboutValueIcon;
  title: string;
  text: string;
}

export interface AboutStorySection {
  heading?: string;
  paragraphs: string[];
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  tagline: string;
  portrait: { image: string; alt: string };
  founderBadge: string;
  introParagraphs: string[];
  values: AboutValue[];
  storySections: AboutStorySection[];
  closingQuote: string;
}

export const aboutContent: AboutContent = {
  eyebrow: 'Rólam',
  heading: 'Simon Szabina',
  tagline: 'A kéz, amely emléket őriz',
  portrait: {
    image: '/images/Szabina.jpg',
    alt: 'Simon Szabina, az Emlékőr Kuckó alapítója, miközben egy gyanta ékszert készít',
  },
  founderBadge: 'Emlékőr Kuckó · alapító',
  introParagraphs: [
    'Sziasztok!',
    'Simon Szabinának hívnak, két csodálatos gyermek Édesanyja vagyok, és az Emlékőr kuckó megálmodója, alapítója. Szabadidőmben szeretek a családommal és a barátaimmal lenni, koncertekre járni, olvasni, és motorozni.',
  ],
  values: [
    {
      icon: 'heart',
      title: 'Gondos kezek',
      text: 'Szívvel, lélekkel, a legnagyobb odafigyeléssel.',
    },
    {
      icon: 'leaf',
      title: 'Minőségi anyagok',
      text: 'Időt álló nemesacél ékszer alapokkal, minőségi gyantával, és ezüst tartalmú ötvözetből.',
    },
    {
      icon: 'sparkles',
      title: 'Egyedi alkotás',
      text: 'Két egyforma darab sosem készül – minden ékszer a te történetedre születik.',
    },
  ],
  storySections: [
    {
      heading: 'Hogy is született meg az Emlékőr kuckó?!',
      paragraphs: [
        'Amikor másodjára is Anya lettem, ott fogott el az az érzés, hogy milyen gyorsan repül az idő a gyerekek mellett, szerettem volna ezt a kezdeti bár nehéz, de csodálatos pillanatot örökre megtartani.',
      ],
    },
    {
      heading: 'Az epoxy gyanta',
      paragraphs: [
        'Szembejött velem az emlékőrző ékszerek készítése, egyvalami különösen felkeltette az érdeklődésem az elkészítésükkel kapcsolatosan, az epoxy gyanta. Már régóta szemezgettem ezzel az anyaggal, sok szép dolgot láttam, amit ebből készítettek, és elkezdett foglalkoztatni ez az egész ékszerkészítés.',
      ],
    },
    {
      heading: 'Az anyatej tartósítása',
      paragraphs: [
        'Egyre jobban elkezdtem belemerülni, utánajárni dolgoknak, sokat kísérletezni mind az alapanyagokkal, mint pedig az anyatej tartósításával kapcsolatban. Ebben az esetben sok más alkotóhoz képest én egy olyan tartósítási eljárást fejlesztettem ki aminél maga az anyatej folyékony formában kerül bele az epoxy gyantába, ezzel megörökítve neked ezt a csodálatos időszakot.',
      ],
    },
    {
      heading: 'Hajból rajzolás',
      paragraphs: [
        'A hajból rajzolásnál is mindig próbáltam minél több újabb dolgot kipróbálni, hogy ráérezzek mi is ami az én stílusom lesz. Igyekszem amennyire lehet ebben a szakmában egyedi lenni, és veletek együtt megálmodni, ékszerbe zárni azokat a történeteket amelyekkel megkerestek.',
      ],
    },
    {
      paragraphs: [
        'Minden egyes hozzám beérkezett dns csomaggal úgy bánok, mintha csak a sajátom lenne, szeretettel, odafigyeléssel a tudásom szerinti legjobb kézügyességgel elkészíteni.',
        'Hogy mit hoz a jövő a kuckó életében, azt nem tudhatom, de amíg bírom, amíg hajt az a valami legbelül veletek együtt csinálom. :)',
      ],
    },
  ],
  closingQuote: '„Az Emlékőr kuckó értetek van, hogy megörökítse életetek fontos pillanatait.”',
};

export interface SiteContent {
  galleryCategories: GalleryMainCategory[];
  galleryItems: GalleryItem[];
  galleryPrices: Record<string, GalleryPriceTable>;
  galleryPriceExtras: GalleryPriceExtra[];
  galleryLeafExtras: Partial<Record<string, GalleryPriceExtra[]>>;
  galleryPrioritySurcharge: string;
  galleryLeafDescriptions: Record<string, GalleryLeafDescription>;
  galleryLeafLabels: Record<string, string>;
  fillingLabels: Record<GalleryFillingId, string>;
  allowsPriorityByLeaf: Record<string, boolean>;
  testimonials: Testimonial[];
  trustStats: { value: string; label: string }[];
  faqItems: FAQItem[];
  pressItems: PressItem[];
  contactInfo: typeof contactInfo;
  contactSteps: ContactStep[];
  about: AboutContent;
}

function buildAllowsPriorityByLeaf(): Record<string, boolean> {
  return Object.fromEntries(
    Object.keys(GALLERY_LEAF_LABELS).map((leafId) => [leafId, allowsPrioritySurcharge(leafId)]),
  );
}

export const fallbackSiteContent: SiteContent = {
  galleryCategories,
  galleryItems,
  galleryPrices,
  galleryPriceExtras,
  galleryLeafExtras,
  galleryPrioritySurcharge,
  galleryLeafDescriptions,
  galleryLeafLabels: GALLERY_LEAF_LABELS,
  fillingLabels: GALLERY_FILLING_LABELS,
  allowsPriorityByLeaf: buildAllowsPriorityByLeaf(),
  testimonials,
  trustStats,
  faqItems,
  pressItems,
  contactInfo,
  contactSteps,
  about: aboutContent,
};
