import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import InquiryForm from '@/components/InquiryForm.jsx';
import AnimeTextReveal from '@/components/AnimeTextReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';

function ContactPage() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const contactInfo = [
    { icon: Mail, title: 'Direct Email', content: 'raybytezstudio@gmail.com' },
    { icon: MapPin, title: 'Headquarters', content: 'Mumbai' },
    { icon: Clock, title: 'Operating Hours', content: 'Mon - Fri: 9:00 AM - 6:00 PM IST' },
  ];

  return (
    <>
      <Helmet>
        <title>Get In Touch | Raybytez</title>
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <Toaster position="bottom-right" />
        <main className="flex-1">
          <section className="py-24 relative overflow-hidden border-b border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
                <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-8 flex flex-wrap gap-4">
                  <AnimeTextReveal text="Get In" className="text-foreground" delayOffset={0} />
                  <AnimeTextReveal text="Touch." className="text-primary" delayOffset={200} />
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium border-l-orange pl-6">Initiate a conversation about your enterprise software requirements.</p>
              </motion.div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4 space-y-12">
                  <h2 className="text-3xl font-black uppercase border-l-orange pl-4">Contact Info</h2>
                  <div className="space-y-8">
                    {contactInfo.map((info) => (
                      <div key={info.title} className="flex items-start space-x-6 group">
                        <div className="w-14 h-14 rounded-xl bg-card border border-white/5 flex items-center justify-center group-hover:bg-primary smooth-transition">
                          <info.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground smooth-transition" />
                        </div>
                        <div className="pt-2">
                          <h3 className="font-bold uppercase text-sm mb-2">{info.title}</h3>
                          <p className="text-muted-foreground font-medium">{info.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  ref={ref}
                  onMouseMove={(e) => {
                    const rect = ref.current.getBoundingClientRect();
                    x.set((e.clientX - rect.left) / rect.width - 0.5);
                    y.set((e.clientY - rect.top) / rect.height - 0.5);
                  }}
                  onMouseLeave={() => { x.set(0); y.set(0); }}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
                  className="lg:col-span-8"
                >
                  <Card className="bg-card border-none shadow-premium relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
                    <CardContent className="p-10 md:p-14" style={{ transform: "translateZ(60px)" }}>
                      <h2 className="text-3xl font-black uppercase mb-10">Submit Request</h2>
                      <InquiryForm />
                    </CardContent>
                  </Card>
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

export default ContactPage;