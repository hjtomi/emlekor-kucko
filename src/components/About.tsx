import { motion } from 'framer-motion';
import { Leaf, Heart, Sparkles } from 'lucide-react';
import { CornerBlossom, PetalDivider } from './FloralAccents';

const VALUES = [
  {
    icon: Heart,
    title: 'Gondos kezek',
    text: 'Szívvel, lélekkel, a legnagyobb odafigyeléssel.',
  },
  {
    icon: Leaf,
    title: 'Minőségi anyagok',
    text: 'Időt álló nemesacél ékszer alapokkal, minőségi gyantával, és ezüst tartalmú ötvözetből.',
  },
  {
    icon: Sparkles,
    title: 'Egyedi alkotás',
    text: 'Két egyforma darab sosem készül – minden ékszer a te történetedre születik.',
  },
];

const INTRO_PARAS = [
  'Sziasztok!',
  'Simon Szabinának hívnak, két csodálatos gyermek Édesanyja vagyok, és az Emlékőr kuckó megálmodója, alapítója. Szabadidőmben szeretek a családommal és a barátaimmal lenni, koncertekre járni, olvasni, és motorozni.',
];

const STORY_SECTIONS: { heading?: string; paragraphs: string[] }[] = [
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
];

const CLOSING_QUOTE =
  '„Az Emlékőr kuckó értetek van, hogy megörökítse életetek fontos pillanatait.”';

export default function About() {
  return (
    <section id="rolam" className="relative overflow-hidden bg-cream-50 bg-watercolor-edge py-24 sm:py-32">
      <CornerBlossom className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 opacity-35" color="#E8D4CE" />
      <CornerBlossom
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 opacity-30 [transform:rotate(180deg)]"
        color="#EDE4D8"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-400">
            Rólam
          </span>
          <h2 className="mt-3 font-serif text-4xl text-ink-900 sm:text-5xl">
            Simon Szabina
          </h2>
          <p className="mt-3 font-serif text-lg italic text-ink-600">
            A kéz, amely emléket őriz
          </p>
          <PetalDivider className="mt-6" />
        </motion.div>

        {/* Beat A — Intro */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-blush-100 via-cream-200 to-champagne-200 opacity-80 blur-[2px]" />
            <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-tr from-blush-200 to-cream-300 opacity-60" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft-lg ring-1 ring-cream-50/70">
              <img
                src="/images/Szabina.jpg"
                alt="Simon Szabina, az Emlékőr Kuckó alapítója, miközben egy gyanta ékszert készít"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-200/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cream-50 px-5 py-2.5 text-xs font-medium text-ink-700 shadow-soft-lg">
              Emlékőr Kuckó · alapító
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-5 text-base leading-relaxed text-ink-700 sm:text-lg"
          >
            {INTRO_PARAS.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-blush-100 bg-cream-100/70 p-5 text-center shadow-petal transition-all duration-300 hover:-translate-y-1 hover:bg-cream-50 hover:shadow-soft"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 to-cream-200">
                <v.icon className="h-5 w-5 text-blush-400" strokeWidth={1.6} />
              </span>
              <h3 className="mt-3 font-serif text-lg text-ink-900">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{v.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Beat B — Story */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-2xl"
        >
          <PetalDivider className="mb-12" />

          <div className="space-y-10 text-base leading-relaxed text-ink-700 sm:text-lg">
            {STORY_SECTIONS.map((section) => (
              <div key={section.heading ?? section.paragraphs[0].slice(0, 32)} className="space-y-4">
                {section.heading ? (
                  <h3 className="font-serif text-2xl text-ink-900 sm:text-[1.65rem]">
                    {section.heading}
                  </h3>
                ) : null}
                {section.paragraphs.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            ))}
          </div>

          <blockquote className="mt-14 text-center font-serif text-xl italic leading-relaxed text-blush-500 sm:text-2xl">
            {CLOSING_QUOTE}
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
