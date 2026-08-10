import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Moon,
  CloudMoon,
} from 'lucide-react';

// icon codes: https://openweathermap.org/weather-conditions
const MAP = {
  '01d': Sun,
  '01n': Moon,
  '02d': CloudSun,
  '02n': CloudMoon,
  '03d': Cloud,
  '03n': Cloud,
  '04d': Cloud,
  '04n': Cloud,
  '09d': CloudDrizzle,
  '09n': CloudDrizzle,
  '10d': CloudRain,
  '10n': CloudRain,
  '11d': CloudLightning,
  '11n': CloudLightning,
  '13d': CloudSnow,
  '13n': CloudSnow,
  '50d': CloudFog,
  '50n': CloudFog,
};

export function getWeatherIcon(iconCode) {
  return MAP[iconCode] || Cloud;
}

export function conditionLabel(description) {
  if (!description) return 'Unknown';
  return description.replace(/\b\w/g, (c) => c.toUpperCase());
}
