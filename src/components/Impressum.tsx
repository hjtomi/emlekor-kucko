import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

type Fact = {
  label: string;
  value: string;
  href?: string;
};

const PROVIDER: Fact[] = [
  { label: 'Szolgáltató neve', value: 'Simon Szabina egyéni vállalkozó' },
  { label: 'Márkanév', value: 'Emlékőr Kuckó' },
  { label: 'Székhely', value: '3300 Eger, Deák Ferenc utca 80. as 4.' },
  { label: 'E-mail', value: 'darmos.szabina@gmail.com', href: 'mailto:darmos.szabina@gmail.com' },
  { label: 'Adószám', value: '49352339-1-30' },
  { label: 'Nyilvántartási szám', value: '59052542' },
  { label: 'Nyilvántartó hatóság', value: 'Nemzeti Adó- és Vámhivatal' },
];

const HOST_LINES = ['Vercel Inc.', '440 N Barranca Ave #4133', 'Covina, CA 91723, USA'];

const COPYRIGHT =
  'Az oldalon található szövegek, fényképek és egyéb tartalmak Simon Szabina tulajdonát képezik, azok másolása, felhasználása csak a hozzájárulásával lehetséges.';

export default function Impressum() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      } else {
        triggerRef.current?.focus();
      }
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="mt-4 inline-flex items-center rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium tracking-wide text-blush-200/90 transition-colors hover:border-blush-300/50 hover:bg-white/10 hover:text-white"
      >
        Impresszum
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-900/60 p-4 backdrop-blur-sm sm:items-center"
            >
              <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-[min(40rem,calc(100vh-2rem))] w-full max-w-lg overflow-y-auto rounded-3xl bg-cream-50 px-6 py-7 text-left shadow-soft-lg ring-1 ring-blush-100 sm:px-8"
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Bezárás"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-100 hover:text-blush-500"
                >
                  <X className="h-5 w-5" />
                </button>

                <h2
                  id={titleId}
                  className="pr-10 font-cormorant text-4xl font-semibold tracking-tight text-ink-900"
                >
                  Impresszum
                </h2>

                <dl className="mt-6 space-y-3">
                  {PROVIDER.map((fact) => (
                    <div key={fact.label} className="grid gap-0.5 sm:grid-cols-[11.5rem_1fr] sm:gap-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-600">
                        {fact.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink-800">
                        {fact.href ? (
                          <a
                            href={fact.href}
                            className="underline decoration-blush-200 underline-offset-2 transition-colors hover:text-blush-500"
                          >
                            {fact.value}
                          </a>
                        ) : (
                          fact.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 border-t border-blush-100 pt-5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-600">
                    Tárhelyszolgáltató
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800">
                    {HOST_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a
                      href="mailto:privacy@vercel.com"
                      className="mt-1 inline-block underline decoration-blush-200 underline-offset-2 transition-colors hover:text-blush-500"
                    >
                      privacy@vercel.com
                    </a>
                  </p>
                </div>

                <p className="mt-6 border-t border-blush-100 pt-5 text-sm leading-relaxed text-ink-700">
                  <span className="font-semibold text-ink-800">Szerzői jogok: </span>
                  {COPYRIGHT}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
