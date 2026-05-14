import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ProcessPage from './pages/ProcessPage.jsx';

import PortfolioPage from './pages/PortfolioPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import GlowCursor from './components/GlowCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import ScreenLoader from './components/ScreenLoader';


// Reusable wrapper for page animations
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -24 }}
    transition={{
      duration: 0.45,
      ease: [0.33, 1, 0.68, 1],
    }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(    true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <ScreenLoader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <GlowCursor />
      <ScrollProgressBar />
      <ScrollToTop />
     
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
          <Route path="/process" element={<PageWrapper><ProcessPage /></PageWrapper>} />

          <Route path="/portfolio" element={<PageWrapper><PortfolioPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;