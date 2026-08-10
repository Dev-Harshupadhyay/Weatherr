import { useCallback } from 'react';
import { CONFIG } from '../config';
import { useLocalStorage } from './useLocalStorage';

const MAX_ENTRIES = 200;

export function useSearchLog() {
  const [log, setLog] = useLocalStorage(CONFIG.LOG_KEY, []);

  const record = useCallback(
    (entry) => {
      setLog((prev) => {
        const next = [
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: new Date().toISOString(),
            ...entry,
          },
          ...prev,
        ];
        return next.slice(0, MAX_ENTRIES);
      });
    },
    [setLog]
  );

  const clear = useCallback(() => setLog([]), [setLog]);

  return { log, record, clear };
}
