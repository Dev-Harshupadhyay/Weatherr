import { motion } from 'framer-motion';
import { getWeatherIcon, conditionLabel } from '../utils/weatherIcons';
import { formatTemp } from '../utils/format';

export default function CurrentWeather({ current, place, unit, isMock, dataUpdatedAt }) {
  if (!current) return null;
  const { main, weather, name } = current;
  const condition = weather[0];
  const Icon = getWeatherIcon(condition.icon);
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="glass"
      style={{
        padding: '32px 30px',
        marginTop: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
        background:
          'linear-gradient(135deg, rgba(124,92,255,0.14), rgba(79,124,255,0.08) 60%, rgba(255,255,255,0.03))',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 96,
            height: 96,
            borderRadius: 26,
            display: 'grid',
            placeItems: 'center',
            background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.16), rgba(124,92,255,0.06))',
          }}
        >
          <Icon size={54} strokeWidth={1.4} color="#e9e5ff" />
        </motion.div>

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <motion.span
              key={`${main.temp}-${unit}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 68, fontWeight: 700, lineHeight: 1 }}
            >
              {formatTemp(main.temp, unit)}
            </motion.span>
            <span style={{ fontSize: 30, fontWeight: 300, color: 'var(--text-secondary)' }}>
              {unit}
            </span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 500, marginTop: 4 }}>{conditionLabel(condition.description)}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
            Feels like {formatTemp(main.feels_like, unit)}{unit}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
          {place?.name || name}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
          {place?.country ? `${place.country} · ` : ''}
          {dateStr}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 10 }}>
          <Badge tone={isMock ? 'warn' : 'good'}>{isMock ? 'MOCK DATA' : 'LIVE API'}</Badge>
          <Badge tone="violet">{condition.main.toUpperCase()}</Badge>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
          Updated {dataUpdatedAt}
        </div>
      </div>
    </motion.div>
  );
}

function Badge({ children, tone }) {
  const tones = {
    good: { bg: 'rgba(74,222,128,0.14)', color: '#4ade80' },
    warn: { bg: 'rgba(251,191,36,0.14)', color: '#fbbf24' },
    violet: { bg: 'rgba(124,92,255,0.16)', color: '#b7a6ff' },
  };
  const t = tones[tone] || tones.violet;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.03em',
        padding: '5px 10px',
        borderRadius: 999,
        background: t.bg,
        color: t.color,
      }}
    >
      {children}
    </span>
  );
}
