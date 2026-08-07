import { motion } from 'framer-motion';
import { Leaf, Heart, Sparkles } from 'lucide-react';
import { CornerBlossom, PetalDivider } from './FloralAccents';

const VALUES = [
  {
    icon: Heart,
    title: 'Gondos kezek',
    text: 'Mintát szinte babaként kezelem – tisztelettel, lassan, a legnagyobb odafigyeléssel.',
  },
  {
    icon: Leaf,
    title: 'Természetes anyagok',
    text: 'Minőségi gyanta és nemes fémek, amelyek diszkréten ölelik az emléket.',
  },
  {
    icon: Sparkles,
    title: 'Egyedi alkotás',
    text: 'Két egyforma darab sosem készül – minden ékszer a te történetedre születik.',
  },
];

export default function About() {
  return (
    <section id="rolam" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <CornerBlossom className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 opacity-50" color="#FBCFE8" />
      <CornerBlossom
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 opacity-40 [transform:rotate(180deg)]"
        color="#E9D5FF"
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

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-blush-100 via-lavender-100 to-sage-100 opacity-80 blur-[2px]" />
            <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-tr from-blush-200 to-lavender-200 opacity-60" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft-lg ring-1 ring-white/70">
              <img
                src="https://images.pexels.com/photos/8895549/pexels-photo-8895549.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Simon Szabina, az Emlékőr Kuckó alapítója, miközben egy gyanta ékszert készít"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blush-100/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-ink-700 shadow-soft-lg">
              Emlékőr Kuckó · alapító
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="space-y-5 text-base leading-relaxed text-ink-700 sm:text-lg">
              <p>Sziasztok!</p>
              <p>
                Simon Szabinának hívnak, két csodálatos gyermek Édesanyja
                vagyok, és az Emlékőr kuckó megálmodója, alapítója.
                Szabadidőmben szeretek a családommal és a barátaimmal lenni,
                koncertekre járni, olvasni, és motorozni.
              </p>
              <p>
                Hogy is született meg az Emlékőr kuckó?! Amikor másodjára is
                Anya lettem, ott fogott el az az érzés, hogy milyen gyorsan
                repül az idő a gyerekek mellett, szerettem volna ezt a kezdeti
                bár nehéz, de csodálatos pillanatot örökre megtartani.
              </p>
              <p>
                Szembejött velem az emlékőrző ékszerek készítése, egyvalami
                különösen felkeltette az érdeklődésem az elkészítésükkel
                kapcsolatosan, az epoxy gyanta. Már régóta szemezgettem ezzel
                az anyaggal, sok szép dolgot láttam, amit ebből készítettek,
                és elkezdett foglalkoztatni ez az egész ékszerkészítés.
              </p>
              <p>
                Egyre jobban elkezdtem belemerülni, utánajárni dolgoknak, sokat
                kísérletezni mind az alapanyagokkal, mint pedig az anyatej
                tartósításával kapcsolatban. Ebben az esetben sok más
                alkotóhoz képest én egy olyan tartósítási eljárást fejlesztettem
                ki aminél maga az anyatej folyékony formában kerül bele az
                epoxy gyantába, ezzel megörökítve neked ezt a csodálatos
                időszakot.
              </p>
              <p>
                A hajból rajzolásnál is mindig próbáltam minél több újabb
                dolgot kipróbálni, hogy ráérezzek mi is ami az én stílusom lesz.
                Igyekszem amennyire lehet ebben a szakmában egyedi lenni, és
                veletek együtt megálmodni, ékszerbe zárni azokat a történeteket
                amelyekkel megkerestek.
              </p>
              <p>
                Minden egyes hozzám beérkezett dns csomaggal úgy bánok, mintha
                csak a sajátom lenne, szeretettel, odafigyeléssel a tudásom
                szerinti legjobb kézügyességgel elkészíteni.
              </p>
              <p>
                Hogy mit hoz a jövő a kuckó életében, azt nem tudhatom, de amíg
                bírom, amíg hajt az a valami legbelül veletek együtt csinálom.
                :)
              </p>
              <p className="font-serif text-lg italic text-ink-600">
                „Az Emlékőr kuckó értetek van, hogy megörökítse életetek fontos
                pillanatait.”
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-blush-100 bg-blush-50/60 p-5 text-center shadow-petal transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 to-lavender-100">
                    <v.icon className="h-5 w-5 text-blush-400" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-3 font-serif text-lg text-ink-900">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
