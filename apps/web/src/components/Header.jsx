import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 z-50 w-full bg-transparent transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-black text-foreground tracking-tighter group-hover:text-primary smooth-transition">
              RAYBYTEZ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider smooth-transition relative group ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute -bottom-2 left-0 h-0.5 bg-primary smooth-transition ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </Link>
            ))}
            
            <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,107,53,0.4)] smooth-transition ml-4">
              <Link to="/contact">GET QUOTE</Link>
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:text-primary smooth-transition text-foreground">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-l-border">
              <nav className="flex flex-col space-y-6 mt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-black tracking-tight uppercase smooth-transition px-4 py-2 border-l-orange ${
                      isActive(link.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="px-4 pt-6">
                  <Button asChild size="lg" className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 smooth-transition" onClick={() => setIsOpen(false)}>
                    <Link to="/contact">GET QUOTE</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;