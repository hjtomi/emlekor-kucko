import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  Maximize2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Images,
  Tag,
} from 'lucide-react';
import {
  galleryItems,
  galleryCategories,
  getGalleryLeafMeta,
  type GalleryItem,
  type GalleryMainId,
  type GalleryLeafId,
  type GalleryMainCategory,
  type GallerySubcategory,
} from '../data/content';
import { PetalDivider } from './FloralAccents';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const formatHuf = (n: number) => n.toLocaleString('hu-HU').replace(/,/g, ' ');

function pillClass(active: boolean, size: 'main' | 'sub' = 'main') {
  const padding = size === 'sub' ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-sm';
  return `relative rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 ${padding} ${
    active
      ? 'bg-gradient-to-r from-blush-400 to-warmrose-400 text-white shadow-soft'
      : 'border border-blush-200 bg-white/80 text-ink-700 hover:border-blush-300 hover:text-blush-500'
  }`;
}

export default function Gallery() {
  const [mainId, setMainId] = useState<GalleryMainId | null>(null);
  const [leafId, setLeafId] = useState<GalleryLeafId | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedMain = useMemo(
    () => galleryCategories.find((category) => category.id === mainId) ?? null,
    [mainId],
  );

  const leafMeta = leafId ? getGalleryLeafMeta(leafId) : null;

  const items = useMemo(
    () => (leafId ? galleryItems.filter((item) => item.category === leafId) : []),
    [leafId],
  );

  const selectedItem = selectedIndex !== null ? items[selectedIndex] ?? null : null;

  const resetRevealState = () => {
    setIsExpanded(false);
    setSelectedIndex(null);
  };

  const handleMainClick = (category: GalleryMainCategory) => {
    resetRevealState();
    if (mainId === category.id) {
      setMainId(null);
      setLeafId(null);
      return;
    }
    setMainId(category.id);
    if (category.children?.length) {
      setLeafId(null);
    } else {
      setLeafId(category.id as GalleryLeafId);
    }
  };

  const handleSubClick = (sub: GallerySubcategory) => {
    resetRevealState();
    setLeafId((current) => (current === sub.id ? null : sub.id));
  };

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : items.length - 1) : null));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev < items.length - 1 ? prev + 1 : 0) : null));
  }, [items.length]);

  const emptyCopy =
    mainId === 'gyuruk' && !leafId
      ? 'Válaszd ki a gyűrű típusát — Mithril gyűrűk vagy Csepp gyűrűk —, hogy lásd a darabokat és a kezdőárat.'
      : 'Válassz egy kategóriát, hogy megtekinthesd a képeket és az árakat.';

  return (
    <section id="galeria" className="relative overflow-hidden bg-cream-100/80 bg-watercolor-edge py-24 sm:py-32">
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
          className="mt-10"
        >
          <div
            role="group"
            aria-label="Kategória"
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={mainId === category.id}
                onClick={() => handleMainClick(category)}
                className={pillClass(mainId === category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {selectedMain?.children && (
              <motion.div
                key="subcategories"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div
                  role="group"
                  aria-label="Gyűrű típusa"
                  className="mt-3 flex flex-wrap items-center justify-center gap-2"
                >
                  {selectedMain.children.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      aria-pressed={leafId === sub.id}
                      onClick={() => handleSubClick(sub)}
                      className={pillClass(leafId === sub.id, 'sub')}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {!leafId ? (
            <motion.div
              key="empty"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="mx-auto mt-14 flex max-w-xl flex-col items-center rounded-3xl border border-blush-100 bg-white/70 px-6 py-12 text-center shadow-glass"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush-50 text-blush-400">
                <Images className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg">{emptyCopy}</p>
            </motion.div>
          ) : (
            <motion.div
              key={leafId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
            >
              {leafMeta && (
                <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-2 text-center">
                  <p className="inline-flex items-center gap-2 rounded-full border border-blush-200/70 bg-white/80 px-4 py-1.5 text-sm font-medium text-ink-700 shadow-glass">
                    <Tag className="h-4 w-4 text-blush-400" aria-hidden />
                    Kezdőár: {formatHuf(leafMeta.priceFrom)} Ft-tól
                  </p>
                  <p className="text-sm leading-relaxed text-ink-500">
                    Tájékoztató ár – a végleges összeg a konzultáción dől el.
                  </p>
                </div>
              )}

              <div className="relative mt-10">
                <motion.div
                  layout
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => {
                      const isHiddenOnMobile = index >= 3 && !isExpanded;
                      return (
                        <GalleryCard
                          key={item.id}
                          item={item}
                          isHiddenOnMobile={isHiddenOnMobile}
                          onClick={() => setSelectedIndex(index)}
                        />
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {!isExpanded && items.length > 3 && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream-100/95 via-cream-100/60 to-transparent sm:hidden" />
                )}
              </div>

              {items.length > 3 && (
                <div className="relative z-10 mt-8 flex justify-center sm:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      if (isExpanded) {
                        setIsExpanded(false);
                        document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setIsExpanded(true);
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white/90 px-6 py-2.5 text-sm font-medium text-ink-700 shadow-soft transition-all duration-300 hover:border-blush-300 hover:text-blush-500 hover:shadow-soft-lg active:scale-95"
                  >
                    {isExpanded ? (
                      <>
                        Kevesebb mutatása
                        <ChevronUp className="h-4 w-4 text-blush-400" />
                      </>
                    ) : (
                      <>
                        Több mutatása (+{items.length - 3})
                        <ChevronDown className="h-4 w-4 text-blush-400" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Lightbox
        item={selectedItem}
        currentIndex={selectedIndex}
        totalCount={items.length}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}

function GalleryCard({
  item,
  isHiddenOnMobile,
  onClick,
}: {
  item: GalleryItem;
  isHiddenOnMobile: boolean;
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const label = getGalleryLeafMeta(item.category).label;

  return (
    <motion.article
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-petal ring-1 ring-blush-200/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow hover:ring-blush-300 ${
        isHiddenOnMobile ? 'hidden sm:block' : 'block'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        {!isLoaded && <div className="absolute inset-0 shimmer-mask bg-cream-200/60" />}
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink-800 opacity-0 shadow-soft backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[11px] font-medium uppercase tracking-wider text-blush-200">{label}</p>
          <h3 className="mt-1 font-serif text-xl leading-snug">{item.title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-2 px-5 py-4">
        <Heart className="h-4 w-4 shrink-0 text-blush-300" />
        <p className="text-sm leading-relaxed text-ink-600">{item.caption}</p>
      </div>
    </motion.article>
  );
}

function Lightbox({
  item,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem | null;
  currentIndex: number | null;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const leafMeta = item ? getGalleryLeafMeta(item.category) : null;

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && currentIndex !== null && leafMeta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-x-0 inset-y-0 z-[60] flex items-center justify-center bg-ink-900/80 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-glass lg:grid-cols-2 ring-1 ring-blush-100"
          >
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
              <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold text-ink-700 shadow-glass backdrop-blur-md">
                {currentIndex + 1} / {totalCount}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Bezárás"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-glass backdrop-blur-md transition-colors hover:bg-blush-100 hover:text-blush-500"
            >
              <X className="h-5 w-5" />
            </button>

            {totalCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                  }}
                  aria-label="Előző kép"
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink-800 shadow-glass backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  aria-label="Következő kép"
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink-800 shadow-glass backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-95 lg:right-auto lg:left-[calc(50%-1.25rem)]"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="relative aspect-square lg:aspect-auto">
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-200/20 to-transparent lg:bg-gradient-to-r" />
            </div>

            <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
              <span className="w-fit rounded-full bg-cream-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blush-500 border border-blush-200/50">
                {leafMeta.label}
              </span>
              <h3 className="font-cormorant text-3xl font-semibold leading-snug text-ink-900 sm:text-4xl">
                {item.title}
              </h3>
              <p className="flex items-start gap-2 text-base leading-relaxed text-ink-600">
                <Heart className="mt-1 h-4 w-4 shrink-0 text-blush-300" />
                {item.caption}
              </p>
              <p className="text-sm font-medium text-ink-700">
                Kezdőár: {formatHuf(leafMeta.priceFrom)} Ft-tól
              </p>
              <p className="text-sm leading-relaxed text-ink-600">
                Ez egy korábbi, egyedi elkészítésű darab. A te ékszered a
                saját mintáidból, a saját történetedből fog megszületni –
                beszéljük meg közösen a részleteket.
              </p>
              <a
                href="#kapcsolat"
                onClick={onClose}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blush-400 to-warmrose-400 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-[1.03]"
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
