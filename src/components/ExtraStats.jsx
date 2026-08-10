import { Thermometer, Cloud, CloudRain, Flame } from 'lucide-react';
import { StatCard } from './StatsGrid';
import { calcDewPoint, formatTemp } from '../utils/format';

export default function ExtraStats({ current, nextPop, unit }) {
  if (!current) return null;
  const dewPoint = calcDewPoint(current.main.temp, current.main.humidity);

  const stats = [
    { icon: Thermometer, label: 'Dew Point', value: formatTemp(dewPoint, unit) },
    { icon: Cloud, label: 'Cloud Cover', value: `${current.clouds?.all ?? 0}%` },
    { icon: CloudRain, label: 'Rain Chance', value: `${Math.round((nextPop ?? 0) * 100)}%` },
    { icon: Flame, label: 'Heat Index', value: formatTemp(current.main.feels_like, unit) },
  ];

  return (
    <div className="grid-4" style={{ marginTop: 12 }}>
      {stats.map((s, i) => (
        <StatCard key={s.label} {...s} delay={0.68 + i * 0.04} />
      ))}
    </div>
  );
}
