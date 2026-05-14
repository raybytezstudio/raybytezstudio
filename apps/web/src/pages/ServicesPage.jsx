import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Cpu,
  PenTool,
  TrendingUp,
  Bot,
  ShoppingCart,
  Smartphone,
  Server,
  Code,
  Image as ImageIcon
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AnimeTextReveal from '@/components/AnimeTextReveal';
import Hover3DTilt from '@/components/Hover3DTilt';

function ServicesPage() {
  const serviceCategories = [
    {
      icon: Cpu,
      title: 'AI & Modern Architecture',
      description: 'Advanced engineering including AI Integration (ChatBots, GPT APIs), SaaS Development, Cloud Deployment (AWS, Vercel), and Microservices Architecture.',
    },
    {
      icon: PenTool,
      title: 'UI/UX & Product Design',
      description: 'Crafting superior experiences with App & Web Flow Design, Wireframing & Prototyping, Design System Creation, and Mobile-first Responsive Design.',
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing & SEO',
      description: 'Data-driven growth through Performance Optimization, Technical SEO, Conversion Optimization, and comprehensive Google Analytics Setup.',
    },
    {
      icon: Bot,
      title: 'Automation & Bots',
      description: 'Streamlining operations via Complex Web Scraping, Workflow Automation, Bot Development (Telegram/Discord), and Python Automation.',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Solutions',
      description: 'End-to-end commerce including Complete Store Setup, Payment Gateway Integration, Product & Inventory Systems, Shopify Customization, and WooCommerce.',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Engineering',
      description: 'Building native and cross-platform apps (Android, React Native, Flutter), App UI Redesign, and Play Store Development Guidance.',
    },
    {
      icon: Server,
      title: 'Backend & Data Infrastructure',
      description: 'Robust server solutions with Database Optimization, Data Migration (Firebase to MongoDB), Backend Scaling Infrastructure, and Maintenance Plans.',
    },
    {
      icon: Code,
      title: 'Custom Web Platforms',
      description: 'Bespoke web development from Startup MVP Development to Developer Portfolios, Custom Admin Dashboards, and College Project Development.',
    },
    {
      icon: ImageIcon,
      title: 'CMS & Brand Identity',
      description: 'Complete digital presence covering Wix, WordPress, Figma & Canva Expertise, Logo Design & Branding, and Advertisement Posters & Socials.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Raybytez Premium Engineering</title>
        <meta
          name="description"
          content="Explore Raybytez comprehensive software development services from AI integration and app development to fullstack infrastructure scaling."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-24 lg:py-32 relative overflow-hidden border-b border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[150px] -z-10 pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
                <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-8 flex flex-wrap gap-4">
                  <AnimeTextReveal text="Our" className="text-outline-orange" delayOffset={0} />
                  <AnimeTextReveal text="Services." className="text-primary" delayOffset={200} />
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed border-l-orange pl-6">
                  From initial concept to final deployment, we provide elite engineering services across 9 core disciplines tailored strictly to ambitious business needs.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceCategories.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
                    className="h-full"
                  >
                    <Hover3DTilt className="h-full" maxTilt={15}>
                    <div className="h-full bg-card border-none border-l-orange shadow-premium hover-glow smooth-transition flex flex-col p-8 group relative overflow-hidden rounded-xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 smooth-transition pointer-events-none" />
                      
                      <div className="relative z-10 flex-1">
                        <motion.div 
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                          className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary smooth-transition"
                        >
                          <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground smooth-transition" />
                        </motion.div>
                        <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary smooth-transition mb-4">
                          {service.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed font-medium">
                          {service.description}
                        </p>
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

export default ServicesPage;