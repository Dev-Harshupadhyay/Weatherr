import { useState, useCallback, useRef } from 'react';
import { fetchWeatherBundle } from '../utils/weatherApi';

export function useWeather() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const search = useCallback(async ({ query, coords }) => {
    const id = ++requestId.current;
    setStatus('loading');
    setError(null);
    try {
      const bundle = await fetchWeatherBundle({ query, coords });
      if (id !== requestId.current) return null; // stale response, ignore
      setData(bundle);
      setStatus('success');
      return bundle;
    } catch (err) {
      if (id !== requestId.current) return null;
      setError(err.message || 'Something went wrong fetching the forecast.');
      setStatus('error');
      return null;
    }
  }, []);

  return { data, status, error, search, isLoading: status === 'loading' };
}
