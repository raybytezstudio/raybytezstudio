import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   All 8 workflow phases — each with its own image, tag, headline & bullets
───────────────────────────────────────────────────────────────────────────── */
const PHASES = [
  {
    num: '01',
    tag: 'Discovery',
    headline: ['Strategic', 'Discovery.'],
    bullets: [
      'In-depth requirement & stakeholder interviews',
      'Market landscape & competitor benchmarking',
      'Risk register & feasibility assessment',
    ],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
  },
  {
    num: '02',
    tag: 'Strategy',
    headline: ['Technical', 'Strategy.'],
    bullets: [
      'Technical architecture planning & stack selection',
      'Milestone roadmap & sprint mapping',
      'Resource allocation & timeline locking',
    ],
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2000',
  },
  {
    num: '03',
    tag: 'Wireframing',
    headline: ['Structural', 'Wireframing.'],
    bullets: [
      'Low-fidelity layout & user-flow mapping',
      'Core interaction pattern definition',
      'Information architecture validation',
    ],
    img: 'https://images.unsplash.com/photo-1531497684310-0f15276c39ab?auto=format&fit=crop&q=80&w=2000',
  },
  {
    num: '04',
    tag: 'UI / UX Design',
    headline: ['Visual', 'Design.'],
    bullets: [
      'High-fidelity component system creation',
      'Brand-aligned interactive prototype delivery',
      'Accessibility & WCAG compliance checks',
    ],
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2000',
  },
  {
    num: '05',
    tag: 'Frontend Dev',
    headline: ['Frontend', 'Build.'],
    bullets: [
      'Responsive, performance-first interface coding',
      'Animation & micro-interaction integration',
      'Cross-browser & device compatibility testing',
    ],
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2000',
  },
  {
    num: '06',
    tag: 'Backend Engineering',
    headline: ['Backend', 'Engineering.'],
    bullets: [
      'Scalable database schema & data modelling',
      'Secure REST / GraphQL API development',
      'Third-party service & payment integration',
    ],
    img: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&q=80&w=2000',
  },
  {
    num: '07',
    tag: 'Testing & QA',
    headline: ['Rigorous', 'Testing.'],
    bullets: [
      'Automated unit, integration & E2E test suites',
      'Security penetration & load stress assessment',
      'Bug triage, regression fix & sign-off',
    ],
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000',
  },
  {
    num: '08',
    tag: 'Deployment & Scale',
    headline: ['Scale to', 'Infinity.'],
    bullets: [
      'Cloud infrastructure provisioning & CI/CD setup',
      'Live production monitoring & alerting',
      'Post-launch optimisation & growth support',
    ],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2000',
  },
];

const N = PHASES.length; // 8
const STEP = 1 / N;     // 0.125 per phase
const FADE = 0.04;      // crossfade window

