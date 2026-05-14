import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   TRUE two-sided 3-D flip
   ─ The inner "flipper" starts at rotateY(-180deg)  → you see the BACK face
   ─ It animates to rotateY(0deg)                    → you see the FRONT face
   ─ Both faces use  backface-visibility:hidden  so only one is ever visible
   ─ A diagonal rotateX tilt during the mid-flight makes it feel airborne
───────────────────────────────────────────────────────────────────────────── */

/* Staggered keyframe: card starts rotated away, tilts through the air, lands flat */
const flipVariant = (index) => ({
  hidden: {
    rotateY: -180,
    rotateX: 25,          // nose-down tilt while it's face-down
    z: -200,
    scale: 0.82,
    opacity: 0,
  },
  visible: {
    rotateY: 0,
    rotateX: 0,
    z: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 36,
      damping: 10,          // under-damped → feels heavy + bouncy like cardboard
      delay: index * 0.18,
      opacity: { duration: 0.01 },   // snap visible immediately (back face shows)
    },
  },
});

/* Glow blooms beneath the card once it lands */
const glowVariant = (index) => ({
  hidden: { opacity: 0, scaleX: 0.4 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.7, delay: index * 0.18 + 0.55, ease: 'easeOut' },
  },
});

/* ─────────────────────────────────────────────────────────────────────────────
   Back-face design  (visible while card is mid-flip)
   Enhanced with deeper depth and better branding
 ───────────────────────────────────────────────────────────────────────────── */
function CardBack({ category }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
               transform: 'rotateY(180deg)' }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.15),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,107,53,0.05) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Branding */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,107,53,0.1)]"
        >
          <span className="text-primary font-black text-xl tracking-tighter">RB</span>
        </motion.div>
        <div className="text-center">
          <span className="block text-2xl font-black tracking-[0.2em] text-white/10 uppercase mb-1">RAYBYTEZ</span>
          <span className="text-[10px] font-bold tracking-[0.4em] text-primary/60 uppercase">Engineering Elite</span>
        </div>
        {category && (
          <div className="mt-4 px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-primary/40 opacity-50" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-primary/40 opacity-50" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Front face (the actual project card)
   PREMIUM ENHANCEMENTS: Glassmorphism, Floating Tech, Glow Borders
 ───────────────────────────────────────────────────────────────────────────── */
function CardFront({ name, description, technologies, link, image, previewUrl, metric, metricLabel, category }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col bg-card/40 backdrop-blur-md border border-white/5 group
                 hover:border-primary/30 transition-all duration-700 ease-in-out shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
    >
      {/* Dynamic Glow Border (Animated on Hover) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Media Section */}
      <div className="relative h-60 overflow-hidden flex-shrink-0 bg-black/20">
        {image || previewUrl ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-20 opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
            
            {previewUrl ? (
              <div className="w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none absolute top-0 left-0 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[0.28]">
                <iframe src={previewUrl} title={name} className="w-full h-full border-none pointer-events-none" scrolling="no" tabIndex="-1" />
              </div>
            ) : (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
              />
            )}

            {/* Glass Overlay on Hover */}
            <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-primary/5 backdrop-blur-[2px] flex items-center justify-center">
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_10px_30px_rgba(255,107,53,0.4)]"
              >
                Launch Concept <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02] border-b border-white/5 relative">
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }}
            />
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M21 15l-5-5L5 21" />
                <circle cx="8.5" cy="8.5" r="1.5" />
              </svg>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Visualization Pending</p>
          </div>
        )}

        {category && (
          <div className="absolute top-5 left-5 z-40">
            <span className="px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md text-primary border border-primary/30 rounded-md">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-8 relative z-10">
        {metric && (
          <div className="flex items-baseline gap-2 mb-4 group-hover:translate-x-1 transition-transform duration-500">
            <span className="text-4xl font-black text-primary tabular-nums tracking-tighter">{metric}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{metricLabel}</span>
          </div>
        )}

        <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-500 mb-3 tracking-tighter">
          {name}
        </h3>

        <p className="text-[13px] text-muted-foreground/80 leading-relaxed font-medium line-clamp-3 mb-8 group-hover:text-foreground/90 transition-colors duration-500">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-white/[0.03] text-foreground/50 rounded border border-white/5 
                         group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Link */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5 group-hover:border-primary/10 transition-colors duration-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">Live Status</span>
          </div>
          <a
            href={link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all duration-500"
          >
            Full Case Study <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectCard — orchestrates the flip
───────────────────────────────────────────────────────────────────────────── */
function ProjectCard(props) {
  const { index, category } = props;
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    /* Stage: very close perspective for maximum 3-D drama */
    <div
      ref={ref}
      className="relative h-full"
      style={{ perspective: '380px', perspectiveOrigin: '50% 40%' }}
    >
      {/* Glow beneath card */}
      <motion.div
        variants={glowVariant(index)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="absolute inset-x-8 -bottom-5 h-10 rounded-full bg-primary/25 blur-2xl pointer-events-none -z-10"
      />

      {/* Flipper — holds both faces */}
      <motion.div
        variants={flipVariant(index)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative w-full"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          /* Card height drives the wrapper — front face is absolute-inset */
          minHeight: '560px',
        }}
      >
        {/* BACK FACE — seen mid-flip */}
        <CardBack category={category} />

        {/* FRONT FACE — seen when flat */}
        <CardFront {...props} />
      </motion.div>
    </div>
  );
}

export default ProjectCard;