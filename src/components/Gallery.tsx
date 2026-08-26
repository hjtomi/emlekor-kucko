import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Maximize2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';
import {
  galleryItems,
  galleryCategories,
  galleryPrices,
  galleryPriceExtras,
  galleryLeafExtras,
  galleryPrioritySurcharge,
  galleryLeafDescriptions,
  getGalleryLeafMeta,
  allowsPrioritySurcharge,
  GALLERY_FILLING_LABELS,
  type GalleryItem,
  type GalleryMainId,
  type GalleryLeafId,
  type GalleryMainCategory,
  type GallerySubcategory,
  type GalleryPriceTable,
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

function extraLine(extra: { label: string; amount: number; unit?: 'hour' | 'flat' }) {
  const suffix = extra.unit === 'flat' ? ' Ft' : ' Ft/óra';
  return `+ ${extra.label}: ${formatHuf(extra.amount)}${suffix}`;
}

function PriceExtrasNote({
  showHourlyExtras,
  showPriority,
  leafExtras,
}: {
  showHourlyExtras: boolean;
  showPriority: boolean;
  leafExtras: { label: string; amount: number; unit?: 'hour' | 'flat' }[];
}) {
  const lines: string[] = [];
  if (showHourlyExtras) {
    lines.push(...galleryPriceExtras.map(extraLine));
  }
  lines.push(...leafExtras.map(extraLine));
  if (showPriority) {
    lines.push(galleryPrioritySurcharge);
  }
  if (lines.length === 0) return null;

  return (
    <p className="mt-4 text-center text-sm leading-relaxed text-ink-500">
      {lines.map((line, index) => (
        <span key={line}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </p>
  );
}

function pillClass(active: boolean, size: 'main' | 'sub' = 'main') {
  const shape =
    size === 'sub'
      ? 'rounded-full px-4 py-2 text-sm leading-snug'
      : 'rounded-2xl px-5 py-3 text-sm leading-snug';
  return `relative font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 focus-visible:ring-offset-2 ${shape} ${
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
    setLeafId(category.children.length === 1 ? category.children[0].id : null);
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
    mainId === 'ezust-otvozet'
      ? 'Válaszd ki a gyűrű típusát — Mithril gyűrűk vagy Csepp gyűrűk —, hogy lásd a darabokat és az árakat.'
      : mainId === 'nemesacel'
        ? 'Válaszd ki a típust, hogy lásd a darabokat és az árakat.'
        : mainId === 'dns-mentes'
          ? 'Válaszd ki a típust — DNS mentes emlék gyöngy vagy paracord női karkötő —, hogy lásd a darabokat és az árakat.'
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
            Árak és galéria
          </span>
          <h2 className="mt-3 font-serif text-4xl text-ink-900 sm:text-5xl">
            Milyen emléket őriznél?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
            Először válaszd ki a kategóriát, majd a típust. A képek korábbi,
            egyedi darabok. Az árak tájékoztatóak; a tied a saját
            mintáidból készül.
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
            className="mx-auto grid max-w-4xl grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={mainId === category.id}
                onClick={() => handleMainClick(category)}
                className={`${pillClass(mainId === category.id)} flex w-full items-center justify-center text-center`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {selectedMain && selectedMain.children.length > 1 && (
              <motion.div
                key={`subcategories-${selectedMain.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div
                  role="group"
                  aria-label={
                    selectedMain.id === 'ezust-otvozet' ? 'Gyűrű típusa' : 'Ékszer típusa'
                  }
                  className="mt-3 flex flex-wrap items-center justify-center gap-2"
                >
                  {selectedMain.children.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      aria-pressed={leafId === sub.id}
                      onClick={() => handleSubClick(sub)}
                      className={`${pillClass(leafId === sub.id, 'sub')} text-center`}
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
              <GalleryPriceBlock leafId={leafId} />

              <div className="relative mt-10">
                <motion.div
                  layout
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    leafId === 'ajandekutalvanyok'
                      ? 'grid grid-cols-1 gap-6 lg:grid-cols-2'
                      : 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
                  }
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

function hasFillingPrices(table: GalleryPriceTable) {
  return table.rows.some((row) => row.filling === 'milk-or-hair' || row.filling === 'hair');
}

function GalleryPriceBlock({ leafId }: { leafId: GalleryLeafId }) {
  const table = galleryPrices[leafId];
  const copy = galleryLeafDescriptions[leafId];
  const fillingPrices = hasFillingPrices(table);

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-blush-100 bg-white/70 px-5 py-6 shadow-glass sm:px-8 sm:py-8">
      <div className="text-center">
        <h3 className="font-serif text-2xl text-ink-900 sm:text-3xl">{copy.heading}</h3>
        {copy.quote && (
          <blockquote className="mx-auto mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-ink-700 sm:text-xl">
            „{copy.quote}”
          </blockquote>
        )}
        {copy.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base"
          >
            {paragraph}
          </p>
        ))}
        {copy.specs.length > 0 && (
          <ul className="mx-auto mt-4 max-w-xl space-y-1 text-sm leading-relaxed text-ink-700 sm:text-base">
            {copy.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        )}
        {copy.contactNote && (
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-blush-500 sm:text-base">
            {copy.contactNote}
          </p>
        )}
      </div>
      {table.rows.length > 0 && <PriceList table={table} />}
      <PriceExtrasNote
        showHourlyExtras={fillingPrices}
        showPriority={allowsPrioritySurcharge(leafId)}
        leafExtras={galleryLeafExtras[leafId] ?? []}
      />
      <p className="mt-3 text-center text-sm leading-relaxed text-ink-500">
        {fillingPrices
          ? 'Tájékoztató árak. A fotók példák – a töltést rendeléskor választod. Egyedi daraboknál a konzultáció dönt.'
          : table.rows.length > 0
            ? 'Tájékoztató árak. A fotók példák – egyedi daraboknál a konzultáció dönt.'
            : 'A fotók példák. A részleteket a konzultáción egyeztetjük.'}
      </p>
    </div>
  );
}

function PriceList({ table }: { table: GalleryPriceTable }) {
  const metal = table.metals[0];

  return (
    <ul className="mx-auto mt-6 max-w-md divide-y divide-blush-100/80 border-t border-blush-100/80 pt-2">
      {table.rows.map((row) => {
        const amount = metal ? row.prices[metal] : undefined;
        if (amount == null) return null;
        return (
          <li key={row.filling} className="flex items-baseline justify-between gap-4 py-2.5">
            <span className="text-sm text-ink-700">{GALLERY_FILLING_LABELS[row.filling]}</span>
            <span className="font-cormorant text-2xl font-semibold text-ink-900">
              {formatHuf(amount)} Ft
            </span>
          </li>
        );
      })}
    </ul>
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
  const showFullImage = item.category === 'ajandekutalvanyok';

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
      <div
        className={`relative overflow-hidden ${
          showFullImage ? 'aspect-[3/2] bg-cream-50' : 'aspect-[4/5] bg-cream-100'
        }`}
      >
        {!isLoaded && <div className="absolute inset-0 shimmer-mask bg-cream-200/60" />}
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full transition-all duration-700 ${
            showFullImage ? 'object-contain' : 'object-cover group-hover:scale-110'
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {!showFullImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        )}

        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink-800 opacity-0 shadow-soft backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>

        {!showFullImage && (
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-[11px] font-medium uppercase tracking-wider text-blush-200">{label}</p>
            <h3 className="mt-1 font-serif text-xl leading-snug">{item.title}</h3>
          </div>
        )}
      </div>
      {showFullImage && (
        <div className="px-5 py-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-blush-400">{label}</p>
          <h3 className="mt-1 font-serif text-xl leading-snug text-ink-900">{item.title}</h3>
        </div>
      )}
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
      {item && currentIndex !== null && (
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
            className={`relative w-full overflow-hidden rounded-3xl bg-ink-900 shadow-glass ring-1 ring-blush-100/30 ${
              item.category === 'ajandekutalvanyok' ? 'max-w-5xl' : 'max-w-3xl'
            }`}
          >
            <div className="absolute left-4 top-4 z-10">
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
                  className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink-800 shadow-glass backdrop-blur-md transition-all hover:scale-110 hover:bg-white active:scale-95"
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
                  className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink-800 shadow-glass backdrop-blur-md transition-all hover:scale-110 hover:bg-white active:scale-95"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {item.category === 'ajandekutalvanyok' ? (
              <div className="bg-cream-50">
                <div className="flex max-h-[80vh] w-full items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="max-h-[80vh] w-full object-contain"
                  />
                </div>
                <div className="px-6 py-4">
                  <h3 className="font-cormorant text-2xl font-semibold text-ink-900 sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/5] max-h-[85vh] w-full sm:aspect-[3/4]">
                <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent px-6 pb-6 pt-16">
                  <h3 className="font-cormorant text-2xl font-semibold text-white sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
