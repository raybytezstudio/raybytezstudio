import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Layers, Cpu, Monitor, Wifi, Database, Cloud } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import TerminalTicker from '@/components/TerminalTicker';
import AnimatedNumber from '@/components/AnimatedNumber';
import AnimeTextReveal from '@/components/AnimeTextReveal';
import AnimatedIcon from '@/components/AnimatedIcon';
import Hero3DScene from '@/components/Hero3DScene';

const BackgroundIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[10%]">
        <Monitor className="w-48 h-48 text-primary" strokeWidth={0.5} />
      </motion.div>
      <motion.div animate={{ y: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[20%] right-[15%]">
        <Wifi className="w-56 h-56 text-primary" strokeWidth={0.5} />
      </motion.div>
      <motion.div animate={{ y: [0, -25, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[20%] left-[20%]">
        <Cpu className="w-40 h-40 text-foreground" strokeWidth={0.5} />
      </motion.div>
      <motion.div animate={{ y: [0, 35, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-[30%] right-[10%]">
        <Database className="w-32 h-32 text-primary" strokeWidth={0.5} />
      </motion.div>
      <motion.div animate={{ y: [0, -40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-[40%] left-[5%]">
        <Cloud className="w-36 h-36 text-foreground" strokeWidth={0.5} />
      </motion.div>
      <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[50%] right-[5%]">
        <Code2 className="w-44 h-44 text-foreground" strokeWidth={0.5} />
      </motion.div>
    </div>
  );
};

function HomePage() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "3", label: "Founders" },
    { value: "5+", label: "Years Experience" },
    { value: "99%", label: "Client Satisfaction" }
  ];

  const { scrollY } = useScroll();
const scrollVelocity = useVelocity(scrollY);
const smoothVelocity = useSpring(scrollVelocity, {
  damping: 50,
  stiffness: 400
});
const skew = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);
  const features = [
    {
      icon: Code2,
      title: 'Custom Engineering',
      description: 'Bespoke software solutions architected for your exact enterprise requirements.',
    },
    {
      icon: Layers,
      title: 'Scalable Architecture',
      description: 'Built on modern tech stacks ensuring your product grows seamlessly with your business.',
    },
    {
      icon: Cpu,
      title: 'High Performance',
      description: 'Optimized systems delivering lightning-fast speeds and reliable uptime.',
    },
  ];

  const characterAnimation = {
  initial: { maskImage: 'linear-gradient(to bottom, transparent 100%, black 100%)', y: 40 },
  animate: { 
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 0%)', 
    y: 0,
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] } 
  }
};

  return (
    <>
      <Helmet>
        <title>Raybytez | Premium Software Development Services</title>
        <meta
          name="description"
          content="Raybytez delivers innovative software solutions. Engineering digital futures with high-performance web and mobile applications."
        />
      </Helmet>

        <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white w-full overflow-x-hidden">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-16 sm:pb-32 w-full">
          {/* Main 3D Interactive Background */}
          <Hero3DScene />

          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pointer-events-none">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-8 items-center max-w-7xl mx-auto">
              <div className="w-full max-w-3xl pointer-events-auto">
                <div className="overflow-visible mb-6 pb-2">
                  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-none">
                    <AnimeTextReveal text="Engineering" className="text-outline-orange block mb-2" delayOffset={0} />
                    <AnimeTextReveal text="Digital" className="text-foreground block mb-2" delayOffset={300} />
                    <span className="text-foreground block flex items-end">
                      <AnimeTextReveal text="Futures" className="inline-block" delayOffset={600} />
                      <span className="text-primary ml-2 inline-block">.</span>
                    </span>
                  </h1>
                </div>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base sm:text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mb-8 sm:mb-12 border-l-orange pl-4 sm:pl-6"
                >
                  We construct high-performance web applications, mobile platforms, and digital tools that accelerate enterprise growth.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  <Button asChild size="lg" className="h-14 sm:h-16 px-6 sm:px-10 text-base sm:text-lg font-black tracking-wider bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] smooth-transition">
                    <Link to="/contact">
                      GET QUOTE
                      <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 sm:h-16 px-6 sm:px-10 text-base sm:text-lg font-bold tracking-wider border-white/20 hover:bg-white/5 hover:border-primary smooth-transition">
                    <Link to="/portfolio">VIEW PORTFOLIO</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-24 bg-card border-y border-white/5 relative z-20">
          <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center px-4"
                >
                  <div className="text-5xl md:text-6xl font-black text-foreground mb-4">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <div className="text-sm md:text-base font-bold text-primary uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16 sm:py-32 relative">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          
          <div className="w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                Uncompromising <span className="text-primary">Excellence</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                With a robust foundation of 50+ successful projects, our core team of 3 founders brings elite technical architecture directly to your business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-card p-10 rounded-xl border-l-orange hover-glow hover:-translate-y-2 smooth-transition shadow-premium group"
                >
                  <div className="w-16 h-16 rounded-xl bg-background border border-white/5 flex items-center justify-center mb-8 group-hover:bg-primary smooth-transition">
                    <AnimatedIcon icon={feature.icon} className="h-8 w-8 text-primary group-hover:text-primary-foreground smooth-transition" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-20"
            >
              <Button asChild size="lg" className="h-14 px-8 text-base font-bold tracking-wider uppercase bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground smooth-transition">
                <Link to="/services">
                  Explore All Services
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;