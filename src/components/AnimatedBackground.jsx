import { motion } from 'framer-motion';

const orbs = [
  { size: 380, top: '-8%', left: '-6%', color: '#7c5cff', duration: 22 },
  { size: 320, top: '55%', left: '78%', color: '#4f7cff', duration: 26 },
  { size: 260, top: '80%', left: '10%', color: '#b45cff', duration: 30 },
];

export default function AnimatedBackground() {
  return (
    <>
      <div className="bg-aurora" aria-hidden="true" />
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="bg-orb"
          aria-hidden="true"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.color,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}
