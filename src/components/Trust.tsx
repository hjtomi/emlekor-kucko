import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShieldCheck, X } from 'lucide-react';
import { testimonials, trustStats, type Testimonial, type TestimonialPiece } from '../data/content';
import { PetalDivider } from './FloralAccents';

function isPlaceholderImage(image: string) {
  return image.includes('placeholder');
}

export default function Trust() {
  const [lightbox, setLightbox] = useState<{ testimonialId: string; index: number } | null>(null);

  const activeTestimonial = lightbox
    ? testimonials.find((item) => item.id === lightbox.testimonialId) ?? null
    : null;
  const activePiece =
    activeTestimonial && lightbox ? activeTestimonial.pieces[lightbox.index] ?? null : null;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback(() => {
    if (!activeTestimonial) return;
    setLightbox((current) => {
      if (!current) return current;
      const last = activeTestimonial.pieces.length - 1;
      return { ...current, index: current.index === 0 ? last : current.index - 1 };
    });
  }, [activeTestimonial]);

  const showNext = useCallback(() => {
    if (!activeTestimonial) return;
    setLightbox((current) => {
      if (!current) return current;
      const last = activeTestimonial.pieces.length - 1;
      return { ...current, index: current.index === last ? 0 : current.index + 1 };
    });
  }, [activeTestimonial]);

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
              className="flex flex-col overflow-hidden rounded-2xl border border-blush-100 bg-cream-50/90 shadow-petal ring-1 ring-blush-100/80 transition-all duration-300 hover:-translate-y-1 hover:bg-cream-50 hover:shadow-soft"
            >
              <PieceStrip
                pieces={item.pieces}
                onOpen={(index) => setLightbox({ testimonialId: item.id, index })}
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <Heart className="h-5 w-5 shrink-0 text-blush-300" strokeWidth={1.6} />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink-700">
                  „{item.quote}"
                </blockquote>
                <footer className="mt-6 border-t border-blush-100/80 pt-5">
                  <cite className="not-italic">
                    <span className="font-serif text-lg text-ink-900">{item.name}</span>
                    <span className="text-ink-500">, {item.location}</span>
                  </cite>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-blush-500">
                    {item.pieces.map((piece) => piece.label).join(' · ')}
                  </p>
                </footer>
              </div>
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

      <PieceLightbox
        testimonial={activeTestimonial}
        piece={activePiece}
        currentIndex={lightbox?.index ?? null}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
      />
    </section>
  );
}

function PieceStrip({
  pieces,
  onOpen,
}: {
  pieces: TestimonialPiece[];
  onOpen: (index: number) => void;
}) {
  const multi = pieces.length > 1;

  return (
    <div className={`grid gap-px bg-blush-100 ${multi ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {pieces.map((piece, index) => {
        const placeholder = isPlaceholderImage(piece.image);
        return (
          <button
            key={`${piece.image}-${index}`}
            type="button"
            disabled={placeholder}
            onClick={() => onOpen(index)}
            className={`relative overflow-hidden bg-cream-100 ${
              multi ? 'aspect-[3/4]' : 'aspect-square'
            } ${placeholder ? 'cursor-default' : 'cursor-pointer'}`}
            aria-label={placeholder ? piece.alt : `${piece.label} megnyitása`}
          >
            <img
              src={piece.image}
              alt={piece.alt}
              className={`h-full w-full ${
                piece.fit === 'contain' ? 'object-contain' : 'object-cover'
              }`}
            />
            {placeholder && (
              <span className="absolute inset-0 flex items-center justify-center bg-ink-600/10">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-600">
                  Placeholder
                </span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PieceLightbox({
  testimonial,
  piece,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  testimonial: Testimonial | null;
  piece: TestimonialPiece | null;
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const totalCount = testimonial?.pieces.length ?? 0;

  useEffect(() => {
    if (piece) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [piece]);

  useEffect(() => {
    if (!piece) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [piece, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {piece && testimonial && currentIndex !== null && (
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
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-cream-50 shadow-glass ring-1 ring-blush-100/30"
          >
            <div className="relative">
              {totalCount > 1 && (
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold text-ink-700 shadow-glass ring-1 ring-ink-900/10 backdrop-blur-md">
                    {currentIndex + 1} / {totalCount}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Bezárás"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-glass ring-1 ring-ink-900/10 backdrop-blur-md transition-colors hover:bg-blush-100 hover:text-blush-500"
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
                    className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-glass ring-1 ring-ink-900/10 backdrop-blur-md transition-all hover:scale-110 hover:bg-white active:scale-95"
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
                    className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-glass ring-1 ring-ink-900/10 backdrop-blur-md transition-all hover:scale-110 hover:bg-white active:scale-95"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              <div className="flex max-h-[75vh] w-full items-center justify-center bg-cream-100">
                <img
                  src={piece.image}
                  alt={piece.alt}
                  className="max-h-[75vh] w-full object-contain"
                />
              </div>
            </div>
            <div className="border-t border-blush-100/80 px-6 py-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-blush-400">
                {testimonial.name}
              </p>
              <h3 className="mt-0.5 font-cormorant text-2xl font-semibold text-ink-900 sm:text-3xl">
                {piece.label}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
