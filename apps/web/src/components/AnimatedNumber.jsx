import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function parseTarget(value) {
  // Extract numeric part and suffix like "50+", "99%", "5+"
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: '' };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedNumber({ value, duration = 1800 }) {
  const { num, suffix } = parseTarget(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const startTime = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    if (!inView) return;
    startTime.current = null;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * num));
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      }
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, num, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

export default AnimatedNumber;
