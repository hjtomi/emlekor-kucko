/**
 * One-time (idempotent) import of the current site copy and images into Sanity.
 *
 * From studio-emlekor-kucko:
 *   npx sanity exec scripts/import-site-content.ts --with-user-token
 */
import {createReadStream, existsSync, readdirSync} from 'node:fs'
import path from 'node:path'
import {randomUUID} from 'node:crypto'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-07'})
const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public')

type Extra = {label: string; amount: number; unit: 'hour' | 'flat'}
type PriceRow = {filling: 'milk-or-hair' | 'hair' | 'fixed'; amount: number}

const LEAVES: {
  slug: string
  navLabel: string
  shortLabel: string
  heading: string
  quote?: string
  paragraphs: string[]
  specs: string[]
  contactNote?: string
  metal: 'ezust' | 'nemesacel' | 'none'
  priceRows: PriceRow[]
  extras?: Extra[]
  allowsPrioritySurcharge: boolean
  sortOrder: number
}[] = [
  {
    slug: 'mithril',
    navLabel: 'Mithril gyűrűk',
    shortLabel: 'Mithril gyűrű',
    heading: 'A Mithril Emlék gyűrű',
    paragraphs: [
      'A Mithril szó jelentése ritka és értékes, mint az a pillanat, amire ezt a gyűrűt terveztem, hogy méltó őrzője lehessen egy Anyatejkőnek, vagy egy apró tincs baba hajnak, mert bár könnyűnek tűnik, de benne van az az elpusztíthatatlan erő, ami csak egy Anyát és gyermekét kötheti össze.',
      'Ezüst tartalmú ötvözetből készült gyűrű, aminek a nevében is benne van, hogy ezüstből készült 800-as alatti ötvözetszámból.',
    ],
    specs: ['Méretre készül, 50-estől 59-es méretig rendelhető!', 'Foglalat mérete: 6 mm.'],
    contactNote: 'A személyre szabás érdekében mindenképp vedd fel velem a kapcsolatot.',
    metal: 'ezust',
    priceRows: [
      {filling: 'milk-or-hair', amount: 45000},
      {filling: 'hair', amount: 38000},
    ],
    allowsPrioritySurcharge: false,
    sortOrder: 1,
  },
  {
    slug: 'csepp',
    navLabel: 'Csepp gyűrűk',
    shortLabel: 'Csepp gyűrű',
    heading: 'Csepp gyűrű',
    quote: 'Egy csepp Anyatej, hogy sose felejtsd el hogy milyen erő lakozik benned.',
    paragraphs: [
      'Ezüst tartalmú ötvözetből készült gyűrű, aminek a nevében is benne van, hogy ezüstből készült 800-as alatti ötvözetszámból.',
    ],
    specs: ['Méretre készül, 50-estől 59-es méretig rendelhető!', 'Foglalat mérete: 6×8 mm.'],
    metal: 'ezust',
    priceRows: [
      {filling: 'milk-or-hair', amount: 40000},
      {filling: 'hair', amount: 35000},
    ],
    allowsPrioritySurcharge: false,
    sortOrder: 2,
  },
  {
    slug: 'emlek-gyongyok',
    navLabel: 'Emlék gyöngyök',
    shortLabel: 'Emlék gyöngy',
    heading: 'Emlék gyöngyök',
    paragraphs: [
      'Nemes acél gyöngybetéttel ellátva (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
    ],
    specs: ['Furat átmérője 5 mm, Pandora karkötővel kompatibilis.'],
    contactNote: 'A személyre szabás miatt mindenképp vedd fel velem a kapcsolatot.',
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 28000},
      {filling: 'hair', amount: 19000},
    ],
    extras: [{label: 'Feles öntés', amount: 4000, unit: 'flat'}],
    allowsPrioritySurcharge: true,
    sortOrder: 3,
  },
  {
    slug: 'medalok',
    navLabel: 'Medálok',
    shortLabel: 'Medál',
    heading: 'Medálok',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával és mérettel dolgozom, ezt a személyre szabásnál egyeztetjük.',
    ],
    specs: [],
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 29000},
      {filling: 'hair', amount: 20000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 4,
  },
  {
    slug: 'fulbevalok',
    navLabel: 'Fülbevalók',
    shortLabel: 'Fülbevaló',
    heading: 'Fülbevalók',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával és mérettel dolgozom, ezt a személyre szabásnál egyeztetjük. Francia kapcsos és bedugós változatban is elérhető.',
    ],
    specs: [],
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 26000},
      {filling: 'hair', amount: 18000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 5,
  },
  {
    slug: 'gyuruk-allithato',
    navLabel: 'Gyűrű (állítható méretű)',
    shortLabel: 'Állítható gyűrű',
    heading: 'Gyűrű (állítható méretű)',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával dolgozom, ezt a személyre szabásnál egyeztetjük.',
    ],
    specs: [],
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 26000},
      {filling: 'hair', amount: 18000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 6,
  },
  {
    slug: 'gyuruk-karika',
    navLabel: 'Gyűrűk (karika)',
    shortLabel: 'Karika gyűrű',
    heading: 'Gyűrűk (karika)',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle típussal és mérettel dolgozom. A méret ebben az esetben fix, próba szükséges az emlékőr elkészítése előtt.',
    ],
    specs: [],
    contactNote: 'Vedd fel velem a kapcsolatot a részletek egyeztetése miatt.',
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 29000},
      {filling: 'hair', amount: 21000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 7,
  },
  {
    slug: 'karkoto-ferfi',
    navLabel: 'Paracord férfi karkötő 1 db DNS gyönggyel',
    shortLabel: 'Férfi karkötő',
    heading: 'Paracord férfi karkötő 1 db DNS gyönggyel',
    paragraphs: [
      'Nemes acél csattal készült a karkötő a biztonságos viselés érdekében, illetve a benne lévő emlék gyöngy is nemes acél gyöngy betéttel készül (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
    ],
    specs: [
      'A gyöngy átmérője 14 mm, a paracord zsinór fonva 16 mm széles, 4 mm vastag.',
      'Méretre készül!',
    ],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 31000},
      {filling: 'hair', amount: 22000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 8,
  },
  {
    slug: 'karkoto-noi',
    navLabel: 'Paracord női karkötő tányéros alappal',
    shortLabel: 'Női karkötő',
    heading: 'Paracord női karkötő tányéros alappal',
    paragraphs: [
      'Nemes acél csattal készült a karkötő a biztonságos viselés érdekében, illetve a tányéros alapok is nemes acélból készültek (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle színű zsinórral és tányéros alappal dolgozom.',
    ],
    specs: ['Méretre készül!'],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 32000},
      {filling: 'hair', amount: 23000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 9,
  },
  {
    slug: 'kulcstarto',
    navLabel: 'Kulcstartó',
    shortLabel: 'Kulcstartó',
    heading: 'Kulcstartó',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Többféle formával és mérettel dolgozom, ezt a személyre szabásnál egyeztetjük.',
    ],
    specs: [],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 30000},
      {filling: 'hair', amount: 21000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 10,
  },
  {
    slug: 'kulcstarto-ferfi',
    navLabel: 'Férfi kulcstartó',
    shortLabel: 'Férfi kulcstartó',
    heading: 'Férfi kulcstartó',
    paragraphs: [
      'Nemes acél alapra készült (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
      'Fekete és barna bőr kulcstartó alappal választható, kör és téglalap formában.',
    ],
    specs: [],
    contactNote: 'Vedd fel velem a kapcsolatot a személyre szabás érdekében.',
    metal: 'nemesacel',
    priceRows: [
      {filling: 'milk-or-hair', amount: 30000},
      {filling: 'hair', amount: 22000},
    ],
    allowsPrioritySurcharge: true,
    sortOrder: 11,
  },
  {
    slug: 'dns-mentes-emlek-gyongy',
    navLabel: 'DNS mentes emlék gyöngy (charm)',
    shortLabel: 'DNS mentes emlék gyöngy',
    heading: 'DNS mentes emlék gyöngy (charm)',
    paragraphs: [
      'Nemes acél gyöngybetéttel ellátva (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik.',
    ],
    specs: ['Furat átmérője 5 mm, Pandora karkötővel kompatibilis.'],
    contactNote: 'A személyre szabáshoz kérlek vedd fel velem a kapcsolatot!',
    metal: 'nemesacel',
    priceRows: [{filling: 'fixed', amount: 17000}],
    allowsPrioritySurcharge: true,
    sortOrder: 12,
  },
  {
    slug: 'dns-mentes-karkoto',
    navLabel: 'Paracord női karkötő anya-gyermek köztessel',
    shortLabel: 'Anya-gyermek karkötő',
    heading: 'Paracord női karkötő anya-gyermek köztessel',
    paragraphs: [
      'Nemes acél csattal készült a karkötő a biztonságos viselés érdekében (304-es minőségű), ami nem allergén, és nem színeződik, nincs bevonattal ellátva, így nem kopik. Ezüst színű cirkónia köves anya-gyermek kapcsoló elemmel, ami ezüst színű bronzból készült.',
    ],
    specs: ['Mérete: 23×24 mm'],
    metal: 'nemesacel',
    priceRows: [{filling: 'fixed', amount: 9000}],
    allowsPrioritySurcharge: true,
    sortOrder: 13,
  },
  {
    slug: 'ajandekutalvanyok',
    navLabel: 'Ajándékutalványok',
    shortLabel: 'Ajándékutalvány',
    heading: 'Ajándékutalványok',
    paragraphs: [
      'Ha kész ékszer helyett választást szeretnél ajándékozni, ajándékutalvánnyal is készülök.',
    ],
    specs: [],
    contactNote: 'Az összeg és a részletek egyeztetése miatt vedd fel velem a kapcsolatot.',
    metal: 'none',
    priceRows: [],
    allowsPrioritySurcharge: false,
    sortOrder: 14,
  },
]

