import { motion } from 'framer-motion';
import { Heart, ShieldCheck } from 'lucide-react';
import { testimonials, trustStats } from '../data/content';
import { PetalDivider } from './FloralAccents';

export default function Trust() {
  return (
    <section id="bizalom" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-400">
            Visszajelzések
          </span>
          <h2 className="mt-3 font-cormorant text-5xl font-semibold tracking-tight text-ink-900 sm:text-6xl">
            Akik már megőrizték emléküket
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            Minden mintát diszkréten, gondosan kezelek – ahogy azt én is elvárnám,
            ha a saját emlékemet bíznám valaki másra.
          </p>
          <PetalDivider className="mt-6" />
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              className="flex flex-col rounded-2xl border border-blush-100 bg-cream-50/90 p-6 shadow-petal ring-1 ring-blush-100/80 transition-all duration-300 hover:-translate-y-1 hover:bg-cream-50 hover:shadow-soft sm:p-7"
            >
              <Heart className="h-5 w-5 shrink-0 text-blush-300" strokeWidth={1.6} />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink-700">
                „{item.quote}"
              </blockquote>
              <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-blush-100/80 pt-5">
                <cite className="not-italic">
                  <span className="font-serif text-lg text-ink-900">{item.name}</span>
                  <span className="text-ink-500">, {item.location}</span>
                </cite>
                {item.category && (
                  <span className="rounded-full bg-cream-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blush-500 ring-1 ring-blush-100">
                    {item.category}
                  </span>
                )}
              </footer>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {trustStats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-[9.5rem] flex-1 items-center gap-3 rounded-2xl glass-card px-5 py-3.5 shadow-glass sm:min-w-0 sm:flex-none"
            >
              {stat.label.includes('Diszkrét') ? (
                <ShieldCheck className="h-6 w-6 shrink-0 text-blush-400" strokeWidth={1.6} />
              ) : (
                <span className="font-cormorant text-3xl font-semibold text-blush-500">
                  {stat.value}
                </span>
              )}
              <p className="text-xs font-medium uppercase tracking-wider text-ink-600">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
