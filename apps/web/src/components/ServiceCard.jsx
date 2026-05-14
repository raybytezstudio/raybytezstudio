import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ServiceCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full bg-card border-none border-l-orange shadow-premium hover-glow hover:-translate-y-2 smooth-transition flex flex-col group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 smooth-transition" />
        
        <CardHeader className="relative z-10 pb-4">
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary smooth-transition">
            <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground smooth-transition" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary smooth-transition">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 flex-1">
          <p className="text-base text-muted-foreground leading-relaxed font-medium">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ServiceCard;