const MAIN_CATEGORIES = [
  {
    slug: 'ezust-otvozet',
    title: 'Ezüst tartalmú ötvözetből készült emlékőr ékszerek',
    emptyPrompt:
      'Válaszd ki a gyűrű típusát — Mithril gyűrűk vagy Csepp gyűrűk —, hogy lásd a darabokat és az árakat.',
    children: ['mithril', 'csepp'],
    sortOrder: 1,
  },
  {
    slug: 'nemesacel',
    title: 'Nemesacélból készült emlékőr ékszerek',
    emptyPrompt: 'Válaszd ki a típust, hogy lásd a darabokat és az árakat.',
    children: [
      'emlek-gyongyok',
      'medalok',
      'fulbevalok',
      'gyuruk-allithato',
      'gyuruk-karika',
      'karkoto-ferfi',
      'karkoto-noi',
      'kulcstarto',
      'kulcstarto-ferfi',
    ],
    sortOrder: 2,
  },
  {
    slug: 'dns-mentes',
    title: 'DNS mentes ékszerek / emlékőrök',
    emptyPrompt:
      'Válaszd ki a típust — DNS mentes emlék gyöngy vagy paracord női karkötő —, hogy lásd a darabokat és az árakat.',
    children: ['dns-mentes-emlek-gyongy', 'dns-mentes-karkoto'],
    sortOrder: 3,
  },
  {
    slug: 'ajandekutalvanyok',
    title: 'Ajándékutalványok',
    emptyPrompt: 'Válassz egy kategóriát, hogy megtekinthesd a képeket és az árakat.',
    children: ['ajandekutalvanyok'],
    sortOrder: 4,
  },
]

