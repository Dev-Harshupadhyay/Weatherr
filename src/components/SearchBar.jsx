import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, onLocate, locating, unit, onToggleUnit, resolvedPlace, error }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const q = value.trim();
    if (q) onSearch(q);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
      >
        <div
          className="glass glass-tight"
          style={{
            flex: '1 1 220px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 16px',
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for a city..."
            aria-label="Search for a city"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 15,
            }}
          />
          <button
            type="submit"
            aria-label="Search"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: 'none',
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg, #7c5cff, #4f7cff)',
              flexShrink: 0,
            }}
          >
            <Search size={16} color="#fff" />
          </button>
        </div>

        <button
          type="button"
          onClick={onLocate}
          className="glass glass-tight"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 18px',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {locating ? <Loader2 size={16} className="spin-icon" /> : <MapPin size={16} />}
          Locate Me
        </button>

        <button
          type="button"
          onClick={onToggleUnit}
          className="glass glass-tight"
          style={{
            padding: '0 18px',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          °C → °F
        </button>
      </form>

      <div style={{ marginTop: 10, fontSize: 13, color: error ? 'var(--bad)' : 'var(--text-secondary)' }}>
        {error
          ? error
          : resolvedPlace
          ? `📍 Location detected: ${resolvedPlace.name}${resolvedPlace.country ? `, ${resolvedPlace.country}` : ''}`
          : '\u00A0'}
      </div>
    </motion.div>
  );
}
