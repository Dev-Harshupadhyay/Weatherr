import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

import AnimatedBackground from './components/AnimatedBackground';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import StatsGrid from './components/StatsGrid';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import UVIndex from './components/UVIndex';
import SunSchedule from './components/SunSchedule';
import WindAirQuality from './components/WindAirQuality';
import ExtraStats from './components/ExtraStats';
import AdminPortal from './components/AdminPortal';

import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { useUnit } from './hooks/useUnit';
import { useSearchLog } from './hooks/useSearchLog';
import { groupDaily, formatClock } from './utils/format';

const DEFAULT_CITY = 'Delhi';

export default function App() {
  const [splashVisible, setSplashVisible] = useState(true);
  const { data, status, error, search, isLoading } = useWeather();
  const { locate, locating } = useGeolocation();
  const { unit, toggle } = useUnit();
  const { log, record, clear } = useSearchLog();

  useEffect(() => {
    const timer = setTimeout(() => setSplashVisible(false), 1200);
    search({ query: DEFAULT_CITY }).then((bundle) => {
      if (bundle) {
        record({ query: DEFAULT_CITY, location: bundle.place?.name, method: 'default', status: 'ok', source: bundle.isMock ? 'mock' : 'live' });
      }
    });
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    async (query) => {
      const bundle = await search({ query });
      record({
        query,
        location: bundle?.place?.name,
        method: 'search',
        status: bundle ? 'ok' : 'error',
        source: bundle?.isMock ? 'mock' : 'live',
      });
    },
    [search, record]
  );

  const handleLocate = useCallback(async () => {
    try {
      const coords = await locate();
      const bundle = await search({ coords });
      record({
        query: `${coords.lat.toFixed(2)}, ${coords.lon.toFixed(2)}`,
        location: bundle?.place?.name,
        method: 'geolocation',
        status: bundle ? 'ok' : 'error',
        source: bundle?.isMock ? 'mock' : 'live',
      });
    } catch {
      /* geoError surfaced via useGeolocation, nothing else to do */
    }
  }, [locate, search, record]);

  const daily = data?.forecast?.list ? groupDaily(data.forecast.list) : [];
  const nextPop = data?.forecast?.list?.[0]?.pop;

  return (
    <div className="app-shell">
      <AnimatedBackground />
      <LoadingScreen visible={splashVisible} />

      <Header />

      <SearchBar
        onSearch={handleSearch}
        onLocate={handleLocate}
        locating={locating}
        unit={unit}
        onToggleUnit={toggle}
        resolvedPlace={data?.place}
        error={status === 'error' ? error : null}
      />

      <AnimatePresence mode="wait">
        {isLoading && !data ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass"
            style={{ marginTop: 18, padding: 60, textAlign: 'center', color: 'var(--text-muted)' }}
          >
            Fetching live weather data…
          </motion.div>
        ) : data ? (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CurrentWeather
              current={data.current}
              place={data.place}
              unit={unit}
              isMock={data.isMock}
              dataUpdatedAt={formatClock()}
            />
            <StatsGrid current={data.current} />
            <HourlyForecast list={data.forecast?.list} unit={unit} />

            <div className="grid-2" style={{ marginTop: 14 }}>
              <DailyForecast days={daily} unit={unit} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <UVIndex uvi={data.uvi} />
                <SunSchedule
                  sunrise={data.current.sys.sunrise}
                  sunset={data.current.sys.sunset}
                  timezone={data.current.timezone || 0}
                />
                <WindAirQuality wind={data.current.wind} air={data.air} />
              </div>
            </div>

            <ExtraStats current={data.current} nextPop={nextPop} unit={unit} />
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass"
            style={{ marginTop: 18, padding: 40, textAlign: 'center' }}
          >
            <AlertTriangle size={28} color="var(--bad)" style={{ marginBottom: 10 }} />
            <div style={{ fontWeight: 600 }}>{error}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AdminPortal log={log} onClear={clear} />
    </div>
  );
}