/* Build opacity & scale transforms for phase index i */
function phaseTransforms(scrollYProgress, i) {
  const start  = i * STEP;
  const end    = (i + 1) * STEP;
  const isFirst = i === 0;
  const isLast  = i === N - 1;

  const opacityKeys = isFirst
    ? [start, end - FADE, end]
    : isLast
    ? [start - FADE, start, end]
    : [start - FADE, start, end - FADE, end];

  const opacityVals = isFirst
    ? [1, 1, 0]
    : isLast
    ? [0, 1, 1]
    : [0, 1, 1, 0];

  const scaleVals = isFirst || isLast ? [1, 1.06] : [1.06, 1, 1, 1.06];

  const opacity = useTransform(scrollYProgress, opacityKeys, opacityVals); // eslint-disable-line
  const scale   = useTransform(scrollYProgress, [start, end], isLast ? [1.06, 1.06] : [1, 1.06]); // eslint-disable-line

  return { opacity, scale };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────────────────── */
export default function PinnedShowcase() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* --- Per-phase transforms (hooks at top level, not in a loop) --- */
  const t0 = phaseTransforms(scrollYProgress, 0);
  const t1 = phaseTransforms(scrollYProgress, 1);
  const t2 = phaseTransforms(scrollYProgress, 2);
  const t3 = phaseTransforms(scrollYProgress, 3);
  const t4 = phaseTransforms(scrollYProgress, 4);
  const t5 = phaseTransforms(scrollYProgress, 5);
  const t6 = phaseTransforms(scrollYProgress, 6);
  const t7 = phaseTransforms(scrollYProgress, 7);

  const transforms = [t0, t1, t2, t3, t4, t5, t6, t7];

  /* Progress bar height */
  const barH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  /* Dot opacities — one per phase, computed at top level to obey rules of hooks */
  const dotOp0 = useTransform(scrollYProgress, [0,       0*STEP, 1*STEP, 1*STEP+0.01], [1, 1, 1, 0.3]);
  const dotOp1 = useTransform(scrollYProgress, [1*STEP-0.01, 1*STEP, 2*STEP, 2*STEP+0.01], [0.3, 1, 1, 0.3]);
  const dotOp2 = useTransform(scrollYProgress, [2*STEP-0.01, 2*STEP, 3*STEP, 3*STEP+0.01], [0.3, 1, 1, 0.3]);
  const dotOp3 = useTransform(scrollYProgress, [3*STEP-0.01, 3*STEP, 4*STEP, 4*STEP+0.01], [0.3, 1, 1, 0.3]);
  const dotOp4 = useTransform(scrollYProgress, [4*STEP-0.01, 4*STEP, 5*STEP, 5*STEP+0.01], [0.3, 1, 1, 0.3]);
  const dotOp5 = useTransform(scrollYProgress, [5*STEP-0.01, 5*STEP, 6*STEP, 6*STEP+0.01], [0.3, 1, 1, 0.3]);
  const dotOp6 = useTransform(scrollYProgress, [6*STEP-0.01, 6*STEP, 7*STEP, 7*STEP+0.01], [0.3, 1, 1, 0.3]);
  const dotOp7 = useTransform(scrollYProgress, [7*STEP-0.01, 7*STEP, 1,      1          ], [0.3, 1, 1, 1  ]);
  const dotOpacities = [dotOp0, dotOp1, dotOp2, dotOp3, dotOp4, dotOp5, dotOp6, dotOp7];

  /* Scroll hint fades out after first phase */
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    /* 800vh — user scrolls 8 screen-heights through all phases */
    <section ref={containerRef} className="relative bg-background" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Background image layers ── */}
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.num}
            style={{ opacity: transforms[i].opacity, scale: transforms[i].scale }}
            className="absolute inset-0"
          >
            {/* Gradient overlays — bottom vignette + left text mask */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />
            <img
              src={phase.img}
              alt={phase.tag}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        ))}

        {/* ── Text layers ── */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 lg:px-16">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.num}
                style={{ opacity: transforms[i].opacity }}
                className="absolute inset-y-0 left-6 lg:left-16 flex flex-col justify-center max-w-2xl pointer-events-none"
              >
                {/* Phase tag */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-primary font-black text-5xl lg:text-6xl tabular-nums opacity-25 leading-none">
                    {phase.num}
                  </span>
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] bg-primary text-primary-foreground rounded">
                    {phase.tag}
                  </span>
                </div>

                {/* Main headline */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-8">
                  {phase.headline[0]}<br />
                  <span className="text-primary">{phase.headline[1]}</span>
                </h2>

                {/* Bullet points */}
                <ul className="space-y-3">
                  {phase.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3 text-white/70 text-sm lg:text-base font-medium">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right-side progress rail ── */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
          {PHASES.map((phase, i) => (
            <motion.div key={phase.num} style={{ opacity: dotOpacities[i] }} className="flex flex-col items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[9px] font-black text-white/50 uppercase tracking-widest hidden lg:block">
                {phase.num}
              </span>
            </motion.div>
          ))}

          {/* Live progress bar */}
          <div className="relative w-0.5 h-20 bg-white/10 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-primary"
              style={{ height: barH }}
            />
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          style={{ opacity: scrollHintOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}