import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';
import AnimeTextReveal from '@/components/AnimeTextReveal';
import { ArrowUpRight } from 'lucide-react';

/* ─── Image placeholder shown when no real photo has been added yet ─────────── */
function ImagePlaceholder({ label = 'Your Project Photo', aspectRatio = '16/10', className = '' }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-white/[0.03] border border-dashed border-primary/30 rounded-xl overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,107,53,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-primary/40 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <p className="text-[11px] font-black uppercase tracking-widest text-primary/50">{label}</p>
      <p className="text-[10px] text-muted-foreground/40 mt-1">Replace src with your real image URL</p>
    </div>
  );
}

/* ─── Floating image for the FeaturedProject right panel ──────────────────── */
function FloatingImage({ src, previewUrl, alt }) {
  if (!src && !previewUrl) {
    return (
      <div className="relative flex flex-col items-center justify-center h-full py-6 px-4 select-none">
        <ImagePlaceholder label={alt || 'Featured Project Photo'} className="w-full max-w-[680px]" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full py-6 px-4 select-none">
      {/* ── The levitating image ── */}
      <motion.div
        animate={{
          y: [-14, 14, -14],
          rotateX: [-2, 2, -2],
          rotateY: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="relative w-full max-w-[680px] rounded-xl overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
      >
        {/* Gloss overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(255,107,53,0.04) 100%)',
          }}
        />
        <div className="w-full h-full relative overflow-hidden bg-white/5" style={{ aspectRatio: '16/10' }}>
          {previewUrl ? (
            <div className="w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none absolute top-0 left-0">
              <iframe src={previewUrl} title={alt} className="w-full h-full border-none pointer-events-none" scrolling="no" tabIndex="-1" />
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover block"
              draggable={false}
            />
          )}
        </div>
      </motion.div>

      {/* ── Cast shadow / engine glow on the 'floor' ── */}
      <motion.div
        animate={{
          scaleX:  [0.78, 1.08, 0.78],
          opacity: [0.28, 0.55, 0.28],
          filter:  [
            'blur(22px)',
            'blur(10px)',
            'blur(22px)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-[75%] max-w-[500px] h-6 rounded-full mt-4"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,107,53,0.75) 0%, rgba(255,107,53,0.15) 60%, transparent 100%)',
        }}
      />
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Tools', 'Website', 'EdTech', 'Ideation'];

const FEATURED = {
  name: 'Gantt Chart Navy',
  category: 'Tools',
  tagline: 'Comprehensive project management.',
  description: 'A conceptual project management tool featuring dynamic Gantt charts, real-time collaboration, and task tracking designed for high-performance teams.',
  technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
  image: null,
  previewUrl: 'https://gantt-chart-navy.vercel.app/',
  link: 'https://gantt-chart-navy.vercel.app/',
};

// ─── PROJECT DATA ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: 'WealthWize',
    category: 'FinTech',
    description: 'Premium financial intelligence platform for real-time portfolio management, market analysis, and risk assessment with sophisticated data visualization.',
    technologies: ['React', 'Next.js', 'Chart.js', 'Tailwind CSS'],
    image: null,
    previewUrl: 'https://wealthwize.vercel.app/',
    link: 'https://wealthwize.vercel.app/',
  },
  {
    name: 'Sweet Delights',
    category: 'Website',
    description: 'AI-integrated full-stack e-commerce platform for custom cakes and cupcakes with advanced customization.',
    technologies: ['MERN Stack', 'AI Integration', 'Tailwind CSS'],
    image: null,
    previewUrl: 'https://sweet-delights-delta-henna.vercel.app/',
    link: 'https://sweet-delights-delta-henna.vercel.app/',
  },
  {
    name: 'E-Invoice',
    category: 'Tools',
    description: 'Professional e-invoicing platform designed for streamlined billing, automated tax calculations, and secure payment tracking.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    image: null,
    previewUrl: 'https://e-invoice-management-system-gamma.vercel.app/',
    link: 'https://e-invoice-management-system-gamma.vercel.app/',
  },
  {
    name: 'Unicorn',
    category: 'Website',
    description: 'Website for the annual college fest, featuring event listings, ticket booking, and interactive UI.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: null,
    previewUrl: 'https://unicorn-gules.vercel.app/',
    link: 'https://unicorn-gules.vercel.app/',
  },
  {
    name: 'Gyan Code',
    category: 'EdTech',
    description: 'A conceptual interactive coding platform for learning software development with live code execution, real-time feedback, and structured curriculums.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: null,
    previewUrl: 'https://gyan-code.vercel.app/',
    link: 'https://gyan-code.vercel.app/',
  },
  {
    name: 'Code Web V3',
    category: 'Website',
    description: 'A conceptual responsive web application for a tech agency featuring dynamic animations, smooth scrolling, and a premium aesthetic.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    image: null,
    previewUrl: 'https://code-web-v3.vercel.app/',
    link: 'https://code-web-v3.vercel.app/',
  },
  {
    name: 'Dhani Control',
    category: 'Ideation',
    description: 'A concept financial dashboard providing real-time analytics, portfolio management, and advanced reporting features (Practice Project).',
    technologies: ['React', 'TimescaleDB', 'D3.js'],
    image: null,
    previewUrl: 'https://dhanicontrol.vercel.app/',
    link: 'https://dhanicontrol.vercel.app/',
  },
  {
    name: 'Dental Clinic Dashboard',
    category: 'Ideation',
    description: 'An ideation project for a specialized dashboard designed to manage dental appointments, patient records, and daily schedules efficiently.',
    technologies: ['React', 'Firebase', 'Material-UI'],
    image: null,
    previewUrl: 'https://dental-clinic-dashboard-psi.vercel.app/',
    link: 'https://dental-clinic-dashboard-psi.vercel.app/',
  }
];

/* ─── Stats ────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '98%', label: 'Client Retention' },
  { value: '12+', label: 'Industries Served' },
  { value: '3.5×', label: 'Avg. ROI Delivered' },
];

/* ─── Animated counter ─────────────────────────────────────────────────────── */
function StatCard({ value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  /* Alternate: even cards from left, odd from right */
  const xFrom = index % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xFrom, rotateY: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ type: 'spring', stiffness: 60, damping: 14, delay: index * 0.12 }}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      className="flex flex-col items-center text-center px-6 py-8 border-r border-white/5 last:border-r-0 group"
    >
      <span className="text-4xl lg:text-5xl font-black text-primary tabular-nums mb-2 group-hover:scale-110 transition-transform duration-300">
        {value}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
    </motion.div>
  );
}

/* ─── Featured project hero — 3D laptop spotlight ──────────────────────────── */
function FeaturedProject({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 48, damping: 14, delay: 0.1 }}
      className="relative rounded-2xl border border-white/5 hover:border-primary/20 transition-colors duration-500 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(240 5% 13%) 0%, hsl(240 5% 10%) 100%)',
      }}
    >
      {/* Subtle bg glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/4 blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[540px]">

        {/* ── Left: text content ── */}
        <div className="flex flex-col justify-center p-10 lg:p-14 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground rounded shadow-lg">
              Featured
            </span>
            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/5 text-foreground/60 rounded border border-white/10">
              {project.category}
            </span>
          </div>

          {project.metric && (
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-6xl font-black text-primary tabular-nums">{project.metric}</span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{project.metricLabel}</span>
            </div>
          )}

          <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-2 leading-tight">
            {project.name}
          </h2>
          <p className="text-primary/80 font-bold tracking-widest mb-5 text-xs uppercase">
            {project.tagline}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-foreground/60 rounded border border-white/8"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-lg hover:bg-primary/90 hover:gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,107,53,0.45)] self-start"
          >
            View Case Study <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* ── Right: floating image panel ── */}
        <div
          className="relative flex items-center justify-center min-h-[420px] lg:min-h-[540px]"
          style={{ perspective: '900px' }}
        >
          <FloatingImage src={project.image} previewUrl={project.previewUrl} alt={project.name} />
        </div>

      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Our Portfolio | Raybytez Premium Engineering</title>
        <meta
          name="description"
          content="Review the elite portfolio of Raybytez — 50+ successful platforms engineered for high-performance and enterprise scale across e-commerce, fintech, healthcare, and more."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">

          {/* ── Hero ── */}
          <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden border-b border-white/5">
            <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-primary/8 blur-[180px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl"
              >
                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">
                  — Our Work
                </p>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-8 flex flex-wrap gap-x-5 gap-y-2">
                  <AnimeTextReveal text="Built." className="text-outline-orange" delayOffset={0} />
                  <AnimeTextReveal text="Shipped." className="text-foreground" delayOffset={150} />
                  <AnimeTextReveal text="Proven." className="text-primary" delayOffset={300} />
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed border-l-orange pl-6 max-w-3xl">
                  A curated selection of our finest engineering work. Production-grade platforms that dominate their markets and deliver measurable ROI.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Stats bar ── */}
          <section className="border-b border-white/5 bg-card/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {STATS.map((stat, i) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Featured project ── */}
          <section className="py-20 border-b border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-8"
              >
                — Spotlight Project
              </motion.p>
              <FeaturedProject project={FEATURED} />
            </div>
          </section>

          {/* ── Projects grid ── */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-3">— All Projects</p>
                  <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-foreground">
                    More <span className="text-primary">Work</span>
                  </h2>
                </motion.div>

                {/* Category filter pills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-wrap gap-2"
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded border transition-all duration-250 ${
                        activeCategory === cat
                          ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(255,107,53,0.3)]'
                          : 'bg-secondary/40 text-muted-foreground border-white/5 hover:border-primary/40 hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Grid — each card manages its own 3D perspective stage */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start"
                >
                  {filtered.length > 0 ? (
                    filtered.map((project, index) => (
                      <ProjectCard
                        key={project.name}
                        index={index}
                        {...project}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-3 py-24 text-center text-muted-foreground font-bold uppercase tracking-widest text-sm"
                    >
                      No projects in this category yet.
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-24 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10 pointer-events-none" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div style={{ perspective: '1000px' }}>
              <motion.div
                initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-10 bg-card border border-white/5 rounded-xl p-10 lg:p-14 hover:border-primary/20 transition-all duration-500"
              >
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">— Next Up</p>
                  <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-foreground leading-none mb-4">
                    Your project<br />could be here.
                  </h2>
                  <p className="text-muted-foreground font-medium max-w-md leading-relaxed">
                    We partner with ambitious teams to engineer products that scale. Let's discuss what we can build together.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded hover:bg-primary/90 hover:gap-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] text-sm"
                >
                  Start a Project <ArrowUpRight className="h-5 w-5" />
                </a>
              </motion.div>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}

export default PortfolioPage;