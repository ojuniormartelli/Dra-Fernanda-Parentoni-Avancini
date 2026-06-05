/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreSpecialties: () => void;
  bgImage?: string;
  portraitImage?: string;
}

export default function Hero({ onOpenConsultation, onExploreSpecialties, bgImage }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-lux-bg flex items-center pt-28 pb-16 min-h-[640px] md:min-h-[720px] lg:h-[800px] xl:h-[840px]"
    >
      {/* Background Graphic Imagery (Full Width) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {bgImage ? (
          <img
            src={bgImage}
            alt="Escritório"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] md:object-[right_25%] lg:object-[right_15%]"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 bg-lux-panel" />
        )}

        {/* Heavy dark overlay for mobile layout to ensure readability */}
        <div className="absolute inset-0 bg-lux-bg/90 md:hidden" />

        {/* Sophisticated dual layer horizontal gradient for desktop to merge text block seamlessly into image */}
        <div className="absolute inset-0 bg-gradient-to-r from-lux-bg via-lux-bg/95 via-45% to-lux-bg/25 hidden md:block" />
        
        {/* Subtly darkened bottom overlay to transition smoothly to the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-lux-bg via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Subtle blur highlights to add premium atmosphere */}
      <div className="absolute top-1/4 left-1/12 w-80 h-80 rounded-full bg-gold-brand/5 blur-[120px] pointer-events-none z-1" />

      {/* Hero Centralized Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-6 lg:px-8 w-full">
        
        {/* Focused left aligned content box */}
        <div className="w-full md:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gold-brand/5 border border-gold-brand/15 px-4 py-1.5 rounded-full w-fit"
          >
            <span className="text-xs tracking-wider font-semibold text-gold-light uppercase">
              Atendimento jurídico em Itapira e região
            </span>
          </motion.div>

          {/* Core Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3.5xl sm:text-4.5xl md:text-5xl lg:text-5.5xl font-light leading-[1.18] text-lux-text-primary tracking-tight"
          >
            Atuação jurídica com <span className="title-serif italic font-medium text-gold-brand">seriedade, clareza</span> e atenção ao seu caso.
          </motion.h1>

          {/* Core Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-lux-text-secondary leading-relaxed font-light text-balance"
          >
            A Dra. Fernanda Parentoni Avancini oferece atendimento nas áreas Trabalhista, Previdenciária e Cível, com foco em orientação segura, comunicação clara e acompanhamento próximo.
          </motion.p>

          {/* Clean and Resilient CTA Pack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <button
              id="hero-primary-cta"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-dark to-gold-brand hover:from-gold-brand hover:to-gold-light text-lux-bg transition-all duration-300 shadow-md shadow-gold-brand/10 hover:shadow-gold-brand/20 active:scale-97 cursor-pointer flex items-center justify-center space-x-2.5"
            >
              <span>AGENDAR CONSULTA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onExploreSpecialties}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider border border-lux-border-bright hover:border-gold-brand/80 text-lux-text-primary bg-lux-panel/30 hover:bg-lux-panel/75 transition-all duration-300 active:scale-97 cursor-pointer text-center"
            >
              CONHECER ÁREAS DE ATUAÇÃO
            </button>
          </motion.div>

          {/* Ethics Markers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 border-t border-lux-border/30 flex flex-wrap gap-x-6 gap-y-3.5 text-lux-text-muted text-[10px] md:text-xs font-semibold tracking-wider uppercase"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-gold-brand/70" />
              <span>ÉTICA E RESPONSABILIDADE</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-gold-brand/70" />
              <span>ATENDIMENTO HUMANO</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-gold-brand/70" />
              <span>ORIENTAÇÃO SEGURA</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

