import { motion } from 'framer-motion';
import { Leaf, Heart, Sparkles, type LucideIcon } from 'lucide-react';
import { CornerBlossom, PetalDivider } from './FloralAccents';
import { useSiteContent } from '../content/SiteContentContext';
import type { AboutValueIcon } from '../data/content';

const VALUE_ICONS: Record<AboutValueIcon, LucideIcon> = {
  heart: Heart,
  leaf: Leaf,
  sparkles: Sparkles,
};

export default function About() {
  const { about } = useSiteContent();

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
            {about.eyebrow}
          </span>
          <h2 className="mt-3 font-serif text-4xl text-ink-900 sm:text-5xl">
            {about.heading}
          </h2>
          <p className="mt-3 font-serif text-lg italic text-ink-600">
            {about.tagline}
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
                src={about.portrait.image}
                alt={about.portrait.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-200/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cream-50 px-5 py-2.5 text-xs font-medium text-ink-700 shadow-soft-lg">
              {about.founderBadge}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-5 text-base leading-relaxed text-ink-700 sm:text-lg"
          >
            {about.introParagraphs.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {about.values.map((v, i) => {
            const Icon = VALUE_ICONS[v.icon] ?? Heart;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-blush-100 bg-cream-100/70 p-5 text-center shadow-petal transition-all duration-300 hover:-translate-y-1 hover:bg-cream-50 hover:shadow-soft"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 to-cream-200">
                  <Icon className="h-5 w-5 text-blush-400" strokeWidth={1.6} />
                </span>
                <h3 className="mt-3 font-serif text-lg text-ink-900">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{v.text}</p>
              </motion.div>
            );
          })}
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
            {about.storySections.map((section) => (
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
            {about.closingQuote}
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
