import { motion } from 'framer-motion';
import { Facebook, Instagram, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { contactInfo } from '../data/content';
import { PetalDivider } from './FloralAccents';

const STEPS = [
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

const SOCIAL_CHANNELS = [
  {
    label: 'Üzenet Facebookon',
    href: contactInfo.facebook,
    icon: Facebook,
    variant: 'primary' as const,
  },
  {
    label: 'Üzenet Instagramon',
    href: contactInfo.instagram,
    icon: Instagram,
    variant: 'secondary' as const,
  },
];

export default function Contact() {
  return (
    <section id="kapcsolat" className="relative overflow-hidden bg-petal-gradient py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-400">
            Kapcsolat
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink-900 sm:text-5xl">
            Írj nekem üzenetet – Facebookon vagy Instagramon
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-700 sm:text-lg">
            Személyesen válaszolok minden kérdésre – oszd meg velem az elképzelésedet
            üzenetben, és közösen kitaláljuk, hogyan őrizzük meg az emlékedet.
          </p>
          <PetalDivider className="mt-6" />
        </motion.div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-5">
          {SOCIAL_CHANNELS.map((channel, i) => (
            <motion.a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={
                channel.variant === 'primary'
                  ? 'group flex flex-1 items-center gap-4 rounded-full bg-gradient-to-r from-blush-400 to-warmrose-400 px-6 py-4 text-white shadow-soft transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg active:scale-[0.98]'
                  : 'group flex flex-1 items-center gap-4 rounded-full border border-blush-200 bg-cream-50/90 px-6 py-4 text-ink-800 shadow-soft transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:shadow-soft-lg active:scale-[0.98]'
              }
            >
              <span
                className={
                  channel.variant === 'primary'
                    ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20'
                    : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-400'
                }
              >
                <channel.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1 text-left text-sm font-semibold">
                {channel.label}
              </span>
              <ArrowUpRight
                className={
                  channel.variant === 'primary'
                    ? 'h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    : 'h-4 w-4 shrink-0 text-blush-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                }
              />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16"
        >
          <h3 className="text-center font-serif text-2xl text-ink-900">
            Hogyan zajlik a folyamat?
          </h3>
          <div className="mt-8 flex flex-col gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-blush-100">
                  <span className="font-serif text-lg text-blush-400">{s.num}</span>
                </span>
                <div>
                  <h4 className="font-serif text-lg text-ink-900">{s.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-xs text-ink-600">
            <ShieldCheck className="h-4 w-4 text-sage-300" />
            A mintádat a legnagyobb diszkrécióval kezelem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
