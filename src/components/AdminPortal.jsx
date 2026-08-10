import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, X, Trash2, KeyRound, Search as SearchIcon, MapPin } from 'lucide-react';
import { CONFIG } from '../config';

function maskKey(key) {
  if (!key) return '—';
  if (key.length <= 8) return '••••••••';
  return `${key.slice(0, 4)}${'•'.repeat(key.length - 8)}${key.slice(-4)}`;
}

export default function AdminPortal({ log, onClear }) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');

  const stats = useMemo(() => {
    const total = log.length;
    const uniqueLocations = new Set(log.map((l) => l.location || l.query)).size;
    const live = log.filter((l) => l.source === 'live').length;
    const failed = log.filter((l) => l.status === 'error').length;
    return { total, uniqueLocations, live, failed };
  }, [log]);

  function handleClose() {
    setOpen(false);
    setUnlocked(false);
    setPwd('');
    setPwdError('');
  }

  function handleUnlock(e) {
    e.preventDefault();
    if (pwd === CONFIG.ADMIN_PWD) {
      setUnlocked(true);
      setPwdError('');
    } else {
      setPwdError('Incorrect password. Try again.');
    }
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button
          onClick={() => setOpen(true)}
          className="glass glass-tight"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <Lock size={13} /> Admin Portal
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              background: 'rgba(6,4,16,0.72)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass"
              style={{
                width: '100%',
                maxWidth: unlocked ? 560 : 380,
                maxHeight: '85vh',
                overflowY: 'auto',
                padding: 26,
                background: 'linear-gradient(160deg, #17112f, #0f0b22)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      display: 'grid',
                      placeItems: 'center',
                      background: unlocked ? 'rgba(74,222,128,0.16)' : 'rgba(124,92,255,0.18)',
                    }}
                  >
                    {unlocked ? <ShieldCheck size={17} color="#4ade80" /> : <KeyRound size={17} color="#b7a6ff" />}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>
                    Admin Portal
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', padding: 4 }}
                >
                  <X size={18} />
                </button>
              </div>

              {!unlocked ? (
                <form onSubmit={handleUnlock}>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
                    Enter the admin password to view search analytics and configuration status.
                  </p>
                  <input
                    type="password"
                    autoFocus
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="Password"
                    className="glass-tight"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border-soft)',
                      color: 'var(--text-primary)',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                  {pwdError && (
                    <div style={{ color: 'var(--bad)', fontSize: 12, marginTop: 8 }}>{pwdError}</div>
                  )}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      marginTop: 14,
                      padding: '12px',
                      borderRadius: 12,
                      border: 'none',
                      background: 'linear-gradient(135deg, #7c5cff, #4f7cff)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Unlock
                  </button>
                </form>
              ) : (
                <div>
                  <div className="grid-4" style={{ marginBottom: 18 }}>
                    <MiniStat label="Searches" value={stats.total} />
                    <MiniStat label="Locations" value={stats.uniqueLocations} />
                    <MiniStat label="Live Calls" value={stats.live} />
                    <MiniStat label="Failed" value={stats.failed} />
                  </div>

                  <div className="eyebrow" style={{ marginBottom: 8 }}>Configuration</div>
                  <div
                    className="glass-tight mono"
                    style={{
                      padding: 14,
                      fontSize: 12,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border-soft)',
                      marginBottom: 18,
                      lineHeight: 1.9,
                    }}
                  >
                    <div>OWM_KEY: {maskKey(CONFIG.OWM_KEY)}</div>
                    <div>USE_MOCK: {String(CONFIG.USE_MOCK)}</div>
                    <div>LOG_KEY: {CONFIG.LOG_KEY}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="eyebrow">Recent Searches</span>
                    <button
                      onClick={onClear}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--bad)',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      <Trash2 size={13} /> Clear log
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 260, overflowY: 'auto' }}>
                    {log.length === 0 && (
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '20px 0', textAlign: 'center' }}>
                        No searches logged yet.
                      </div>
                    )}
                    {log.map((entry) => (
                      <div
                        key={entry.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '9px 12px',
                          borderRadius: 10,
                          background: 'rgba(255,255,255,0.025)',
                          fontSize: 12,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {entry.method === 'geolocation' ? <MapPin size={13} color="#8fb0ff" /> : <SearchIcon size={13} color="#8fb0ff" />}
                          <span style={{ fontWeight: 600 }}>{entry.location || entry.query}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
                          <span
                            style={{
                              color: entry.status === 'error' ? 'var(--bad)' : 'var(--good)',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            {entry.status === 'error' ? 'FAILED' : 'OK'}
                          </span>
                          <span className="mono">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="glass-tight" style={{ padding: '12px 10px', textAlign: 'center', background: 'rgba(255,255,255,0.03)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
    </div>
  );
}
