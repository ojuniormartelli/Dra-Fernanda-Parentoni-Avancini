/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Specialties from './components/Specialties';
import Differences from './components/Differences';
import Articles from './components/Articles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpecialtyPage from './components/SpecialtyPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Read initial route from URL parameters to simulate full Next.js App routing
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as PageId;
    return ['home', 'trabalhista', 'previdenciario', 'civel'].includes(pageParam) ? pageParam : 'home';
  });

  // Landing page mode state (can be toggled interactively or read from URL lp=true or mode=lp)
  const [isLpMode, setIsLpMode] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lp') === 'true' || params.get('mode') === 'lp';
  });

  // Track URL updates and allow backwards/forward history navigation in browser
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page') as PageId;
      const lpParam = params.get('lp') === 'true' || params.get('mode') === 'lp';
      
      setCurrentPage(['home', 'trabalhista', 'previdenciario', 'civel'].includes(pageParam) ? pageParam : 'home');
      setIsLpMode(lpParam);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Set the current page state and adjust browser URLs gracefully
  const navigateTo = (page: PageId, lp: boolean = false) => {
    setCurrentPage(page);
    setIsLpMode(lp);
    
    const params = new URLSearchParams();
    if (page !== 'home') params.set('page', page);
    if (lp) params.set('lp', 'true');
    
    const newSearch = params.toString() ? `?${params.toString()}` : '';
    window.history.pushState(null, '', `${window.location.pathname}${newSearch}`);
    
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick helper to scroll to contact form from CTAs
  const handleOpenConsultation = () => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const contactSection = document.querySelector('#contato');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const contactSection = document.querySelector('#contato');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick helper to scroll from Hero to Specialties
  const handleExploreSpecialties = () => {
    const specSection = document.querySelector('#especialidades');
    specSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLpMode = () => {
    const nextMode = !isLpMode;
    navigateTo(currentPage, nextMode);
  };

  // Generated premium images for our custom showcase
  const portraitUrl = '/images/fernanda_avancini_office_1780499722468.png';
  const officeBgUrl = '/images/luxury_law_firm_interior_1780499738480.png';

  const isHome = currentPage === 'home';

  return (
    <div className="relative min-h-screen bg-lux-bg font-sans selection:bg-gold-brand selection:text-lux-bg">
      
      {/* 
        Header renders conditionally:
        - Rendered on homepage ALWAYS.
        - Rendered on internal specialty pages ONLY if not in landing-page mode.
      */}
      {(!isLpMode || isHome) && (
        <Header 
          currentPage={currentPage} 
          navigateTo={navigateTo} 
          onOpenConsultation={handleOpenConsultation}
        />
      )}

      {/* Main Page Layout Wrapper with AnimatePresence */}
      <main id="app-viewport" className="w-full">
        <AnimatePresence mode="wait">
          {isHome ? (
            <motion.div
              key="homepage-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Core site-vitrine stack */}
              <Hero 
                onOpenConsultation={handleOpenConsultation}
                onExploreSpecialties={handleExploreSpecialties}
                bgImage={officeBgUrl}
                portraitImage={portraitUrl}
              />
              
              <About portraitImage={portraitUrl} />
              
              <Specialties onSelectSpecialty={(id) => navigateTo(id, false)} />
              
              <Differences />
              
              <Articles />
              
              <Contact />
            </motion.div>
          ) : (
            <motion.div
              key={`${currentPage}-view`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Internal page stack representing a route */}
              <SpecialtyPage 
                specialtyId={currentPage}
                landingPageMode={isLpMode}
                onBackToHome={() => navigateTo('home', false)}
                onToggleMode={toggleLpMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/*
        Footer renders conditionally:
        - Rendered on homepage ALWAYS.
        - Rendered on internal specialty pages ONLY if not in landing-page mode.
      */}
      {(!isLpMode || isHome) && (
        <Footer currentPage={currentPage} navigateTo={navigateTo} />
      )}

    </div>
  );
}
