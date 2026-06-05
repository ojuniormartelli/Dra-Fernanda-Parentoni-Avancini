/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { ArrowUp, Scale, Linkedin, Instagram, FileText } from 'lucide-react';

interface FooterProps {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
}

export default function Footer({ currentPage, navigateTo }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-lux-bg border-t border-lux-border pt-16 pb-8 text-sm text-lux-text-secondary">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0">
        
        {/* Upper footer portion */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-lux-border/60">
          
          {/* Logo portion */}
          <div className="md:col-span-4 space-y-4">
            <button
              onClick={() => { navigateTo('home'); window.scrollTo({ top: 0 }); }}
              className="flex items-center space-x-3 text-left cursor-pointer outline-none group"
            >
              <div className="w-10 h-10 rounded-lg border border-gold-brand/20 flex items-center justify-center bg-lux-panel overflow-hidden relative transition-all duration-300 group-hover:border-gold-brand">
                <img 
                  src="/logo-fernanda-parentoni-avancini.png" 
                  alt="Logo Fernanda Parentoni Avancini" 
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                  referrerPolicy="no-referrer"
                />
                <span className="title-serif text-lg font-bold text-gold-brand tracking-widest z-0">FA</span>
              </div>
              <div>
                <span className="block title-serif text-md font-bold tracking-wide text-lux-text-primary uppercase">
                  Fernanda Parentoni Avancini
                </span>
                <span className="block text-[9px] tracking-widest font-semibold uppercase text-gold-brand/80">
                  Advocacia
                </span>
              </div>
            </button>
            <p className="text-xs text-lux-text-muted leading-relaxed font-light">
              Atendimento jurídico transparente, ético e responsável nas áreas Trabalhista, Previdenciária e Cível.
            </p>
          </div>

          {/* Map Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs tracking-wider font-bold text-gold-brand uppercase">ENDEREÇO</h4>
            <p className="text-xs text-lux-text-muted font-semibold leading-relaxed">
              R. Joaquim Inácio, 276 - Centro, Itapira - SP, 13970-150
            </p>
            <p className="text-xs text-lux-text-muted font-light leading-relaxed">
              Atendimento presencial e online para a região.
            </p>
            <p className="text-xs text-lux-text-muted font-light leading-relaxed">
              Agendamentos podem ser realizados de forma presencial ou por videoconferência.
            </p>
          </div>

          {/* Helpful Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs tracking-wider font-bold text-gold-brand uppercase">NAVEGAÇÃO</h4>
            <div className="flex flex-col space-y-2 text-xs font-light">
              <button onClick={() => handleLinkClick('#inicio')} className="hover:text-gold-brand cursor-pointer text-left">Voltar ao Hero</button>
              <button onClick={() => handleLinkClick('#escritorio')} className="hover:text-gold-brand cursor-pointer text-left">Quem Somos</button>
              <button onClick={() => handleLinkClick('#especialidades')} className="hover:text-gold-brand cursor-pointer text-left">Áreas de Atuação</button>
              <button onClick={() => handleLinkClick('#artigos')} className="hover:text-gold-brand cursor-pointer text-left">Conteúdos</button>
              <button onClick={() => handleLinkClick('#contato')} className="hover:text-gold-brand cursor-pointer text-left">Fale Conosco</button>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs tracking-wider font-bold text-gold-brand uppercase font-semibold">CANAIS DIGITAIS</h4>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/fernanda-parentoni-avancini-07ba35bb/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-lux-panel border border-lux-border hover:border-gold-brand flex items-center justify-center text-lux-text-secondary hover:text-gold-brand transition-colors"
                aria-label="Acessar LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/feravancini.adv/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-lux-panel border border-lux-border hover:border-gold-brand flex items-center justify-center text-lux-text-secondary hover:text-gold-brand transition-colors"
                aria-label="Acessar Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[10px] text-lux-text-muted leading-relaxed font-light">
              Acompanhe conteúdos e atualizações jurídicas.
            </p>
          </div>

        </div>

        {/* Lower footer portion */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs text-lux-text-muted">
          
          <div className="space-y-1">
            <p>© 2026 Fernanda Parentoni Avancini Advocacia. Todos os direitos reservados.</p>
            <p className="font-light text-[10px] leading-relaxed max-w-3xl">
              De acordo com o Código de Ética e Disciplina da OAB (Provimento nº 205/2021), este ambiente digital possui finalidade informativa e institucional, sem captação indevida de clientela ou mercantilização da advocacia.
            </p>
          </div>

          <button
            id="footer-back-to-top"
            onClick={handleScrollToTop}
            className="group flex items-center space-x-2 text-xs font-semibold text-gold-brand hover:text-gold-light tracking-wider uppercase shrink-0 transition-colors cursor-pointer outline-none"
          >
            <span>Voltar ao topo</span>
            <div className="w-8 h-8 rounded-full border border-lux-border group-hover:border-gold-brand flex items-center justify-center transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>

      </div>
    </footer>
  );
}
