import { CONFIG, OWM_BASE } from '../config';
import { getMockBundle } from './mockData';

class WeatherApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'WeatherApiError';
    this.status = status;
  }
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {
      /* ignore parse failure */
    }
    throw new WeatherApiError(msg, res.status);
  }
  return res.json();
}

/** Resolve a free-text place name to coordinates via OWM Geocoding API. */
export async function geocodePlace(query) {
  const url = `${OWM_BASE}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${CONFIG.OWM_KEY}`;
  const results = await fetchJson(url);
  if (!results?.length) {
    throw new WeatherApiError(`No location found for "${query}"`, 404);
  }
  const { lat, lon, name, country, state } = results[0];
  return { lat, lon, name, country, state };
}

/** Reverse geocode coordinates to a place name. */
export async function reverseGeocode(lat, lon) {
  const url = `${OWM_BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${CONFIG.OWM_KEY}`;
  const results = await fetchJson(url);
  const first = results?.[0];
  return first
    ? { name: first.name, country: first.country, state: first.state }
    : { name: 'Unknown', country: '', state: '' };
}

/** Current weather by coordinates (metric units). */
export async function getCurrentWeather(lat, lon) {
  const url = `${OWM_BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${CONFIG.OWM_KEY}`;
  return fetchJson(url);
}

/** 5 day / 3 hour forecast by coordinates (metric units). */
export async function getForecast(lat, lon) {
  const url = `${OWM_BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${CONFIG.OWM_KEY}`;
  return fetchJson(url);
}

/** Air quality index by coordinates. Free endpoint on all OWM keys. */
export async function getAirQuality(lat, lon) {
  const url = `${OWM_BASE}/data/2.0/air_pollution?lat=${lat}&lon=${lon}&appid=${CONFIG.OWM_KEY}`;
  return fetchJson(url);
}

/**
 * UV index. OWM retired the free standalone /uvi endpoint in favor of
 * One Call 3.0 (subscription-gated). We attempt it for keys that still
 * carry access and fail soft otherwise — the UI shows "—" rather than
 * ever fabricating a number.
 */
export async function getUvIndex(lat, lon) {
  try {
    const url = `${OWM_BASE}/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${CONFIG.OWM_KEY}`;
    const data = await fetchJson(url);
    return typeof data?.value === 'number' ? data.value : null;
  } catch {
    return null;
  }
}

/**
 * Fetches everything the dashboard needs for a given place query
 * (either a "City, Country" string or {lat, lon} coordinates).
 * Falls back to bundled mock data when CONFIG.USE_MOCK is true or
 * when the live request fails, so the UI never dead-ends.
 */
export async function fetchWeatherBundle({ query, coords }) {
  if (CONFIG.USE_MOCK) {
    return getMockBundle(query || 'Delhi');
  }

  let place;
  if (coords) {
    const rg = await reverseGeocode(coords.lat, coords.lon);
    place = { lat: coords.lat, lon: coords.lon, ...rg };
  } else {
    place = await geocodePlace(query);
  }

  const [current, forecast, air, uvi] = await Promise.all([
    getCurrentWeather(place.lat, place.lon),
    getForecast(place.lat, place.lon),
    getAirQuality(place.lat, place.lon).catch(() => null),
    getUvIndex(place.lat, place.lon),
  ]);

  return { place, current, forecast, air, uvi, isMock: false };
}

export { WeatherApiError };
