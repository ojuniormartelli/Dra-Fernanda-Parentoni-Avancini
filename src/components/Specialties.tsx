/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Briefcase, Calendar, Shield, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';

interface SpecialtiesProps {
  onSelectSpecialty: (id: PageId) => void;
}

export default function Specialties({ onSelectSpecialty }: SpecialtiesProps) {
  const cards = [
    {
      id: 'trabalhista' as PageId,
      title: 'Direito Trabalhista',
      subtitle: 'ORIENTAÇÃO E ATUAÇÃO NAS RELAÇÕES DE TRABALHO',
      description: 'Análise de verbas rescisórias, horas extras, adicionais, vínculo de emprego e outras questões relacionadas às relações de trabalho.',
      icon: Briefcase,
      accent: 'TRABALHISTA'
    },
    {
      id: 'previdenciario' as PageId,
      title: 'Direito Previdenciário',
      subtitle: 'APOSENTADORIAS, BENEFÍCIOS E DEMANDAS DO INSS',
      description: 'Orientação em aposentadorias, benefícios por incapacidade, revisões e outras demandas ligadas ao INSS.',
      icon: Calendar,
      accent: 'PREVIDENCIÁRIO'
    },
    {
      id: 'civel' as PageId,
      title: 'Direito Cível',
      subtitle: 'CONTRATOS, COBRANÇAS E OUTRAS QUESTÕES CÍVEIS',
      description: 'Atuação em contratos, cobranças, responsabilidade civil, inventários e outras questões cíveis que exigem orientação jurídica segura e individualizada.',
      icon: Shield,
      accent: 'CÍVEL'
    }
  ];

  return (
    <section
      id="especialidades"
      className="py-16 md:py-24 xl:py-32 bg-lux-panel border-t border-lux-border relative"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.03),transparent)]" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">
              ÁREAS DE ATUAÇÃO
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-lux-text-primary uppercase tracking-tight">
              Áreas de atuação
            </h2>
            <div className="h-0.5 w-16 bg-gold-brand" />
          </div>
          <p className="text-sm md:text-base text-lux-text-secondary max-w-md font-light leading-relaxed">
            Atendimento ético, técnico e transparente nas áreas Trabalhista, Previdenciária e Cível, com orientação clara e atenção às particularidades de cada demanda.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-lux-bg border border-lux-border hover:border-gold-brand/40 hover:shadow-2xl hover:shadow-gold-brand/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual top border indicator that glows on hover */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-brand/0 to-transparent group-hover:via-gold-brand/60 transition-all duration-500" />
                
                <div className="space-y-6">
                  {/* Top Header inside card */}
                  <div className="flex justify-between items-start">
                    <div className="p-3.5 bg-lux-panel/80 rounded-xl border border-lux-border group-hover:border-gold-brand/20 transition-all duration-300">
                      <Icon className="w-6 h-6 text-gold-brand" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-lux-text-muted bg-lux-panel px-2.5 py-1 rounded border border-lux-border/50">
                      Direito {card.accent}
                    </span>
                  </div>

                  {/* Copy */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-lux-text-primary tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-gold-brand/80 font-semibold">
                      {card.subtitle}
                    </p>
                    <p className="text-sm text-lux-text-secondary leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="pt-8 mt-6 border-t border-lux-border/40 flex items-center justify-between">
                  <button
                    onClick={() => onSelectSpecialty(card.id)}
                    className="text-xs uppercase tracking-widest font-semibold text-gold-brand group-hover:text-gold-light transition-all duration-200 cursor-pointer flex items-center space-x-2 outline-none"
                  >
                    <span>CONHECER ESPECIALIDADE</span>
                    <ArrowUpRight className="w-4 h-4 text-gold-brand group-hover:text-gold-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Help Line */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 text-xs md:text-sm text-lux-text-secondary font-light">
            <span>Procura orientação sobre uma situação específica? Entre em contato para agendar seu atendimento.</span>
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contato');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gold-brand hover:text-gold-light underline font-semibold cursor-pointer tracking-wider uppercase text-xs"
            >
              FALAR PELO WHATSAPP
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
