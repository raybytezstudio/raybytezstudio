import React, { useEffect, useRef } from 'react';

export default function GlowCursor() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Large soft glow — additive blend so it brightens, not darkens */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.18) 0%, rgba(255,107,53,0.06) 45%, transparent 70%)',
          mixBlendMode: 'screen',
          willChange: 'transform',
        }}
      />
    </>
  );
}
