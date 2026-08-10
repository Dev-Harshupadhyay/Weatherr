import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useUnit() {
  const [unit, setUnit] = useLocalStorage('atmosphera_unit', 'C');
  const toggle = useCallback(() => setUnit((u) => (u === 'C' ? 'F' : 'C')), [setUnit]);
  return { unit, toggle };
}
