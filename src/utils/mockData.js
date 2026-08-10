// Deterministic mock bundle — mirrors the shape returned by fetchWeatherBundle
// so components never need to branch on mock vs. live data.

function threeHourSlots(baseTemp) {
  const slots = [];
  const now = Date.now();
  for (let i = 0; i < 16; i += 1) {
    slots.push({
      dt: Math.floor(now / 1000) + i * 3 * 3600,
      main: { temp: baseTemp + Math.sin(i / 2) * 3, humidity: 55 + (i % 5) },
      weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04d' }],
      pop: Math.max(0, Math.min(1, 0.05 * (i % 6))),
      wind: { speed: 2.2, deg: 130 },
      clouds: { all: 70 },
    });
  }
  return slots;
}

export function getMockBundle(placeName = 'Delhi') {
  return {
    place: { name: placeName, country: 'IN', lat: 28.6139, lon: 77.209 },
    current: {
      main: { temp: 33, feels_like: 38, humidity: 56, pressure: 1001 },
      weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04d' }],
      wind: { speed: 2.2, deg: 131, gust: 3.9 },
      visibility: 10000,
      clouds: { all: 79 },
      sys: {
        sunrise: Math.floor(Date.now() / 1000) - 3600 * 6,
        sunset: Math.floor(Date.now() / 1000) + 3600 * 6,
        country: 'IN',
      },
      dt: Math.floor(Date.now() / 1000),
      name: placeName,
    },
    forecast: { list: threeHourSlots(33) },
    air: { list: [{ main: { aqi: 3 }, components: { pm2_5: 42 } }] },
    uvi: 8,
    isMock: true,
  };
}
