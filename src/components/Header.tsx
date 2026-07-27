import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flower2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Rólam', href: '#rolam' },
  { label: 'Galéria', href: '#galeria' },
  { label: 'Árak', href: '#arak' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-petal border-b border-blush-100/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#hero" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 to-lavender-100 shadow-soft">
            <Flower2 className="h-5 w-5 text-blush-400" strokeWidth={1.6} />
          </span>
          <span className="font-serif text-xl tracking-wide text-ink-900 sm:text-2xl">
            Emlékőr Kuckó
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-ink-700 transition-colors hover:text-blush-500 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-blush-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#kapcsolat"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blush-300 to-warmrose-300 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-[1.03]"
          >
            Beszélgessünk
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink-800 shadow-petal md:hidden"
          aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-blush-100/60 bg-white/95 backdrop-blur md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-blush-50 hover:text-blush-500"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#kapcsolat"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blush-300 to-warmrose-300 px-5 py-3 text-sm font-semibold text-white shadow-soft"
              >
                Beszélgessünk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
