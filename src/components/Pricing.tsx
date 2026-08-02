import { motion } from 'framer-motion';
import { Check, Sparkles, Tag } from 'lucide-react';
import { priceTiers, type PriceTier } from '../data/content';
import { PetalDivider } from './FloralAccents';

const ACCENT_MAP: Record<PriceTier['accent'], { bg: string; ring: string; text: string; chip: string; price: string }> = {
  blush: {
    bg: 'bg-blush-50/70',
    ring: 'ring-blush-100',
    text: 'text-blush-500',
    chip: 'bg-blush-100 text-blush-500',
    price: 'text-blush-400',
  },
  lavender: {
    bg: 'bg-lavender-50/70',
    ring: 'ring-lavender-200',
    text: 'text-lavender-300',
    chip: 'bg-lavender-100 text-lavender-300',
    price: 'text-lavender-300',
  },
  sage: {
    bg: 'bg-sage-50/70',
    ring: 'ring-sage-200',
    text: 'text-sage-300',
    chip: 'bg-sage-100 text-sage-300',
    price: 'text-sage-300',
  },
};

const formatHuf = (n: number) => n.toLocaleString('hu-HU').replace(/,/g, ' ');

export default function Pricing() {
  return (
    <section id="arak" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blush-200/60 bg-blush-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blush-500 shadow-glass">
            Tájékoztató árak
          </span>
          <h2 className="mt-4 font-cormorant text-5xl font-semibold tracking-tight text-ink-900 sm:text-6xl">
            Miből épül az emlék?
          </h2>
          <PetalDivider className="mt-6" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-2xl glass-card px-5 py-4 text-left shadow-glass"
          >
            <Tag className="mt-0.5 h-5 w-5 shrink-0 text-blush-400" />
            <p className="text-sm leading-relaxed text-ink-700">
              Az alábbiak <strong>tájékoztató jellegű kezdőárak</strong>. Mivel
              minden ékszer személyre szabott, a végleges ár a konzultáció
              során, az elképzelésed alapján kerül meghatározásra.
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {priceTiers.map((tier, i) => {
            const accent = ACCENT_MAP[tier.accent];
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                className={`relative flex flex-col overflow-hidden rounded-3xl ${accent.bg} p-7 shadow-petal ring-1 ${accent.ring} transition-all duration-500 hover:-translate-y-2 hover:shadow-soft-lg sm:p-8 ${
                  tier.featured ? 'lg:-mt-6 lg:mb-0' : ''
                }`}
              >
                {tier.featured && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blush-300 to-warmrose-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-soft">
                    <Sparkles className="h-3 w-3" />
                    Kedvelt
                  </span>
                )}

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-cormorant text-3xl font-semibold text-ink-900">{tier.name}</h3>
                  <p className="text-sm leading-relaxed text-ink-600">{tier.blurb}</p>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-500">
                    kezdőár
                  </span>
                  <span className={`font-cormorant text-5xl font-semibold ${accent.price}`}>
                    {formatHuf(tier.priceFrom)}
                  </span>
                  <span className="text-sm font-medium text-ink-500">Ft-tól</span>
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-blush-200/60 to-transparent" />

                <ul className="flex flex-1 flex-col gap-3">
                  {tier.includes.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-ink-700">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.chip}`}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kapcsolat"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] ${
                    tier.featured
                      ? 'bg-gradient-to-r from-blush-300 to-warmrose-300 text-white shadow-soft hover:shadow-soft-lg'
                      : `border ${accent.ring} bg-white/80 ${accent.text} hover:bg-white hover:shadow-soft`
                  }`}
                >
                  Személyre szabott ajánlatot kérek
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
