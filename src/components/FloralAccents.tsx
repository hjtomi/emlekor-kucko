import { motion } from 'framer-motion';

type AccentProps = {
  className?: string;
  colors?: string[];
};

export function FloralSpray({ className = '', colors = ['#FDA4AF', '#D8B4FE', '#A7F3D0'] }: AccentProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <g stroke={colors[0]} strokeWidth="1.4" strokeLinecap="round" opacity="0.65">
        <path d="M100 180 C 100 140, 100 110, 100 70" />
        <path d="M100 130 C 80 122, 66 112, 58 96" />
        <path d="M100 110 C 122 100, 138 86, 144 70" />
        <path d="M100 92 C 86 84, 76 74, 70 62" />
        <path d="M100 78 C 116 70, 128 60, 134 48" />
      </g>
      <g opacity="0.85">
        <ellipse cx="56" cy="92" rx="10" ry="6" transform="rotate(-30 56 92)" fill={colors[1]} />
        <ellipse cx="58" cy="96" rx="10" ry="6" transform="rotate(30 58 96)" fill={colors[1]} />
        <ellipse cx="148" cy="66" rx="10" ry="6" transform="rotate(30 148 66)" fill={colors[0]} />
        <ellipse cx="146" cy="72" rx="10" ry="6" transform="rotate(-30 146 72)" fill={colors[0]} />
        <ellipse cx="68" cy="58" rx="8" ry="5" transform="rotate(-40 68 58)" fill={colors[2]} />
        <ellipse cx="136" cy="46" rx="8" ry="5" transform="rotate(40 136 46)" fill={colors[2]} />
        <circle cx="100" cy="64" r="7" fill={colors[0]} />
        <circle cx="100" cy="64" r="3" fill="#FFFBF5" />
      </g>
    </svg>
  );
}

export function LeafBranch({ className = '' }: AccentProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <path
        d="M60 116 C 60 80, 60 56, 60 18"
        stroke="#A7F3D0"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      {[100, 84, 68, 52, 36].map((y, i) => (
        <g key={y} opacity="0.7">
          <ellipse
            cx={i % 2 === 0 ? 46 : 74}
            cy={y}
            rx="11"
            ry="5"
            transform={`rotate(${i % 2 === 0 ? -35 : 35} ${i % 2 === 0 ? 46 : 74} ${y})`}
            fill="#D1FAE5"
          />
        </g>
      ))}
    </svg>
  );
}

export function PetalDivider({ className = '' }: AccentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-blush-300" />
      <motion.svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-blush-400"
        fill="currentColor"
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2C9 6 9 10 12 12c3-2 3-6 0-10zM4 10c-2 3-1 6 2 7 2-3 1-6-2-7zm16 0c-3 1-4 4-2 7 3-1 4-4 2-7zM7 17c-1 3 1 5 4 4 0-3-2-5-4-4zm10 0c-2-1-4 1-4 4 3 1 5-1 4-4z" />
      </motion.svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-blush-300" />
    </div>
  );
}

export function CornerBlossom({ className = '', color = '#FDA4AF' }: AccentProps & { color?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" fill="none">
      <g opacity="0.55">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="80"
            cy="48"
            rx="14"
            ry="26"
            transform={`rotate(${deg} 80 80)`}
            fill={color}
            opacity="0.55"
          />
        ))}
        <circle cx="80" cy="80" r="10" fill="#FFFBF5" />
        <circle cx="80" cy="80" r="5" fill="#F472B6" opacity="0.7" />
      </g>
    </svg>
  );
}

export function FloatingPetal({ className = '', color = '#FBCFE8' }: AccentProps & { color?: string }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill={color}
      animate={{ y: [0, -16, 0], rotate: [0, 18, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M20 4 C 14 12, 14 22, 20 30 C 26 22, 26 12, 20 4 Z" opacity="0.7" />
    </motion.svg>
  );
}
