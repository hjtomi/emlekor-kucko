import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { faqItems } from '../data/content';
import { PetalDivider } from './FloralAccents';

export default function FAQ() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="gyakori-kerdesek" className="relative overflow-hidden bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-400">
            Gyakori kérdések
          </span>
          <h2 className="mt-3 font-cormorant text-5xl font-semibold tracking-tight text-ink-900 sm:text-6xl">
            Amit gyakran kérdeznek
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            Ha nem találod a választ, írj bátran — szívesen segítek.
          </p>
          <PetalDivider className="mt-6" />
        </motion.div>

        <div className="mt-14 flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            const panelId = `${baseId}-panel-${item.id}`;
            const buttonId = `${baseId}-button-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className={`rounded-2xl border border-blush-100 transition-colors duration-300 ${
                  isOpen ? 'bg-cream-100/70' : 'bg-cream-50'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 sm:px-6 sm:py-5"
                  >
                    <span className="font-cormorant text-xl font-semibold text-ink-900 sm:text-2xl">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-blush-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-blush-100/80 px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
                        <p className="text-sm leading-relaxed text-ink-700 sm:text-base">
                          {item.answer}
                        </p>
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-700 sm:text-base">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <a
            href="#kapcsolat"
            className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-cream-100/80 px-5 py-2.5 text-sm font-medium text-blush-500 shadow-glass transition-all hover:border-blush-300 hover:bg-cream-100 hover:text-blush-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2"
          >
            További kérdésed van? Kapcsolat
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
