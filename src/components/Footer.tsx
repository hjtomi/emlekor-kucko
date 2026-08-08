import { motion } from 'framer-motion';
import { Facebook, Instagram, Heart } from 'lucide-react';
import { contactInfo } from '../data/content';
import { CornerBlossom } from './FloralAccents';

const NAV_LINKS = [
  { label: 'Rólam', href: '#rolam' },
  { label: 'Galéria', href: '#galeria' },
  { label: 'Árak', href: '#arak' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink-900 px-5 pt-16 pb-8 text-center sm:px-8">
      <CornerBlossom className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 opacity-25" color="#D4A5A0" />
      <CornerBlossom
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 opacity-20 [transform:rotate(160deg)]"
        color="#C9BDB6"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto flex max-w-3xl flex-col items-center"
      >
        <a href="#hero" className="group flex items-center gap-2.5">
          <img
            src="/images/LogoNewer.png"
            alt=""
            className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
            aria-hidden="true"
          />
          <span className="font-serif text-2xl text-white">Emlékőr Kuckó</span>
        </a>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600">
          Egyedi gyanta ékszerek anyatejből és hajból – kézzel, szeretettel,
          az emlékek megőrzéséért.
        </p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-600 transition-colors hover:text-blush-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="mt-7 flex items-center gap-3">
          <a
            href={contactInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-blush-300 hover:text-ink-900 hover:scale-110"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-blush-300 hover:text-ink-900 hover:scale-110"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-9 w-full border-t border-white/10 pt-6" />

        <p className="flex items-center justify-center gap-1.5 text-xs text-ink-600">
          © {year} Emlékőr Kuckó · Simon Szabina ·
          <span className="inline-flex items-center gap-1">
            készült <Heart className="h-3 w-3 text-blush-300" fill="currentColor" /> szeretettel
          </span>
        </p>
      </motion.div>
    </footer>
  );
}
