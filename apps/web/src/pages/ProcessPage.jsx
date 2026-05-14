import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import AnimeTextReveal from '@/components/AnimeTextReveal';
import PinnedShowcase from '@/components/PinnedShowcase';

function ProcessPage() {
  return (
    <>
      <Helmet>
        <title>Our Process | Raybytez Workflow</title>
        <meta
          name="description"
          content="Discover Raybytez's 8-Phase Development Workflow. We follow a systematic approach to ensure premium software delivery."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">

          {/* ── Hero ── */}
          <section className="py-24 relative overflow-hidden border-b border-white/5">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">— How We Build</p>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 flex flex-wrap gap-4">
                  <AnimeTextReveal text="The" className="text-foreground" delayOffset={0} />
                  <AnimeTextReveal text="Workflow." className="text-primary" delayOffset={200} />
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed border-l-orange pl-6">
                  Our refined 8-phase engineering process ensures transparency, scalability, and elite execution from concept to launch.
                  <span className="block mt-2 text-sm text-muted-foreground/60 font-normal">Scroll through each phase below ↓</span>
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── 8-Phase Pinned Scroll Showcase ── */}
          <PinnedShowcase />

          {/* ── Important Note ── */}
          <section className="py-24 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-card/50 border border-orange rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-premium">
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-6" />
                  <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-8">
                    Project schedules may shift depending on the complexity of requested features (especially complex AI or Microservices integrations). We recommend engaging with the Raybytez founders early for accurate architecture estimation.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] smooth-transition"
                  >
                    <Link to="/contact">
                      CONTACT MANAGER
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}

export default ProcessPage;