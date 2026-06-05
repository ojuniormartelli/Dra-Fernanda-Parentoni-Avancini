/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Scale } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  navigateTo: (page: PageId, lp?: boolean) => void;
  onOpenConsultation: () => void;
}

export default function Header({ currentPage, navigateTo, onOpenConsultation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', href: '#inicio', page: 'home' as PageId },
    { label: 'Escritório', href: '#escritorio', page: 'home' as PageId },
    { label: 'Especialidades', href: '#especialidades', page: 'home' as PageId },
    { label: 'Artigos', href: '#artigos', page: 'home' as PageId },
    { label: 'Contato', href: '#contato', page: 'home' as PageId },
  ];

  const handleLinkClick = (item: typeof menuItems[0]) => {
    setIsOpen(false);
    if (currentPage !== 'home') {
      navigateTo('home');
      // Delay scrolling to allow homepage component to mount
      setTimeout(() => {
        const element = document.querySelector(item.href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(item.href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    navigateTo('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-lux-bg/90 backdrop-blur-md border-b border-lux-border py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0 flex items-center justify-between">
        {/* Typographic Logo Monogram */}
        <button
          id="logo-home-button"
          onClick={handleLogoClick}
          className="flex items-center space-x-3 group text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg border border-gold-brand/30 flex items-center justify-center bg-lux-panel transition-all duration-300 group-hover:border-gold-brand overflow-hidden relative">
            <img 
              src="/logo-fernanda-parentoni-avancini.png" 
              alt="Logo Fernanda Parentoni Avancini" 
              className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300"
              onError={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
              referrerPolicy="no-referrer"
            />
            <span className="title-serif text-xl font-semibold text-gold-brand tracking-widest z-0">FA</span>
          </div>
          <div>
            <span className="block title-serif text-md md:text-lg font-bold tracking-wide text-lux-text-primary uppercase group-hover:text-gold-brand transition-colors duration-300">
              Fernanda Parentoni Avancini
            </span>
            <span className="block text-[9px] md:text-[10px] tracking-widest font-medium uppercase text-gold-brand/80">
              Advocacia
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item)}
              className="text-sm font-medium tracking-wide text-lux-text-secondary hover:text-gold-brand cursor-pointer transition-colors duration-300 py-1 border-b border-transparent hover:border-gold-brand/40"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header CTA Button */}
        <div className="hidden lg:flex items-center">
          <button
            id="header-cta-button"
            onClick={onOpenConsultation}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-dark to-gold-brand hover:from-gold-brand hover:to-gold-light text-lux-bg hover:text-lux-bg shadow-md hover:shadow-gold-brand/25 active:scale-95 transition-all duration-300 cursor-pointer flex items-center space-x-1"
          >
            <span>Agendar Consulta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-1 text-lux-text-primary hover:text-gold-brand transition-colors duration-200 outline-none"
          aria-label="Abrir menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] h-[calc(100vh-72px)] bg-lux-bg border-t border-lux-border px-6 py-8 flex flex-col space-y-6 z-45 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item)}
                style={{ animationDelay: `${index * 50}ms` }}
                className="text-left text-lg font-medium tracking-wide text-lux-text-secondary hover:text-gold-brand hover:pl-2 transition-all duration-300 py-2 border-b border-lux-border/50 animate-fade-in"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6">
            <button
              id="mobile-header-cta"
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-gold-dark to-gold-brand hover:from-gold-brand text-lux-bg shadow-lg cursor-pointer"
            >
              <span>Agendar Consulta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-auto pt-6 border-t border-lux-border flex flex-col items-center space-y-4 text-center">
            <div className="flex items-center space-x-2 text-gold-brand/80 text-xs tracking-wider uppercase font-medium">
              <Scale className="w-4 h-4" />
              <span>Dra. Fernanda Parentoni Avancini</span>
            </div>
            <p className="text-[11px] text-lux-text-muted">
              Atendimento presencial em Itapira e região ou por videoconferência.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
