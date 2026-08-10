import { motion, AnimatePresence } from 'framer-motion';
import { CloudSun } from 'lucide-react';
import { APP_META } from '../config';

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #7c5cff, #4f7cff)',
              boxShadow: '0 20px 50px -14px rgba(124,92,255,0.6)',
            }}
          >
            <CloudSun size={36} color="#fff" strokeWidth={1.8} />
          </motion.div>
          <motion.p
            className="splash-word"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            {APP_META.name}
          </motion.p>
          <div className="splash-ring" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
