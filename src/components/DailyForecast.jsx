import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { formatWeekday, formatTemp } from '../utils/format';

export default function DailyForecast({ days, unit }) {
  if (!days?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.42 }}
      className="glass"
      style={{ padding: '22px', height: '100%' }}
    >
      <span className="eyebrow">5-Day Outlook</span>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {days.map((d, i) => {
          const Icon = getWeatherIcon(d.icon);
          const pop = Math.round(d.pop * 100);
          return (
            <motion.div
              key={d.dt}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.46 + i * 0.05 }}
              whileHover={{ background: 'var(--bg-card-hover)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 12px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 90 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{formatWeekday(d.dt, d.isToday)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' }}>
                <Icon size={18} color="#cdc4ff" strokeWidth={1.7} />
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 12,
                    color: '#7fb8ff',
                    minWidth: 40,
                  }}
                >
                  <Droplet size={11} />
                  {pop}%
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, minWidth: 70, justifyContent: 'flex-end' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{formatTemp(d.max, unit)}</span>
                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{formatTemp(d.min, unit)}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
