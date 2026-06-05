/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Clock, Calendar, ArrowRight, X, ChevronRight, BookOpen } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES_DATA } from '../data';

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="artigos" className="py-16 md:py-24 xl:py-32 bg-lux-panel border-t border-lux-border relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(197,160,89,0.02),transparent)]" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">
              CONTEÚDOS E ATUALIZAÇÕES
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-lux-text-primary">
              Conteúdos e <span className="title-serif italic font-medium text-gold-brand">atualizações jurídicas</span>
            </h2>
            <div className="h-0.5 w-16 bg-gold-brand" />
          </div>
          <p className="text-sm md:text-base text-lux-text-secondary max-w-md font-light leading-relaxed">
            Artigos e informativos sobre temas trabalhistas, previdenciários e cíveis, com linguagem clara e foco em orientar decisões do dia a dia.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ARTICLES_DATA.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-lux-bg border border-lux-border hover:border-gold-brand/30 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/9] overflow-hidden bg-lux-panel border-b border-lux-border flex items-center justify-center">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 bg-lux-bg/95 backdrop-blur-sm border border-gold-brand/20 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-gold-brand">
                  {article.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Meta facts */}
                  <div className="flex items-center space-x-4 text-[11px] text-lux-text-muted font-medium">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-brand/80" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gold-brand/80" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-lux-text-primary tracking-tight transition-colors duration-200 group-hover:text-gold-light line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-lux-text-secondary line-clamp-3 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Read more button trigger */}
                <div className="pt-4 border-t border-lux-border/40">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold-brand group-hover:text-gold-light cursor-pointer outline-none transition-colors duration-200"
                  >
                    <span>LER ARTIGO</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-gold-brand" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full-Screen Readable Article Modal to provide extreme value */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-lux-bg/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in-backdrop">
          
          <div className="bg-lux-panel border border-lux-border-bright rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Header portion */}
            <div className="p-5 md:p-6 border-b border-lux-border flex justify-between items-center bg-lux-bg/60 absolute top-0 inset-x-0 z-10 backdrop-blur-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-brand">
                {selectedArticle.category}
              </span>
              <button
                id="close-article-modal"
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full hover:bg-lux-panel-light text-lux-text-secondary hover:text-lux-text-primary transition-all cursor-pointer outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body content */}
            <div className="overflow-y-auto p-6 md:p-10 pt-20 flex-grow scroll-bar-custom">
              
              {/* Title inside reading view */}
              <div className="space-y-4 mb-6">
                <h3 className="title-serif text-2xl md:text-3xl font-medium text-lux-text-primary leading-tight">
                  {selectedArticle.title}
                </h3>
                
                <div className="flex items-center space-x-6 text-xs text-lux-text-secondary font-medium border-y border-lux-border/40 py-3">
                  <span className="text-lux-text-muted">Por Dra. Fernanda Parentoni Avancini</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-brand/40" />
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-brand" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-brand/40" />
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-brand" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Cover in read-view */}
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8 border border-lux-border">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Rich Content paragraphs */}
              <div className="text-base text-lux-text-secondary leading-relaxed font-light space-y-6">
                <p className="text-lux-text-primary font-medium text-lg border-l-2 border-gold-brand pl-4 py-1 italic bg-gold-brand/3 rounded-r">
                  "{selectedArticle.excerpt}"
                </p>
                
                {/* Simulated paragraphs using detailed splits */}
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                
                <p>
                  A legislação brasileira, em especial nas áreas trabalhista, previdenciária e cível, passa por constantes atualizações. Contar com orientações claras e planejamentos adequados realizados por profissional dedicado assegura a proteção dos seus direitos e a sua segurança jurídica.
                </p>

                <p className="text-sm italic text-lux-text-muted mt-8 pt-4 border-t border-lux-border/40">
                  Aviso de Ética Jurídica: O conteúdo acima possui caráter puramente informativo e de esclarecimento público geral, não constituindo consulta jurídica vinculante nem promessa implícita de provimento em ações judiciais e respeitando integralmente as diretrizes do Provimento nº 205/2021 do Conselho Federal da OAB.
                </p>
              </div>

            </div>

            {/* Bottom Footer CTA */}
            <div className="p-6 md:px-10 border-t border-lux-border bg-lux-bg/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs font-semibold uppercase text-gold-brand tracking-widest">Precisa saber mais?</div>
                <div className="text-xs text-lux-text-muted">Fale diretamente sobre esta matéria com a advogada.</div>
              </div>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setTimeout(() => {
                    document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-brand hover:bg-gold-light text-lux-bg flex items-center justify-center space-x-2 transition-all duration-300 shrink-0 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Consultar Este Caso</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
