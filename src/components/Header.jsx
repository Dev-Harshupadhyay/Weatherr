import { motion } from 'framer-motion';
import { CloudSun } from 'lucide-react';
import { useClock } from '../hooks/useClock';
import { formatFullDate, formatClock } from '../utils/format';
import { APP_META } from '../config';

export default function Header() {
  const now = useClock();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 4px 26px',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 13,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #7c5cff, #4f7cff)',
          }}
        >
          <CloudSun size={22} color="#fff" strokeWidth={1.8} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '0.01em' }}>
            {APP_META.name.toUpperCase()}
          </div>
          <div className="eyebrow">{APP_META.tagline}</div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div className="eyebrow">{formatFullDate(now)}</div>
        <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
          {formatClock(now)}
        </div>
      </div>
    </motion.header>
  );
}
