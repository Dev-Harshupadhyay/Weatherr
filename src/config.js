/* ================================================================
   CONFIG — single source of truth for the app.
   Values are read from Vite env vars (.env) first, falling back to
   the defaults below so the app still runs out of the box.
   In production, always set these via .env / your host's env panel
   instead of editing the fallbacks here.
   ================================================================ */

const env = import.meta.env;

export const CONFIG = {
  OWM_KEY: env.VITE_OWM_KEY || '588e1ba0bfbbe6df82d398358add9fc4',
  USE_MOCK: env.VITE_USE_MOCK === 'true' ? true : env.VITE_USE_MOCK === 'false' ? false : false,
  ADMIN_PWD: env.VITE_ADMIN_PWD || 'HARSH@1234',
  LOG_KEY: env.VITE_LOG_KEY || 'atmosphera_search_log',
};

export const OWM_BASE = 'https://api.openweathermap.org';

export const APP_META = {
  name: 'Atmosphera',
  tagline: 'Weather Intelligence',
  version: '2.0.0',
};