const GALLERY_GROUPS = [
  {
    slug: 'mithril',
    title: 'Mithril gyűrű',
    caption: 'Egyedi mithril gyűrű, kézzel foglalt emlékkel.',
    alt: 'Kézzel készített mithril emlékgyűrű',
    dir: 'images/gallery/gyuruk/mithril',
  },
  {
    slug: 'csepp',
    title: 'Csepp gyűrű',
    caption: 'Csepp formájú gyűrű – egy korábbi, egyedi elkészítésű darab.',
    alt: 'Kézzel készített csepp formájú emlékgyűrű',
    dir: 'images/gallery/gyuruk/csepp',
  },
  {
    slug: 'emlek-gyongyok',
    title: 'Emlék gyöngy',
    caption: 'Emlék gyöngy – anyatejből vagy hajból, kézzel formázva.',
    alt: 'Kézzel készített emlék gyöngy',
    dir: 'images/gallery/emlekgyongyok',
  },
  {
    slug: 'medalok',
    title: 'Medál',
    caption: 'Egyedi medál, kézzel készített emlékőrző darab.',
    alt: 'Kézzel készített emlékőrző medál',
    dir: 'images/gallery/medalok',
  },
  {
    slug: 'fulbevalok',
    title: 'Fülbevaló',
    caption: 'Egyedi fülbevaló, kézzel készített emlékőrző darab.',
    alt: 'Kézzel készített emlékőrző fülbevaló',
    dir: 'images/gallery/fulbevalok',
  },
  {
    slug: 'gyuruk-allithato',
    title: 'Állítható gyűrű',
    caption: 'Nemesacél állítható gyűrű – egy korábbi, egyedi elkészítésű darab.',
    alt: 'Kézzel készített állítható emlékgyűrű',
    dir: 'images/gallery/gyuruk_allithato',
  },
  {
    slug: 'gyuruk-karika',
    title: 'Karika gyűrű',
    caption: 'Nemesacél karika gyűrű – egy korábbi, egyedi elkészítésű darab.',
    alt: 'Kézzel készített karika emlékgyűrű',
    dir: 'images/gallery/gyuruk_karika',
  },
  {
    slug: 'karkoto-ferfi',
    title: 'Férfi karkötő',
    caption: 'Paracord férfi karkötő DNS gyönggyel, kézzel készítve.',
    alt: 'Kézzel készített paracord férfi emlék karkötő',
    dir: 'images/gallery/karkoto_ferfi',
  },
  {
    slug: 'karkoto-noi',
    title: 'Női karkötő',
    caption: 'Paracord női karkötő tányéros alappal, kézzel készítve.',
    alt: 'Kézzel készített paracord női emlék karkötő',
    dir: 'images/gallery/karkoto_noi',
  },
  {
    slug: 'kulcstarto',
    title: 'Kulcstartó',
    caption: 'Egyedi kulcstartó, kézzel készített emlékőrző darab.',
    alt: 'Kézzel készített emlékőrző kulcstartó',
    dir: 'images/gallery/kulcstarto',
  },
  {
    slug: 'kulcstarto-ferfi',
    title: 'Férfi kulcstartó',
    caption: 'Bőr alapú férfi kulcstartó, kézzel készített emlékőrző darab.',
    alt: 'Kézzel készített férfi emlékőrző kulcstartó',
    dir: 'images/gallery/kulcstarto_ferfi',
  },
  {
    slug: 'dns-mentes-emlek-gyongy',
    title: 'DNS mentes emlék gyöngy',
    caption: 'DNS mentes emlék gyöngy – kézzel formázva.',
    alt: 'Kézzel készített DNS mentes emlék gyöngy',
    dir: 'images/gallery/dnsmentes_emlekgyongy',
  },
  {
    slug: 'dns-mentes-karkoto',
    title: 'Anya-gyermek karkötő',
    caption: 'Paracord női karkötő anya-gyermek köztessel, kézzel készítve.',
    alt: 'Kézzel készített paracord női karkötő anya-gyermek köztessel',
    dir: 'images/gallery/dnsmentes_karkoto',
  },
  {
    slug: 'ajandekutalvanyok',
    title: 'Ajándékutalvány',
    caption: 'Ajándékutalvány az Emlékőr Kuckó ékszereire.',
    alt: 'Emlékőr Kuckó ajándékutalvány',
    dir: 'images/gallery/ajandekutalvany',
  },
]

