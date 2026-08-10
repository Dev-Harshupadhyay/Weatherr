import { motion } from 'framer-motion';
import { CloudDrizzle } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { formatHour, formatTemp } from '../utils/format';

export default function HourlyForecast({ list, unit }) {
  if (!list?.length) return null;
  const slots = list.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.35 }}
      className="glass"
      style={{ padding: '22px 22px 20px', marginTop: 14 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span className="eyebrow">24-Hour Forecast</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.05em',
            padding: '4px 10px',
            borderRadius: 999,
            background: 'rgba(79,124,255,0.18)',
            color: '#8fb0ff',
          }}
        >
          LIVE
        </span>
      </div>

      <div className="hscroll">
        {slots.map((slot, i) => {
          const Icon = getWeatherIcon(slot.weather[0].icon);
          const pop = Math.round((slot.pop ?? 0) * 100);
          return (
            <motion.div
              key={slot.dt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.04 }}
              className="glass-tight"
              style={{
                flex: '0 0 88px',
                padding: '14px 10px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-soft)',
              }}
            >
              <div className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {formatHour(slot.dt)}
              </div>
              <Icon size={24} strokeWidth={1.6} color="#cdc4ff" style={{ margin: '10px auto' }} />
              <div style={{ fontSize: 15, fontWeight: 700 }}>{formatTemp(slot.main.temp, unit)}</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  marginTop: 6,
                  fontSize: 11,
                  color: '#7fb8ff',
                }}
              >
                <CloudDrizzle size={11} />
                {pop}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
