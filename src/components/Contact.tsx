import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { contactInfo } from '../data/content';
import { PetalDivider } from './FloralAccents';

const STEPS = [
  { num: '01', title: 'Kapcsolatfelvétel & megbeszélés', text: 'E-mailben vagy telefonon felvesszük a kapcsolatot, és átbeszéljük az elképzelésedet.' },
  { num: '02', title: 'A minta biztonságos elküldése', text: 'Az anyatejet vagy hajtincset diszkrét, biztonságos csomagolásban küldöd el nekem.' },
  { num: '03', title: 'Az ékszer elkészítése szeretettel', text: 'Gondos kézi munkával elkészítem a te egyedi emlékőrző ékszeredet.' },
];

const MATERIAL_OPTIONS = [
  { value: 'anyatej', label: 'Anyatej' },
  { value: 'hajtincs', label: 'Hajtincs' },
  { value: 'mindkettő', label: 'Mindkettő' },
  { value: 'egyéb', label: 'Egyéb' },
];

export default function Contact() {
  return (
    <section id="kapcsolat" className="relative overflow-hidden bg-petal-gradient py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush-400">
            Kapcsolat
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink-900 sm:text-5xl">
            Kérdésed van, vagy megosztanád velem az elképzelésed?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-700 sm:text-lg">
            Szívesen beszélgetek veled – minden kérdésre válaszolok, és közösen
            kitaláljuk, hogyan őrizzük meg a te emlékedet.
          </p>
          <PetalDivider className="mt-6" />
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h3 className="font-serif text-2xl text-ink-900">Hogyan zajlik a folyamat?</h3>
            <div className="mt-7 flex flex-col gap-6">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-blush-100">
                    <span className="font-serif text-lg text-blush-400">{s.num}</span>
                  </span>
                  <div>
                    <h4 className="font-serif text-lg text-ink-900">{s.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{s.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 rounded-2xl bg-white/80 p-6 shadow-petal ring-1 ring-blush-100 backdrop-blur">
              <ContactRow icon={Mail} label="E-mail" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
              <ContactRow icon={Phone} label="Telefon" value={contactInfo.phone} href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} />
              <ContactRow icon={MapPin} label="Helyszín" value={contactInfo.location} />
              <p className="mt-1 flex items-center gap-2 border-t border-blush-100 pt-3 text-xs text-ink-600">
                <ShieldCheck className="h-4 w-4 text-sage-300" />
                A mintádat a legnagyobb diszkrécióval kezelem.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative rounded-3xl bg-white p-7 shadow-soft-lg ring-1 ring-blush-100 sm:p-9"
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5"
              noValidate
            >
              <div className="flex items-center gap-2 text-ink-800">
                <MessageCircle className="h-5 w-5 text-blush-400" />
                <h3 className="font-serif text-2xl">Írj nekem üzenetet</h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Név" name="name" required placeholder="A te neved" />
                <Field label="E-mail cím" name="email" type="email" required placeholder="te@email.hu" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Telefonszám (opcionális)" name="phone" type="tel" placeholder="+36 30 ..." />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="material" className="text-sm font-medium text-ink-800">
                    Miből szeretnél ékszert? <span className="text-warmrose-400">*</span>
                  </label>
                  <select
                    id="material"
                    name="material"
                    required
                    defaultValue=""
                    className="rounded-xl border border-blush-200 bg-blush-50/40 px-4 py-3 text-sm text-ink-800 outline-none transition-all focus:border-blush-300 focus:bg-white focus:ring-2 focus:ring-blush-200/60"
                  >
                    <option value="" disabled>Válassz egyet…</option>
                    {MATERIAL_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-ink-800">
                  Üzenet / Elképzelésed
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Mesélj arról, milyen emléket szeretnél megőrizni..."
                  className="resize-none rounded-xl border border-blush-200 bg-blush-50/40 px-4 py-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-600/60 focus:border-blush-300 focus:bg-white focus:ring-2 focus:ring-blush-200/60"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-300 to-warmrose-300 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:scale-[1.02]"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                Üzenet küldése
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3.5 rounded-xl px-2 py-2 transition-colors hover:bg-blush-50/60">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush-100 text-blush-400">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-500">{label}</p>
        <p className="text-sm font-medium text-ink-800">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink-800">
        {label} {required && <span className="text-warmrose-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-blush-200 bg-blush-50/40 px-4 py-3 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-600/60 focus:border-blush-300 focus:bg-white focus:ring-2 focus:ring-blush-200/60"
      />
    </div>
  );
}
