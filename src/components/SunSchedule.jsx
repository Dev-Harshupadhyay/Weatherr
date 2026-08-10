import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';
import { formatTime } from '../utils/format';

export default function SunSchedule({ sunrise, sunset, timezone = 0 }) {
  const now = Date.now() / 1000 + timezone;
  const totalSpan = sunset - sunrise;
  const elapsed = Math.min(Math.max(now - sunrise, 0), totalSpan);
  const pct = totalSpan > 0 ? (elapsed / totalSpan) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.56 }}
      className="glass"
      style={{ padding: '20px 22px' }}
    >
      <span className="eyebrow">Sun Schedule</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}>
        <IconBlock icon={Sunrise} color="#fbbf24" />
        <div
          style={{
            flex: 1,
            height: 4,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.08)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${pct}%`,
              borderRadius: 999,
              background: 'linear-gradient(90deg, #fbbf24, #fb923c)',
            }}
          />
          <motion.div
            initial={{ left: '0%' }}
            animate={{ left: `${pct}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 12px rgba(251,191,36,0.8)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <IconBlock icon={Sunset} color="#8b5cf6" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
        <div>
          <div className="eyebrow">Sunrise</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>{formatTime(sunrise, timezone)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="eyebrow">Sunset</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>{formatTime(sunset, timezone)}</div>
        </div>
      </div>
    </motion.div>
  );
}

function IconBlock({ icon: Icon, color }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        background: `${color}22`,
      }}
    >
      <Icon size={17} color={color} strokeWidth={1.8} />
    </div>
  );
}
