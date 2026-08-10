export function cToF(c) {
  return (c * 9) / 5 + 32;
}

export function formatTemp(celsius, unit) {
  if (celsius === null || celsius === undefined || Number.isNaN(celsius)) return '—';
  const value = unit === 'F' ? cToF(celsius) : celsius;
  return `${Math.round(value)}°`;
}

export function formatTime(unixSeconds, timezoneOffsetSeconds = 0) {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
}

export function formatHour(unixSeconds) {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatWeekday(unixSeconds, isToday = false) {
  if (isToday) return 'Today';
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatClock(date = new Date()) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}

/** Magnus formula approximation of dew point in °C. */
export function calcDewPoint(tempC, humidityPct) {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidityPct / 100);
  return (b * alpha) / (a - alpha);
}

export function aqiLabel(aqi) {
  const labels = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor',
  };
  return labels[aqi] || 'Unknown';
}

export function uvLabel(uv) {
  if (uv === null || uv === undefined) return 'Unknown';
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very High';
  return 'Extreme';
}

export function windDirLabel(deg) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

/** Groups a 3-hour forecast list into daily min/max + representative icon/pop. */
export function groupDaily(list) {
  const byDay = {};
  list.forEach((slot) => {
    const date = new Date(slot.dt * 1000);
    const key = date.toDateString();
    if (!byDay[key]) {
      byDay[key] = { dt: slot.dt, temps: [], pops: [], icons: [], mains: [] };
    }
    byDay[key].temps.push(slot.main.temp);
    byDay[key].pops.push(slot.pop ?? 0);
    byDay[key].icons.push(slot.weather[0].icon);
    byDay[key].mains.push(slot.weather[0].main);
  });

  return Object.values(byDay)
    .slice(0, 5)
    .map((day, idx) => ({
      dt: day.dt,
      min: Math.min(...day.temps),
      max: Math.max(...day.temps),
      pop: Math.max(...day.pops),
      icon: day.icons[Math.floor(day.icons.length / 2)],
      main: day.mains[Math.floor(day.mains.length / 2)],
      isToday: idx === 0,
    }));
}
