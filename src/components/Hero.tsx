import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, ArrowDown } from 'lucide-react';
import { FloralSpray, FloatingPetal, PetalDivider } from './FloralAccents';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-petal-gradient pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <FloralSpray className="pointer-events-none absolute -left-16 top-24 h-64 w-64 opacity-45 sm:left-0" />
      <FloralSpray
        className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 opacity-40 [transform:rotate(140deg)]"
        colors={['#C9A09A', '#C9BDB6', '#A8B8A4']}
      />
      <FloatingPetal className="pointer-events-none absolute left-[12%] top-[30%] h-6 w-6" color="#E8D4CE" />
      <FloatingPetal
        className="pointer-events-none absolute right-[18%] top-[55%] h-5 w-5"
        color="#D4A5A0"
      />
      <FloatingPetal className="pointer-events-none absolute left-[60%] top-[20%] h-4 w-4" color="#EDE4D8" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-blush-200/60 bg-cream-50/80 px-4.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-blush-500 shadow-glass backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-blush-400" />
            Kézzel készült emlékőrző ékszerek
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 font-cormorant text-6xl font-semibold leading-[1.02] tracking-tight text-ink-900 sm:text-7xl lg:text-8xl"
          >
            Emlékőr Kuckó
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 font-cormorant text-2xl italic text-blush-500 sm:text-3xl"
          >
            Simon Szabina egyedi gyanta ékszerei Anyatejből és bármely korosztály hajából
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-700 lg:mx-0 sm:text-lg"
          >
            Vannak pillanatok amiket szeretnénk örökre megőrizni. Ezek az emlékőr ékszerek sokkal többről szólnak, mint ami kívülről látszik, hiszen a te történeted van benne.
            <br /><br />
            Egy csepp anyatej, köldök csonk, vagy féltve őrzött hajszálak ékszerbe zárva.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="#kapcsolat"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-400 to-warmrose-400 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              <HeartHandshake className="h-4 w-4" />
              Üzenj nekem
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#galeria"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-blush-200 bg-cream-50/80 px-6 py-3.5 text-sm font-semibold text-ink-800 transition-all duration-300 hover:bg-cream-50 hover:shadow-soft active:scale-95 sm:w-auto"
            >
              Árak és galéria
            </a>
          </motion.div>

          <div className="mt-12 hidden justify-center lg:flex lg:justify-start">
            <PetalDivider />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl"
        >
          <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-blush-100 via-cream-200 to-champagne-200 opacity-80 blur-[2px]" />
          <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-tr from-blush-200/80 to-cream-300 opacity-70" />
          <div className="relative overflow-hidden rounded-[2rem] bg-cream-100 p-1.5 shadow-soft-lg ring-1 ring-cream-300/80 sm:p-2">
            <img
              src="/images/HeaderKep.png"
              alt="Emlékőr kuckó – Simon Szabina egyedi gyanta ékszerei"
              className="h-auto w-full rounded-[1.6rem]"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
