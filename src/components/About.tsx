/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  portraitImage: string;
}

export default function About({ portraitImage }: AboutProps) {
  const credentials = [
    { 
      title: 'TRABALHO TÉCNICO E DEDICADO', 
      text: 'Análise cuidadosa de cada situação, com atenção à legislação e aos caminhos jurídicos mais adequados para cada caso.' 
    },
    { 
      title: 'ATENDIMENTO PRÓXIMO E DIRETO', 
      text: 'Contato próximo em todas as etapas importantes, com acompanhamento responsável e atenção às necessidades de cada cliente.' 
    },
    { 
      title: 'TRANSPARÊNCIA E CLAREZA', 
      text: 'Explicações objetivas e acessíveis sobre o andamento e as possibilidades de cada demanda, sem excessos de juridiquês.' 
    }
  ];

  return (
    <section
      id="escritorio"
      className="py-16 md:py-24 xl:py-32 bg-lux-bg border-t border-lux-border/50 relative overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-gold-brand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Portrait Photo Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group max-w-sm mx-auto lg:max-w-none">
              
              {/* Outer decorative borders and offsets */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold-brand/20 rounded-2xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-gold-brand/30 rounded-tr-2xl -z-10 pointer-events-none" />
              
              {/* Image Container with strict Aspect Ratio */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-lux-border/80 shadow-2xl bg-lux-panel">
                <img
                  src={portraitImage}
                  alt="Dra. Fernanda Parentoni Avancini"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle dark overlay edge to prevent high brightness */}
                <div className="absolute inset-0 bg-gradient-to-t from-lux-bg/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Float Badge hidden until real OAB is provided */}
              {/* 
              <div className="absolute -bottom-3 right-6 bg-lux-panel border border-gold-brand/30 px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 pointer-events-none">
                <Award className="w-5 h-5 text-gold-brand" />
                <div>
                  <div className="text-[10px] tracking-wider uppercase text-lux-text-muted font-bold">Inscrição</div>
                  <div className="text-xs font-semibold text-lux-text-primary">OAB/[OAB]</div>
                </div>
              </div>
              */}

            </div>
          </div>

          {/* Column 2: Narrative copy and credentials */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col space-y-6 md:space-y-8">
            
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">
                SOBRE O ESCRITÓRIO
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-lux-text-primary">
                Atendimento jurídico com <span className="title-serif italic font-medium text-gold-brand">seriedade, clareza</span> e compromisso.
              </h2>
              <div className="h-0.5 w-16 bg-gold-brand" />
            </div>

            <div className="text-lux-text-secondary leading-relaxed space-y-4 font-light text-base md:text-lg">
              <p>
                A atuação da Dra. Fernanda Parentoni Avancini é voltada à orientação jurídica segura, transparente e próxima, com atenção às particularidades de cada caso.
              </p>
              <p>
                O trabalho é conduzido com estudo cuidadoso, escuta atenta e acompanhamento responsável, para que o cliente tenha mais clareza em cada etapa.
              </p>
            </div>

            {/* Structured Credentials Checklist */}
            <div className="grid gap-6 pt-4">
              {credentials.map((cred) => (
                <div key={cred.title} className="flex gap-4 items-start p-4 bg-lux-panel/50 border border-lux-border/40 rounded-xl hover:border-gold-brand/20 transition-all duration-300">
                  <div className="flex-shrink-0 mt-1 p-1 bg-gold-brand/10 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-gold-brand" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lux-text-primary text-sm uppercase tracking-wider">{cred.title}</h4>
                    <p className="text-sm text-lux-text-secondary font-light leading-relaxed">{cred.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