function key() {
  return randomUUID()
}

function extraItems(extras: Extra[] = []) {
  return extras.map((extra) => ({_type: 'priceExtra', _key: key(), ...extra}))
}

function imageFiles(dir: string) {
  const abs = path.join(PUBLIC_DIR, dir)
  if (!existsSync(abs)) return []
  return readdirSync(abs)
    .filter((name) => /\.(jpe?g|png|webp|gif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, 'hu'))
    .map((name) => path.join(dir, name).replaceAll('\\', '/'))
}

async function uploadImage(relPath: string) {
  const abs = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''))
  if (!existsSync(abs)) {
    console.warn(`Missing image: ${abs}`)
    return null
  }
  return client.assets.upload('image', createReadStream(abs), {filename: path.basename(abs)})
}

async function upsertBySlug(type: string, slug: string, doc: Record<string, unknown>) {
  const existing = await client.fetch<string | null>(
    `*[_type == $type && slug.current == $slug][0]._id`,
    {type, slug},
  )
  if (existing) {
    await client.patch(existing).set(doc).commit()
    return existing.replace(/^drafts\./, '')
  }
  const created = await client.create({_type: type, ...doc})
  return created._id.replace(/^drafts\./, '')
}

async function run() {
  console.log('Importing site content into Sanity…')

  const portrait = await uploadImage('images/Szabina.jpg')
  await client.createOrReplace({
    _id: 'about',
    _type: 'about',
    eyebrow: 'Rólam',
    heading: 'Simon Szabina',
    tagline: 'A kéz, amely emléket őriz',
    founderBadge: 'Emlékőr Kuckó · alapító',
    introParagraphs: [
      'Sziasztok!',
      'Simon Szabinának hívnak, két csodálatos gyermek Édesanyja vagyok, és az Emlékőr kuckó megálmodója, alapítója. Szabadidőmben szeretek a családommal és a barátaimmal lenni, koncertekre járni, olvasni, és motorozni.',
    ],
    values: [
      {
        _type: 'aboutValue',
        _key: key(),
        icon: 'heart',
        title: 'Gondos kezek',
        text: 'Szívvel, lélekkel, a legnagyobb odafigyeléssel.',
      },
      {
        _type: 'aboutValue',
        _key: key(),
        icon: 'leaf',
        title: 'Minőségi anyagok',
        text: 'Időt álló nemesacél ékszer alapokkal, minőségi gyantával, és ezüst tartalmú ötvözetből.',
      },
      {
        _type: 'aboutValue',
        _key: key(),
        icon: 'sparkles',
        title: 'Egyedi alkotás',
        text: 'Két egyforma darab sosem készül – minden ékszer a te történetedre születik.',
      },
    ],
    storySections: [
      {
        _type: 'aboutStorySection',
        _key: key(),
        heading: 'Hogy is született meg az Emlékőr kuckó?!',
        paragraphs: [
          'Amikor másodjára is Anya lettem, ott fogott el az az érzés, hogy milyen gyorsan repül az idő a gyerekek mellett, szerettem volna ezt a kezdeti bár nehéz, de csodálatos pillanatot örökre megtartani.',
        ],
      },
      {
        _type: 'aboutStorySection',
        _key: key(),
        heading: 'Az epoxy gyanta',
        paragraphs: [
          'Szembejött velem az emlékőrző ékszerek készítése, egyvalami különösen felkeltette az érdeklődésem az elkészítésükkel kapcsolatosan, az epoxy gyanta. Már régóta szemezgettem ezzel az anyaggal, sok szép dolgot láttam, amit ebből készítettek, és elkezdett foglalkoztatni ez az egész ékszerkészítés.',
        ],
      },
      {
        _type: 'aboutStorySection',
        _key: key(),
        heading: 'Az anyatej tartósítása',
        paragraphs: [
          'Egyre jobban elkezdtem belemerülni, utánajárni dolgoknak, sokat kísérletezni mind az alapanyagokkal, mint pedig az anyatej tartósításával kapcsolatban. Ebben az esetben sok más alkotóhoz képest én egy olyan tartósítási eljárást fejlesztettem ki aminél maga az anyatej folyékony formában kerül bele az epoxy gyantába, ezzel megörökítve neked ezt a csodálatos időszakot.',
        ],
      },
      {
        _type: 'aboutStorySection',
        _key: key(),
        heading: 'Hajból rajzolás',
        paragraphs: [
          'A hajból rajzolásnál is mindig próbáltam minél több újabb dolgot kipróbálni, hogy ráérezzek mi is ami az én stílusom lesz. Igyekszem amennyire lehet ebben a szakmában egyedi lenni, és veletek együtt megálmodni, ékszerbe zárni azokat a történeteket amelyekkel megkerestek.',
        ],
      },
      {
        _type: 'aboutStorySection',
        _key: key(),
        paragraphs: [
          'Minden egyes hozzám beérkezett dns csomaggal úgy bánok, mintha csak a sajátom lenne, szeretettel, odafigyeléssel a tudásom szerinti legjobb kézügyességgel elkészíteni.',
          'Hogy mit hoz a jövő a kuckó életében, azt nem tudhatom, de amíg bírom, amíg hajt az a valami legbelül veletek együtt csinálom. :)',
        ],
      },
    ],
    closingQuote: '„Az Emlékőr kuckó értetek van, hogy megörökítse életetek fontos pillanatait.”',
    ...(portrait
      ? {
          portrait: {
            _type: 'image',
            asset: {_type: 'reference', _ref: portrait._id},
            alt: 'Simon Szabina, az Emlékőr Kuckó alapítója, miközben egy gyanta ékszert készít',
          },
        }
      : {}),
  })

  await client.createOrReplace({
    _id: 'contact',
    _type: 'contact',
    email: 'hello@emlekor-kucko.hu',
    phone: '+36 30 605 82 86',
    headquarters: '3300 Eger, Deák Ferenc utca 80. as 4.',
    mailingAddress: '3398 Nagytálya, Váci Mihály utca 10.',
    location: 'Magyarország',
    instagram: 'https://www.instagram.com/emlekor_kucko.simonszabina/',
    facebook: 'https://www.facebook.com/profile.php?id=100091594750333',
    steps: [
      {
        _type: 'contactStep',
        _key: key(),
        num: '01',
        title: 'Kapcsolatfelvétel & megbeszélés',
        text: 'Üzenj nekem Facebookon vagy Instagramon, és átbeszéljük az elképzelésedet.',
      },
      {
        _type: 'contactStep',
        _key: key(),
        num: '02',
        title: 'A minta biztonságos elküldése',
        text: 'A kapcsolatfelvétel után mindenről részletesen tájékoztatlak. Küldök majd csomagolási utasítást, hogy mit és hogyan kell összekészítened és feladnod nekem.',
      },
      {
        _type: 'contactStep',
        _key: key(),
        num: '03',
        title: 'Az ékszer elkészítése szeretettel',
        text: 'Gondos kézi munkával elkészítem a te egyedi emlékőrző ékszeredet.',
      },
    ],
  })

  await client.createOrReplace({
    _id: 'gallerySettings',
    _type: 'gallerySettings',
    milkOrHairLabel: 'Anyatej és/vagy haj',
    hairLabel: 'Csak haj',
    fixedLabel: 'Ár',
    prioritySurcharge: 'Elsőbbségi (sürgős) elkészítés: az adott termék értékének +30%-a',
    hourlyExtras: extraItems([
      {label: 'Hajjal rajzolás', amount: 4500, unit: 'hour'},
      {label: 'Hajjal betűrajzolás', amount: 3000, unit: 'hour'},
    ]),
  })

  await client.createOrReplace({
    _id: 'trustSettings',
    _type: 'trustSettings',
    stats: [
      {_type: 'trustStat', _key: key(), value: '100%', label: 'kézi munka'},
      {_type: 'trustStat', _key: key(), value: '3+', label: 'éve emlékeket őrzök'},
      {_type: 'trustStat', _key: key(), value: '✓', label: 'Diszkrét, biztonságos feldolgozás'},
    ],
  })

  const leafIds = new Map<string, string>()
  for (const leaf of LEAVES) {
    const id = await upsertBySlug('galleryLeaf', leaf.slug, {
      navLabel: leaf.navLabel,
      shortLabel: leaf.shortLabel,
      slug: {_type: 'slug', current: leaf.slug},
      heading: leaf.heading,
      quote: leaf.quote,
      paragraphs: leaf.paragraphs,
      specs: leaf.specs,
      contactNote: leaf.contactNote,
      metal: leaf.metal,
      allowsPrioritySurcharge: leaf.allowsPrioritySurcharge,
      sortOrder: leaf.sortOrder,
      extras: extraItems(leaf.extras),
      priceRows: leaf.priceRows.map((row) => ({
        _type: 'galleryPriceRow',
        _key: key(),
        filling: row.filling,
        amount: row.amount,
      })),
    })
    leafIds.set(leaf.slug, id)
    console.log(`Leaf ${leaf.slug} → ${id}`)
  }

  for (const category of MAIN_CATEGORIES) {
    await upsertBySlug('galleryMainCategory', category.slug, {
      title: category.title,
      slug: {_type: 'slug', current: category.slug},
      emptyPrompt: category.emptyPrompt,
      sortOrder: category.sortOrder,
      children: category.children.map((slug) => ({
        _type: 'reference',
        _key: key(),
        _ref: leafIds.get(slug),
      })),
    })
  }

  for (const group of GALLERY_GROUPS) {
    const categoryId = leafIds.get(group.slug)
    if (!categoryId) continue
    const files = imageFiles(group.dir)
    const existingCount = await client.fetch<number>(
      `count(*[_type == "galleryItem" && category._ref == $categoryId])`,
      {categoryId},
    )
    if (existingCount > 0) {
      console.log(`Skip gallery items for ${group.slug} (${existingCount} already exist)`)
      continue
    }
    for (const [index, file] of files.entries()) {
      const asset = await uploadImage(file)
      if (!asset) continue
      const title = files.length === 1 ? group.title : `${group.title} ${index + 1}`
      await client.create({
        _type: 'galleryItem',
        title,
        caption: group.caption,
        sortOrder: index + 1,
        category: {_type: 'reference', _ref: categoryId},
        image: {
          _type: 'image',
          asset: {_type: 'reference', _ref: asset._id},
          alt: group.alt,
        },
      })
    }
    console.log(`Imported ${files.length} items for ${group.slug}`)
  }

  const existingTestimonials = await client.fetch<number>(`count(*[_type == "testimonial"])`)
  if (existingTestimonials === 0) {
    const testimonials = [
      {
        name: 'Alexa',
        location: 'Miskolc',
        quote:
          'Nagyon elégedett vagyok vele, kedves precíz és alapos. Csodaszép gyűrűt és kulcstartót készített nekem anyatejjel és babahajjal ❤️',
        sortOrder: 1,
        pieces: [
          {file: 'images/trust/Alexa2.jpg', label: 'Gyűrű', alt: 'Alexa szív alakú emlékgyűrűje'},
          {file: 'images/trust/Alexa1.jpg', label: 'Kulcstartó', alt: 'Alexa bőr emlék kulcstartója'},
        ],
      },
      {
        name: 'Annamária',
        location: 'Debrecen',
        quote:
          'Szabina gyönyörű dolgokat alkot. Csak ajánlani tudom mindenkinek,aki ilyen emléket szeretne készíttetni. Odafigyel a részletekre, alapos és körültekintő. Minden munkájába szívét és lelkét beleteszi.',
        sortOrder: 2,
        pieces: [
          {
            file: 'images/trust/Annamária.jpg',
            label: 'Medál',
            alt: 'Annamária kerek emlékmedálja, hajból formált szívvel és virágokkal',
          },
        ],
      },
      {
        name: 'Kitti',
        location: 'Szeged',
        quote:
          'Nehéz szavakba leírni mennyire csodálatos lett a charm amit nekem készített. Szívből ajánlom mindenkinek aki precíz és tökéletes ékszert szeretne! ❤️ Külön kiemelném hogy a készítést lépésről lépésre végig kísérhettem! 🥰🌸',
        sortOrder: 3,
        pieces: [
          {
            file: 'images/trust/Kitti.jpg',
            label: 'Charm',
            alt: 'Kitti életfa mintás emlékcharmjai, hajjal és virágokkal',
            fit: 'contain' as const,
          },
        ],
      },
    ]

    for (const item of testimonials) {
      const pieces = []
      for (const piece of item.pieces) {
        const asset = await uploadImage(piece.file)
        if (!asset) continue
        pieces.push({
          _type: 'testimonialPiece',
          _key: key(),
          label: piece.label,
          fit: 'fit' in piece ? piece.fit : 'cover',
          image: {
            _type: 'image',
            asset: {_type: 'reference', _ref: asset._id},
            alt: piece.alt,
          },
        })
      }
      await client.create({
        _type: 'testimonial',
        name: item.name,
        location: item.location,
        quote: item.quote,
        sortOrder: item.sortOrder,
        pieces,
      })
    }
  }

  const existingFaq = await client.fetch<number>(`count(*[_type == "faqItem"])`)
  if (existingFaq === 0) {
    const faqs = [
      {
        question: 'Hogyan küldhetem el az anyatejet vagy a hajtincset?',
        answer:
          'Erre egy általam kitalált, könnyen követhető rendszer van. A kapcsolatfelvétel után a minta elküldési folyamatról a csomagolási utasításokat elküldöm.',
      },
      {
        question: 'Mennyi anyag szükséges egy ékszerhez?',
        answer: 'Kevesebb is elég, mint sokan gondolják – a pontos mennyiség a formától függ. Tájékoztatóan:',
        bullets: [
          'Medál: néhány csepp anyatej vagy egy apró hajtincs',
          'Gyűrű: hasonlóan kevés minta, a mérettől függően',
          'Nyaklánc / több darab: egyeztetünk, hogy mindenhova jusson',
        ],
      },
      {
        question: 'Mennyi idő az elkészítés?',
        answer:
          'Először egyeztetünk az elképzelésedről, majd a minta megérkezése után általában 2–4 hét az elkészítés. Ünnepi időszakban vagy összetettebb daraboknál ez hosszabb lehet – a várható időpontot mindig előre megbeszéljük. Ha ennél hamarabb kell: Elsőbbségi (sürgős) elkészítés: az adott termék értékének +30%-a. Ezüst tartalmú ötvözetből készült ékszereknél sürgősségi elkészítés nem kérhető.',
      },
      {
        question: 'Egyedi az ékszer, vagy van sablon?',
        answer:
          'Minden darab egyedi. Az Árak és galéria szekció inspiráció: abból kiindulva közösen alakítjuk ki a formát, a színeket és a részleteket. Két egyforma ékszer sosem készül – a tied a te történetedre születik.',
      },
      {
        question: 'Milyen formákat és anyagokat választhatok?',
        answer: '',
        bullets: [
          'Forma: A formákról az Árak és galéria szekcióban megtalálod a lehetőségeket.',
          'Anyag: Nemesacéllal illetve ezüst tartalmú ötvözetekkel dolgozom. A Mithril és Csepp gyűrűk ezüst tartalmú ötvözetből, a többi emlékőr ékszer nemesacélból készül. DNS mentes darabok és ajándékutalványok is elérhetők.',
        ],
      },
      {
        question: 'Mennyibe kerül egy ékszer?',
        answer: 'Az egyes ékszerek árairól az Árak és galéria szekcióban tájékozódhatsz.',
      },
      {
        question: 'Tudok ajándékba rendelni?',
        answer:
          'Igen. Ajándékutalvány is kérhető, a kézbesítés lehetőségeiről a konzultáción részletesen beszélünk.',
      },
    ]
    for (const [index, item] of faqs.entries()) {
      await client.create({
        _type: 'faqItem',
        question: item.question,
        answer: item.answer,
        bullets: item.bullets ?? [],
        sortOrder: index + 1,
      })
    }
  }

  const existingPress = await client.fetch<number>(`count(*[_type == "pressItem"])`)
  if (existingPress === 0) {
    await client.create({
      _type: 'pressItem',
      outlet: 'Veritex.hu',
      title: 'Egyedi ajándék – az Emlékőr Kuckó ékszerei',
      publishedAt: '2025-10-27',
      excerpt:
        'A legszebb ajándékok nem a csomagolásban rejlenek, hanem az emlékekben. Az Emlékőr Kuckó arról szól, hogyan válhat egy apró ékszer az élet legfontosabb pillanatainak őrzőjévé – anyatejből és hajból készült gyanta darabokban.',
      url: 'https://www.veritex.hu/hasznos-tippek-otthonra-unnepekre-kreativ-otletek-karrierhez/unnepek-tippek-otletek/egyedi-ajandek-az-emlekor-kucko-ekszerei/',
      pullQuote: 'Az Emlékőr Kuckó értetek van, hogy megörökítse életetek fontos pillanatait.',
    })
  }

  console.log('Import finished. Publish any remaining drafts in Studio if needed.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
