import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { windDirLabel, aqiLabel } from '../utils/format';

export default function WindAirQuality({ wind, air }) {
  const aqi = air?.list?.[0]?.main?.aqi;
  const known = typeof aqi === 'number';
  const pct = known ? (aqi / 5) * 100 : 0;

  const toneMap = { Good: '#4ade80', Fair: '#a3e635', Moderate: '#fbbf24', Poor: '#fb923c', 'Very Poor': '#fb7185' };
  const label = known ? aqiLabel(aqi) : 'Unknown';
  const color = toneMap[label] || 'var(--text-muted)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.62 }}
      className="glass"
      style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
    >
      <div>
        <span className="eyebrow">Wind & Air Quality</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              border: '1px solid var(--border-soft)',
              display: 'grid',
              placeItems: 'center',
              position: 'relative',
            }}
          >
            <motion.div
              animate={{ rotate: wind.deg }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'grid', placeItems: 'center' }}
            >
              <Navigation size={20} color="#8fb0ff" strokeWidth={2} />
            </motion.div>
          </div>
          <div>
            <div className="eyebrow">Wind Dir</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{Math.round(wind.deg)}° {windDirLabel(wind.deg)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              Gust: {(wind.gust ?? wind.speed).toFixed(0)} km/h
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <RingGauge pct={pct} color={color} display={known ? aqi : '—'} />
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>{label}</div>
      </div>
    </motion.div>
  );
}

function RingGauge({ pct, color, display }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: 76, height: 76 }}>
      <svg width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <motion.circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (pct / 100) * c }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          transform="rotate(-90 38 38)"
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{display}</div>
          <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>AQI (1-5)</div>
        </div>
      </div>
    </div>
  );
}
