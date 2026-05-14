import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'Founders', path: '/founders' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-card border-t border-white/5 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <span className="text-3xl font-black tracking-tighter text-foreground mb-6 block">
              RAYBYTEZ<span className="text-primary">.</span>
            </span>
            <p className="text-base text-muted-foreground leading-relaxed mb-6 font-medium">
              Engineering digital futures through innovative software solutions. We build scalable applications that drive enterprise growth.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground smooth-transition hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground border-l-orange pl-3">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary smooth-transition flex items-center group font-medium"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 smooth-transition text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground border-l-orange pl-3">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-muted-foreground font-medium">
                <MapPin className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span>Mumbai</span>
              </li>
              <li className="flex items-center text-muted-foreground font-medium">
                <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                <span>raybytezstudio@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* CTA placeholder */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground border-l-orange pl-3">Start a Project</h4>
            <p className="text-muted-foreground mb-6 font-medium">
              Ready to transform your ideas into reality? Let's discuss your next big move.
            </p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold hover:shadow-[0_0_15px_rgba(255,107,53,0.3)] smooth-transition">
              <Link to="/contact">REQUEST PROPOSAL</Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground font-medium">
              © {currentYear} Raybytez. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm font-medium">
              <Link to="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary smooth-transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;