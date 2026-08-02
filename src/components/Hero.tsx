import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, ArrowDown } from 'lucide-react';
import { FloralSpray, FloatingPetal, PetalDivider } from './FloralAccents';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-petal-gradient pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <FloralSpray className="pointer-events-none absolute -left-16 top-24 h-64 w-64 opacity-70 sm:left-0" />
      <FloralSpray
        className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 opacity-60 [transform:rotate(140deg)]"
        colors={['#D8B4FE', '#FDA4AF', '#A7F3D0']}
      />
      <FloatingPetal className="pointer-events-none absolute left-[12%] top-[30%] h-6 w-6" color="#FBCFE8" />
      <FloatingPetal
        className="pointer-events-none absolute right-[18%] top-[55%] h-5 w-5"
        color="#F9A8D4"
      />
      <FloatingPetal className="pointer-events-none absolute left-[60%] top-[20%] h-4 w-4" color="#E9D5FF" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-blush-200/60 bg-white/80 px-4.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-blush-500 shadow-glass backdrop-blur-md"
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
            Egyedi gyanta ékszerek anyatejből és hajból
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-700 lg:mx-0 sm:text-lg"
          >
            Van néhány pillanat, amit nem akarunk elfelejteni – az első csepp
            anyatej, egy apró hajtincs, egy csecsemő legfinomabb emléke. Ezeket
            a kincseket gondos kézzel, gyantába foglalva időtlen ékszerré
            alakítom, hogy örökre veled maradhassanak.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="#kapcsolat"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-300 to-warmrose-300 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              <HeartHandshake className="h-4 w-4" />
              Vedd fel velem a kapcsolatot
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#galeria"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-blush-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink-800 transition-all duration-300 hover:bg-white hover:shadow-soft active:scale-95 sm:w-auto"
            >
              Galéria megtekintése
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
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tl-[5rem] rounded-br-[5rem] bg-gradient-to-br from-blush-100 via-white to-lavender-100 shadow-soft-lg ring-1 ring-white/60">
            <img
              src="https://images.pexels.com/photos/8895530/pexels-photo-8895530.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Kézzel készített gyanta medál, anyatejet és arany füstöt őrizve"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blush-100/40 via-transparent to-white/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute -left-4 top-10 hidden rounded-2xl glass-card px-5 py-3.5 shadow-glass sm:block"
          >
            <p className="font-cormorant text-3xl font-semibold text-blush-500">100%</p>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-600">kézi munka</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="absolute -right-4 bottom-16 hidden rounded-2xl glass-card px-5 py-3.5 shadow-glass sm:block"
          >
            <p className="font-cormorant text-3xl font-semibold text-blush-500">6+</p>
            <p className="text-xs font-medium uppercase tracking-wider text-ink-600">éve emlékeket őrzök</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
