import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Maximize2, ChevronDown, ChevronUp } from 'lucide-react';
import { galleryItems, type GalleryItem, type GalleryCategory } from '../data/content';
import { PetalDivider } from './FloralAccents';

type FilterKey = 'osszes' | GalleryCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'osszes', label: 'Összes' },
  { key: 'anyatej', label: 'Anyatejes ékszerek' },
  { key: 'hajtincs', label: 'Hajas ékszerek' },
  { key: 'kombinált', label: 'Kombinált ékszerek' },
];

export default function Gallery() {
  const [active, setActive] = useState<FilterKey>('osszes');
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: FilterKey) => {
    setActive(key);
    setIsExpanded(false);
  };

  const items = useMemo(
    () => (active === 'osszes' ? galleryItems : galleryItems.filter((i) => i.category === active)),
    [active],
  );

  return (
    <section id="galeria" className="relative overflow-hidden bg-blush-50/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-400">
            Galéria
          </span>
          <h2 className="mt-3 font-serif text-4xl text-ink-900 sm:text-5xl">
            Korábbi alkotások
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            Néhány darab a múltból – minden egyedi, minden egy történet. Bármelyik
            ihletet adhat a te saját emlékőrző ékszeredhez.
          </p>
          <PetalDivider className="mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === f.key
                  ? 'bg-gradient-to-r from-blush-300 to-warmrose-300 text-white shadow-soft'
                  : 'border border-blush-200 bg-white/80 text-ink-700 hover:border-blush-300 hover:text-blush-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              const isHiddenOnMobile = index >= 3 && !isExpanded;
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  onClick={() => setSelected(item)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-petal ring-1 ring-blush-100/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft-lg ${
                    isHiddenOnMobile ? 'hidden sm:block' : 'block'
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink-700 opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-blush-200">
                        {item.category === 'anyatej'
                          ? 'Anyatejes ékszer'
                          : item.category === 'hajtincs'
                            ? 'Hajas ékszer'
                            : 'Kombinált ékszer'}
                      </p>
                      <h3 className="mt-1 font-serif text-xl leading-snug">{item.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-4">
                    <Heart className="h-4 w-4 shrink-0 text-blush-300" />
                    <p className="text-sm leading-relaxed text-ink-600">{item.caption}</p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {items.length > 3 && (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white/90 px-6 py-2.5 text-sm font-medium text-ink-700 shadow-soft transition-all duration-300 hover:border-blush-300 hover:text-blush-500 hover:shadow-soft-lg active:scale-95"
            >
              {isExpanded ? (
                <>
                  Kevesebb mutatása
                  <ChevronUp className="h-4 w-4 text-blush-400" />
                </>
              ) : (
                <>
                  Több mutatása
                  <ChevronDown className="h-4 w-4 text-blush-400" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-soft-lg lg:grid-cols-2"
          >
            <button
              onClick={onClose}
              aria-label="Bezárás"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-soft transition-colors hover:bg-blush-100 hover:text-blush-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-square lg:aspect-auto">
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blush-100/20 to-transparent lg:bg-gradient-to-r" />
            </div>

            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
              <span className="w-fit rounded-full bg-blush-100 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-blush-500">
                {item.category === 'anyatej'
                  ? 'Anyatejes ékszer'
                  : item.category === 'hajtincs'
                    ? 'Hajas ékszer'
                    : 'Kombinált ékszer'}
              </span>
              <h3 className="font-serif text-2xl leading-snug text-ink-900 sm:text-3xl">
                {item.title}
              </h3>
              <p className="flex items-start gap-2 text-base leading-relaxed text-ink-600">
                <Heart className="mt-1 h-4 w-4 shrink-0 text-blush-300" />
                {item.caption}
              </p>
              <p className="text-sm leading-relaxed text-ink-600">
                Ez egy korábbi, egyedi elkészítésű darab. A te ékszered a
                saját mintáidból, a saját történetedből fog megszületni –
                beszéljük meg közösen a részleteket.
              </p>
              <a
                href="#kapcsolat"
                onClick={onClose}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blush-300 to-warmrose-300 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-[1.03]"
              >
                <Heart className="h-4 w-4" />
                Ilyet szeretnék / Érdeklődöm
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
