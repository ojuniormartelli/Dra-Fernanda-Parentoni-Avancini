/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldAlert, Fingerprint, Scale, Scroll } from 'lucide-react';

export default function Differences() {
  const items = [
    {
      num: '01',
      title: 'ATENDIMENTO PERSONALIZADO',
      description: 'Cada caso é analisado com atenção, considerando suas particularidades e a melhor forma de condução jurídica.',
      icon: Fingerprint
    },
    {
      num: '02',
      title: 'ATUAÇÃO TÉCNICA E RESPONSÁVEL',
      description: 'Análise cuidadosa da legislação e dos entendimentos aplicáveis para orientar cada demanda com segurança.',
      icon: Scale
    },
    {
      num: '03',
      title: 'COMUNICAÇÃO CLARA',
      description: 'Explicações objetivas e acessíveis para que você compreenda melhor os caminhos do seu caso.',
      icon: Scroll
    },
    {
      num: '04',
      title: 'ACOMPANHAMENTO PRÓXIMO',
      description: 'Atendimento com escuta, responsabilidade e proximidade em cada etapa necessária.',
      icon: ShieldAlert
    }
  ];

  return (
    <section id="diferenciais" className="py-16 md:py-24 xl:py-32 bg-lux-bg border-t border-lux-border relative overflow-hidden">
      {/* Background graphic touch */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-brand/3 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">
            DIFERENCIAIS
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-lux-text-primary tracking-tight text-balance">
            Por que escolher o escritório <span className="title-serif italic font-medium text-gold-brand">Fernanda Parentoni Avancini?</span>
          </h2>
          <div className="h-0.5 w-16 bg-gold-brand mx-auto" />
          <p className="text-sm md:text-base text-lux-text-secondary font-light max-w-xl mx-auto pt-2 leading-relaxed">
            Atendimento jurídico pautado em responsabilidade, clareza e análise cuidadosa de cada situação.
          </p>
        </div>

        {/* Layout Grid - 2x2 on Desktop, 1 on Mobile */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((diff) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.num}
                className="group relative flex flex-col sm:flex-row gap-6 p-6 md:p-8 rounded-2xl bg-lux-panel border border-lux-border/60 hover:border-gold-brand/20 transition-all duration-300"
              >
                {/* Number Badge with Display Serif Styling */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-lux-bg border border-lux-border/80 group-hover:border-gold-brand/25 transition-all duration-300">
                  <span className="title-serif text-xl font-bold text-gold-brand tracking-wider">
                    {diff.num}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4.5 h-4.5 text-gold-brand" />
                    <h3 className="text-lg font-semibold text-lux-text-primary tracking-wide uppercase text-xs md:text-sm">
                      {diff.title}
                    </h3>
                  </div>
                  <p className="text-sm text-lux-text-secondary leading-relaxed font-light">
                    {diff.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
