import { motion } from 'framer-motion';
import { uvLabel } from '../utils/format';

export default function UVIndex({ uvi }) {
  const known = typeof uvi === 'number';
  const pct = known ? Math.min(100, (uvi / 11) * 100) : 0;
  const label = uvLabel(uvi);

  const toneMap = {
    Low: '#4ade80',
    Moderate: '#fbbf24',
    High: '#fb923c',
    'Very High': '#f97362',
    Extreme: '#fb7185',
    Unknown: 'var(--text-muted)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass"
      style={{ padding: '20px 22px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="eyebrow">UV Index</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 999,
            background: `${toneMap[label]}22`,
            color: toneMap[label],
          }}
        >
          {label.toUpperCase()}
        </span>
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, marginTop: 8 }}>
        {known ? Math.round(uvi) : '—'}
      </div>

      <div
        style={{
          marginTop: 14,
          height: 8,
          borderRadius: 999,
          background:
            'linear-gradient(90deg, #4ade80 0%, #fbbf24 35%, #fb923c 60%, #fb7185 100%)',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: '50%',
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#fff',
            border: '3px solid #150f2e',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10,
          color: 'var(--text-muted)',
          marginTop: 8,
        }}
      >
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
        <span>Extreme</span>
      </div>
      {!known && (
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>
          UV data unavailable for this API key tier.
        </div>
      )}
    </motion.div>
  );
}
