import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Github, Linkedin, Twitter } from 'lucide-react';
import AnimeTextReveal from '@/components/AnimeTextReveal';
import Hover3DTilt from '@/components/Hover3DTilt';

function FoundersPage() {
  const founders = [
    {
      name: 'Parag Suthar',
      role: 'Co-Founder ',
      bio: 'Strategic thinker focused on scalable digital architectures and business integration.',
      image: 'https://images.unsplash.com/photo-1641108001784-cdf7d87b353f?auto=format&fit=crop&q=80',
    },
    {
      name: 'Yug Joshi',
      role: 'Co-Founder ',
      bio: 'Expert in advanced backend systems, automation, and core engineering infrastructure.',
      image: 'https://images.unsplash.com/photo-1652841190565-b96e0acbae17?auto=format&fit=crop&q=80',

      
    },
    {
      name: 'Aditya Nawal',
      role: 'Co-Founder ',
      bio: 'Creative visionary obsessed with pixel-perfect UI/UX design and brand identity.',
      image: 'https://images.unsplash.com/photo-1625581652944-2f297562baa5?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Founders | Raybytez</title>
        <meta
          name="description"
          content="Meet the Raybytez co-founders: Yug Joshi, Parag Suthar, and Aditya Nawal. Leaders in elite software engineering."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-24 relative overflow-hidden border-b border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[150px] -z-10 pointer-events-none" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl text-center mx-auto"
              >
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 flex flex-wrap justify-center gap-4">
                  <AnimeTextReveal text="The" className="text-foreground" delayOffset={0} />
                  <AnimeTextReveal text="Founders." className="text-primary" delayOffset={200} />
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                  Meet the architectural minds behind Raybytez. We combine deep technical expertise with relentless execution.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Founders Grid */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {founders.map((founder, index) => (
                  <motion.div
                    key={founder.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 50 }}
                    className="h-full"
                  >
                   <Hover3DTilt className="h-full" maxTilt={12}>
                    <div className="bg-card rounded-2xl border-orange overflow-hidden shadow-premium group hover-glow relative h-full">
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent z-10 smooth-transition" />
                      <img 
                        src={founder.image} 
                        alt={`Portrait of ${founder.name}`} 
                        className="w-full h-full object-cover group-hover:scale-105 smooth-transition duration-700"
                      />
                    </div>
                    
                    <div className="p-8 relative z-20 bg-card border-t border-white/5">
                      <div className="text-primary font-black mb-2 uppercase tracking-widest text-xs">
                        {founder.role}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-foreground">
                        {founder.name}
                      </h3>
                      <p className="text-muted-foreground font-medium leading-relaxed mb-6">
                        {founder.bio}
                      </p>
                      
                      <div className="flex space-x-4">
                        <a href="#" className="text-muted-foreground hover:text-primary smooth-transition" aria-label={`${founder.name}'s LinkedIn`}>
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary smooth-transition" aria-label={`${founder.name}'s Twitter`}>
                          <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary smooth-transition" aria-label={`${founder.name}'s GitHub`}>
                          <Github className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                   </div>
                   </Hover3DTilt>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default FoundersPage;