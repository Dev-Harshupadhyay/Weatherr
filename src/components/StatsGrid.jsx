import { motion } from 'framer-motion';
import { Droplets, Wind, Eye, Gauge } from 'lucide-react';

export default function StatsGrid({ current }) {
  if (!current) return null;
  const { main, wind, visibility } = current;

  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${main.humidity}%` },
    { icon: Wind, label: 'Wind', value: `${wind.speed.toFixed(1)} km/h` },
    { icon: Eye, label: 'Visibility', value: `${(visibility / 1000).toFixed(0)} km` },
    { icon: Gauge, label: 'Pressure', value: `${main.pressure} hPa` },
  ];

  return (
    <div className="grid-4" style={{ marginTop: 12 }}>
      {stats.map((s, i) => (
        <StatCard key={s.label} {...s} delay={0.2 + i * 0.05} />
      ))}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="glass glass-tight"
      style={{ padding: '16px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(135deg, rgba(124,92,255,0.35), rgba(79,124,255,0.25))',
        }}
      >
        <Icon size={18} color="#fff" strokeWidth={1.8} />
      </div>
      <div>
        <div className="eyebrow">{label}</div>
        <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>{value}</div>
      </div>
    </motion.div>
  );
}
