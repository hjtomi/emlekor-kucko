import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { pressItems, type PressItem } from '../data/content';
import { PetalDivider } from './FloralAccents';

function formatPressDate(isoDate: string) {
  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function FeaturedPressItem({ item }: { item: PressItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
      className="mx-auto max-w-3xl border-y border-blush-100/90 py-10 sm:py-12"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-400">
          {item.outlet}
        </p>
        <time dateTime={item.date} className="text-sm text-ink-500">
          {formatPressDate(item.date)}
        </time>
      </div>

      <h3 className="mt-5 font-cormorant text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        {item.title}
      </h3>

      <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg">{item.excerpt}</p>

      {item.pullQuote && (
        <blockquote className="mt-8 border-l-2 border-blush-200 pl-5 font-cormorant text-xl italic leading-snug text-ink-700 sm:text-2xl">
          „{item.pullQuote}"
        </blockquote>
      )}

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-blush-200 bg-cream-50/90 px-5 py-2.5 text-sm font-medium text-blush-500 shadow-glass transition-all hover:border-blush-300 hover:bg-cream-100 hover:text-blush-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2"
      >
        Cikk elolvasása
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
      </a>
    </motion.article>
  );
}

function PressList({ items }: { items: PressItem[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-blush-100/90 border-y border-blush-100/90">
      {items.map((item, i) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
          className="py-7 sm:py-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-400">
              {item.outlet}
            </p>
            <time dateTime={item.date} className="text-sm text-ink-500">
              {formatPressDate(item.date)}
            </time>
          </div>
          <h3 className="mt-3 font-cormorant text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blush-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2"
            >
              {item.title}
            </a>
          </h3>
          <p className="mt-2 text-base leading-relaxed text-ink-600">{item.excerpt}</p>
        </motion.article>
      ))}
    </div>
  );
}

export default function Media() {
  if (pressItems.length === 0) return null;

  return (
    <section id="sajto" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-400">
            Média
          </span>
          <h2 className="mt-3 font-cormorant text-5xl font-semibold tracking-tight text-ink-900 sm:text-6xl">
            Egy történet, ami minket is elmesél
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            Amikor mások is szavakba öntik, miért őrzünk emlékeket ékszerben – az
            is bizalom.
          </p>
          <PetalDivider className="mt-6" />
        </motion.div>

        <div className="mt-14">
          {pressItems.length === 1 ? (
            <FeaturedPressItem item={pressItems[0]} />
          ) : (
            <PressList items={pressItems} />
          )}
        </div>
      </div>
    </section>
  );
}
