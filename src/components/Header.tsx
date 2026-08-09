import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Rólam', href: '#rolam' },
  { label: 'Galéria', href: '#galeria' },
  { label: 'Árak', href: '#arak' },
  { label: 'Gyik', href: '#gyakori-kerdesek' },
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    
    // Allow state to update and menu exit animation to start, then scroll to section
    setTimeout(() => {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="group flex items-center gap-2.5">
          <img
            src="/images/LogoNewer.png"
            alt=""
            className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
            aria-hidden="true"
          />
          <span className="font-cormorant text-2xl font-semibold tracking-wide text-ink-900 sm:text-3xl">
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
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blush-400 to-warmrose-400 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-[1.03]"
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
            className="overflow-hidden border-t border-blush-100/60 bg-cream-50/95 backdrop-blur md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-cream-100 hover:text-blush-500"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#kapcsolat"
                onClick={(e) => handleNavClick(e, '#kapcsolat')}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blush-400 to-warmrose-400 px-5 py-3 text-sm font-semibold text-white shadow-soft"
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
