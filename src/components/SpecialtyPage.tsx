/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { ArrowLeft, MessageSquare, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, HelpCircle, PhoneCall, Scale, ArrowRight, CornerDownRight } from 'lucide-react';
import { SpecialtyDetail, PageId, FAQItem } from '../types';
import { SPECIALTIES_DETAILS } from '../data';

interface SpecialtyPageProps {
  specialtyId: PageId;
  landingPageMode: boolean; // if true, hides global navigation and works as high-conversion page
  onBackToHome: () => void;
  onToggleMode: () => void; // allow interactive toggle between institutional & LP modes in preview
}

export default function SpecialtyPage({ specialtyId, landingPageMode, onBackToHome, onToggleMode }: SpecialtyPageProps) {
  const detail: SpecialtyDetail = SPECIALTIES_DETAILS[specialtyId];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Local form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Verbas rescisórias');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Force scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any }); // 'instant' or 'auto'
  }, [specialtyId]);

  if (!detail) {
    return (
      <div className="py-32 text-center text-lux-text-primary">
        <p>Especialidade não encontrada.</p>
        <button onClick={onBackToHome} className="mt-4 text-gold-brand hover:underline">Voltar ao início</button>
      </div>
    );
  }

  const handleLocalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('Verbas rescisórias');
      setMessage('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  const handleWhatsappCTA = () => {
    window.open('https://wa.me/551938133837', '_blank');
  };

  const isLaborLp = specialtyId === 'trabalhista' && landingPageMode;

  if (isLaborLp) {
    return (
      <div className="min-h-screen bg-lux-bg text-lux-text-primary w-full pb-20 font-sans selection:bg-gold-brand selection:text-lux-bg">
        {/* 1. HEADER ENXUTO (Sem Links de Vazamento, Alta Conversão) */}
        <div className="w-full bg-lux-bg/95 border-b border-lux-border/50 py-4 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 xl:px-0 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-md border border-gold-brand/20 flex items-center justify-center bg-lux-panel overflow-hidden">
                <img src="/logo-fernanda-parentoni-avancini.png" alt="Logo Dra. Fernanda Parentoni Avancini" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold tracking-widest text-lux-text-primary uppercase leading-tight">
                  Fernanda Parentoni Avancini
                </span>
                <span className="text-[9px] font-medium tracking-wider text-gold-brand uppercase">
                  Advocacia Trabalhista
                </span>
              </div>
            </div>
            
            <div>
              <button
                id="lp-header-whatsapp"
                onClick={handleWhatsappCTA}
                className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/5 outline-none hover:scale-102 active:scale-98"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Conversar Agora</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. HERO DE CONVERSÃO */}
        <section className="relative pt-12 pb-16 md:py-24 overflow-hidden border-b border-lux-border bg-gradient-to-b from-lux-bg to-lux-panel/30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.03),transparent)] pointer-events-none" />
          
          <div className="max-w-[1000px] mx-auto px-5 text-center relative z-10 space-y-6 md:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gold-brand/10 border border-gold-brand/20 px-3.5 py-1.5 rounded-full">
              <Scale className="w-3.5 h-3.5 text-gold-brand animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-light">
                ATENDIMENTO EM DIREITO TRABALHISTA
              </span>
            </div>

            <h1 id="lp-hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-lux-text-primary leading-[1.12] tracking-tight max-w-4xl mx-auto">
              Está com dúvidas sobre seus <br />
              <span className="title-serif italic font-medium text-gold-brand">direitos no trabalho?</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-lux-text-secondary leading-relaxed font-light max-w-3xl mx-auto">
              Se você foi demitido, não recebeu corretamente suas verbas, faz horas extras sem pagamento adequado ou enfrenta problemas na relação de trabalho, receba orientação jurídica com clareza e responsabilidade.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto sm:max-w-none">
              <button
                id="lp-hero-whatsapp"
                onClick={handleWhatsappCTA}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center space-x-2.5 cursor-pointer hover:scale-102 active:scale-98"
              >
                <MessageSquare className="w-4.5 h-4.5 text-white" />
                <span>FALAR PELO WHATSAPP</span>
              </button>
              <button
                id="lp-hero-form-anchor"
                onClick={() => document.querySelector('#procedimento-contato-especifico-lp')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest border border-lux-border-bright text-lux-text-primary bg-lux-panel hover:bg-lux-panel-light cursor-pointer transition-all active:scale-98 text-center"
              >
                SOLICITAR CONTATO
              </button>
            </div>

            <p className="text-[11px] text-lux-text-muted font-light pt-2">
              Atendimento em Itapira e região, com possibilidade de contato digital.
            </p>
          </div>
        </section>

        {/* 3. SEÇÃO “SITUAÇÕES MAIS COMUNS” */}
        <section className="py-16 md:py-24 bg-lux-panel border-b border-lux-border relative">
          <div className="max-w-[1250px] mx-auto px-5 md:px-8 xl:px-0">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">SITUAÇÕES DO DIA A DIA</span>
              <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
                Veja algumas situações em que a orientação trabalhista pode ser importante
              </h2>
              <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                "Demissão sem pagamento correto das verbas rescisórias",
                "Horas extras não pagas",
                "FGTS não depositado",
                "Acúmulo ou desvio de função",
                "Assédio moral no ambiente de trabalho",
                "Dúvidas sobre justa causa",
                "Falta de registro em carteira",
                "Adicionais não pagos corretamente",
                "Férias, 13º e demais direitos trabalhistas"
              ].map((situation, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-lux-bg border border-lux-border flex items-start space-x-3.5 hover:border-gold-brand/30 transition-all duration-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-yellow-500/10 text-yellow-400 text-xs flex items-center justify-center font-bold mt-0.5">!</span>
                  <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light">{situation}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs md:text-sm text-lux-text-muted font-light pt-8 max-w-2xl mx-auto italic">
              Cada situação deve ser analisada de forma individual, com atenção aos documentos e às circunstâncias do caso.
            </p>
          </div>
        </section>

        {/* 4. SEÇÃO “COMO PODEMOS AJUDAR” */}
        <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
          <div className="max-w-[1000px] mx-auto px-5 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">MÉTODO DE ATENDIMENTO</span>
              <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
                Como a Dra. Fernanda Parentoni Avancini pode ajudar
              </h2>
              <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            </div>

            <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light text-center max-w-3xl mx-auto mb-12">
              A análise jurídica trabalhista envolve a verificação da documentação, da relação de trabalho e dos direitos que podem estar envolvidos in cada caso.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              {[
                "Análise inicial da situação apresentada",
                "Orientação sobre direitos e possibilidades jurídicas",
                "Apoio na organização de documentos e informações",
                "Atuação jurídica conforme a necessidade do caso"
              ].map((helpItem, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-lux-panel border border-lux-border hover:border-gold-brand/20 transition-all duration-300 flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gold-brand/10 border border-gold-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-gold-brand" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm md:text-base text-lux-text-primary font-medium leading-relaxed">{helpItem}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. SEÇÃO DE CONFIANÇA / DIFERENCIAIS */}
        <section className="py-16 md:py-24 bg-lux-panel border-b border-lux-border">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">COMPROMISSO ÉTICO</span>
              <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
                Atendimento com clareza, responsabilidade e atenção ao seu caso
              </h2>
              <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Atendimento personalizado",
                  desc: "Cada situação é analisada com atenção às particularidades do caso."
                },
                {
                  title: "Comunicação clara",
                  desc: "Orientação em linguagem acessível, para que você compreenda melhor seus direitos e os caminhos possíveis."
                },
                {
                  title: "Atuação técnica e responsável",
                  desc: "Análise cuidadosa da legislação e dos elementos envolvidos em cada demanda."
                },
                {
                  title: "Acompanhamento próximo",
                  desc: "Atendimento com escuta, seriedade e responsabilidade em cada etapa necessária."
                }
              ].map((diff, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-lux-bg border border-lux-border space-y-4 flex flex-col justify-between hover:border-gold-brand/35 transition-all duration-300">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-brand/10 border border-gold-brand/20 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-gold-brand" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-lux-text-primary">{diff.title}</h4>
                    <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light">{diff.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. SEÇÃO “POR ONDE COMEÇAR” */}
        <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
          <div className="max-w-[800px] mx-auto px-5">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">PROCESSO SEGURO</span>
              <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
                Como funciona o atendimento
              </h2>
              <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            </div>

            <div className="space-y-8 relative pl-2">
              {[
                "Você entra em contato pelo WhatsApp ou formulário",
                "Apresenta brevemente sua situação",
                "Recebe orientação inicial sobre os próximos passos"
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start relative group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lux-panel border border-gold-brand/40 text-gold-brand text-xs font-bold flex items-center justify-center shadow-md">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm md:text-base text-lux-text-primary font-light leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-lux-text-muted font-light pt-10 italic max-w-xl mx-auto leading-relaxed">
              O primeiro contato permite entender melhor o caso e verificar a forma mais adequada de atendimento.
            </p>
          </div>
        </section>

        {/* 7. SEÇÃO DE CTA INTERMEDIÁRIO */}
        <section className="py-16 bg-gradient-to-r from-lux-panel to-lux-bg border-b border-lux-border relative">
          <div className="absolute inset-0 bg-gold-brand/2 opacity-[0.012] pointer-events-none" />
          <div className="max-w-[800px] mx-auto px-5 text-center space-y-5 relative z-10">
            <h3 className="text-xl md:text-2xl font-light text-lux-text-primary tracking-tight">
              Precisa de orientação sobre um <span className="title-serif italic text-gold-brand font-medium">problema trabalhista?</span>
            </h3>
            <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light max-w-xl mx-auto">
              Entre em contato para apresentar sua situação e receber atendimento com clareza e responsabilidade.
            </p>
            <div className="pt-2">
              <button
                id="lp-mid-whatsapp"
                onClick={handleWhatsappCTA}
                className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center space-x-2 mx-auto cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>FALAR PELO WHATSAPP</span>
              </button>
            </div>
          </div>
        </section>

        {/* 8. SEÇÃO FAQ (Perguntas Frequentes) */}
        <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
          <div className="max-w-[800px] mx-auto px-5">
            <div className="text-center mb-10 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">ESCLARECIMENTOS</span>
              <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
                Perguntas frequentes
              </h2>
              <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Fui demitido e tenho dúvidas sobre meus direitos. Posso buscar orientação?",
                  a: "Sim. Situações de desligamento costumam gerar dúvidas sobre verbas rescisórias, FGTS, aviso prévio e outros direitos, e a análise do caso ajuda a esclarecer os pontos envolvidos."
                },
                {
                  q: "Trabalho sem registro em carteira. Ainda assim posso buscar atendimento?",
                  a: "Sim. A ausência de registro deve ser analisada conforme a realidade da relação de trabalho e os elementos disponíveis."
                },
                {
                  q: "Faço horas extras e não recebo corretamente. Isso pode ser analisado?",
                  a: "Sim. Questões relacionadas à jornada e ao pagamento de horas extras podem ser avaliadas com base nos documentos e nas circunstâncias do caso."
                },
                {
                  q: "Sofro assédio moral no trabalho. O que fazer?",
                  a: "Situações de assédio devem ser analisadas com cuidado, considerando o contexto e os elementos que possam demonstrar o ocorrido."
                },
                {
                  q: "O atendimento pode começar pelo WhatsApp?",
                  a: "Sim. O primeiro contato pode ser feito por WhatsApp para apresentar a situação e verificar a melhor forma de prosseguir."
                }
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-lux-border rounded-xl overflow-hidden bg-lux-panel">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-sm md:text-base font-medium text-lux-text-primary hover:text-gold-brand transition-colors outline-none cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 pr-4">
                        <HelpCircle className="w-4 h-4 text-gold-brand/80 shrink-0" />
                        <span>{faq.q}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gold-brand shrink-0" /> : <ChevronDown className="w-4 h-4 text-gold-brand shrink-0" />}
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light border-t border-lux-border/40 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9. SEÇÃO FINAL DE CONVERSÃO + FORMULÁRIO ENXUTO */}
        <section id="procedimento-contato-especifico-lp" className="py-16 md:py-24 bg-lux-panel">
          <div className="max-w-[1100px] mx-auto px-5">
            <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="md:col-span-5 space-y-5">
                <span className="bg-gold-brand/10 text-gold-brand text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  ATENDIMENTO RESPONSÁVEL
                </span>
                <h3 className="title-serif text-2xl md:text-3xl lg:text-4xl font-light leading-snug font-sans">
                  Fale com a Dra. Fernanda Parentoni Avancini
                </h3>
                <p className="text-xs md:text-sm text-lux-text-secondary font-light leading-relaxed">
                  Se você está enfrentando um problema trabalhista ou tem dúvidas sobre seus direitos, entre em contato para apresentar sua situação e receber orientação jurídica.
                </p>

                <div className="flex flex-col space-y-3 pt-2">
                  <button
                    id="lp-final-whatsapp"
                    onClick={handleWhatsappCTA}
                    className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer active:scale-98 shadow-md"
                  >
                    <MessageSquare className="w-4.5 h-4.5 text-white" />
                    <span>FALAR PELO WHATSAPP</span>
                  </button>
                  <button
                    id="lp-final-form-anchor"
                    onClick={() => document.querySelector('#contato-lp-formulario')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-3.5 rounded-full border border-lux-border-bright text-lux-text-primary bg-lux-bg hover:bg-lux-panel cursor-pointer text-xs font-semibold uppercase tracking-widest text-center"
                  >
                    SOLICITAR CONTATO
                  </button>
                </div>

                <p className="text-[11px] text-lux-text-muted font-light pt-2 text-center md:text-left">
                  Atendimento em Itapira e região, com possibilidade de contato digital.
                </p>
              </div>

              <div id="contato-lp-formulario" className="md:col-span-7 bg-lux-bg border border-lux-border p-6 md:p-8 rounded-2xl shadow-2xl">
                <h4 className="title-serif text-xl font-light text-lux-text-primary mb-5">
                  Solicite contato
                </h4>

                {isSuccess && (
                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl mb-4 animate-fade-in">
                    Mensagem enviada com sucesso! Retornaremos o mais breve possível para agendar o seu atendimento.
                  </div>
                )}

                <form onSubmit={handleLocalSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="lp-name-field" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">Nome completo *</label>
                    <input
                      type="text"
                      id="lp-name-field"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="lp-phone-field" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">Telefone com DDD *</label>
                      <input
                        type="tel"
                        id="lp-phone-field"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (19) 99876-5432"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="lp-email-field" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">E-mail *</label>
                      <input
                        type="email"
                        id="lp-email-field"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu melhor e-mail"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="lp-subject-field" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">Assunto *</label>
                    <select
                      id="lp-subject-field"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                    >
                      <option value="Verbas rescisórias">Verbas rescisórias</option>
                      <option value="Horas extras">Horas extras</option>
                      <option value="FGTS">FGTS</option>
                      <option value="Justa causa">Justa causa</option>
                      <option value="Assédio moral">Assédio moral</option>
                      <option value="Vínculo empregatício">Vínculo empregatício</option>
                      <option value="Outro assunto">Outro assunto</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="lp-message-field" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">MENSAGEM *</label>
                    <textarea
                      id="lp-message-field"
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Descreva brevemente sua situação."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all resize-none animate-none"
                    />
                  </div>

                  <button
                    id="lp-form-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-gold-dark to-gold-brand hover:from-gold-brand text-lux-bg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                  >
                    <span>{isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITAÇÃO"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-lux-bg" />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lux-bg text-lux-text-primary pt-1 w-full pb-20">
      


      {/* Local Mini-Nav ONLY in Institutional mode */}
      {!landingPageMode && (
        <div className="bg-lux-panel/60 border-b border-lux-border fixed top-16 left-0 right-0 z-40 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0 py-3.5 flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold-brand hover:text-gold-light cursor-pointer select-none outline-none group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Voltar ao Site Principal</span>
            </button>
            <div className="text-xs text-lux-text-muted font-light hidden sm:block">
              Área de Atuação: <strong className="text-lux-text-primary font-medium">{detail.headerTitle}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Hero section specifically crafted for each specialty (LP or normal layout) */}
      <section className={`relative overflow-hidden ${landingPageMode ? 'pt-16 pb-20 md:py-28' : 'pt-36 pb-20 md:py-32'}`}>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gold-brand/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-[900px] mx-auto px-5 text-center relative z-10 space-y-6 md:space-y-8">
          
          {/* Tagline showing regional context */}
          <div className="inline-flex items-center space-x-2 bg-gold-brand/10 border border-gold-brand/20 px-3.5 py-1.5 rounded-full">
            <Scale className="w-4 h-4 text-gold-brand" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-gold-light">
              Escritório Dra. Fernanda Parentoni Avancini — Atendimento Especializado
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-lux-text-primary leading-[1.1] tracking-tight">
            Consultoria e Defesa em <br />
            <span className="title-serif italic font-medium text-gold-brand">{detail.title}</span>
          </h1>

          <p className="text-md sm:text-lg md:text-xl text-lux-text-secondary leading-relaxed font-light max-w-2xl mx-auto">
            {detail.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleWhatsappCTA}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center space-x-2.5 cursor-pointer hover:scale-102 active:scale-98"
            >
              <MessageSquare className="w-4.5 h-4.5 text-white" />
              <span>Agendar por WhatsApp</span>
            </button>
            <button
              onClick={() => document.querySelector('#procedimento-contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest border border-lux-border-bright text-lux-text-primary bg-lux-panel hover:bg-lux-panel-light cursor-pointer transition-colors active:scale-98 text-center"
            >
              Preencher Formulário Seguro
            </button>
          </div>

        </div>
      </section>

      {/* 2-Column Core Section: Pain points & Professional Solutions */}
      <section className="py-16 bg-lux-panel border-y border-lux-border relative">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0">
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Box A: Dores Comuns / Pain points */}
            <div className="space-y-6 self-start p-8 rounded-2xl bg-lux-bg border border-lux-border">
              <h3 className="text-lg uppercase tracking-wider font-semibold text-gold-brand flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-gold-brand rounded" />
                <span>Situações e Dificuldades Comuns</span>
              </h3>
              <p className="text-sm text-lux-text-secondary font-light">
                Muitas pessoas e empresas enfrentam desafios cotidianos como estes abaixo:
              </p>
              
              <div className="space-y-4 pt-2">
                {detail.painPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-md bg-red-500/10 text-red-400 text-xs flex items-center justify-center font-bold mt-0.5">!</span>
                    <p className="text-sm text-lux-text-secondary font-light leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Box B: Atuação Solvente / Solutions */}
            <div className="space-y-6 self-start p-8 rounded-2xl bg-lux-bg border border-lux-border">
              <h3 className="text-lg uppercase tracking-wider font-semibold text-gold-brand flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-gold-brand rounded" />
                <span>Como Podemos Ajudar</span>
              </h3>
              <p className="text-sm text-lux-text-secondary font-light">
                Com um trabalho dedicado e focado em cada caso, oferecemos amparo jurídico nas seguintes questões:
              </p>

              <div className="space-y-4 pt-2">
                {detail.solutions.map((sol, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <CheckCircle className="w-5 h-5 text-gold-brand shrink-0 mt-0.5" />
                    <p className="text-sm text-lux-text-primary font-light leading-relaxed">{sol}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Key Specialty Differentials */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">Atuação Dedicada</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary">
              Nossos Diferenciais em <span className="title-serif italic text-gold-brand font-medium">{detail.headerTitle}</span>
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {detail.differentials.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-lux-panel border border-lux-border space-y-3">
                <div className="w-10 h-10 rounded-lg bg-gold-brand/10 border border-gold-brand/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-gold-brand" />
                </div>
                <h4 className="text-sm uppercase tracking-wider font-bold text-lux-text-primary">{item.title}</h4>
                <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works (Atendimento Passo-a-Passo) */}
      <section className="py-16 md:py-24 bg-lux-panel border-b border-lux-border">
        <div className="max-w-[900px] mx-auto px-5">
          
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">Passo a Passo</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary">
              Como funciona o nosso atendimento?
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          {/* Connected timeline steps with corner downs */}
          <div className="space-y-8 relative">
            {detail.howItWorks.map((step, idx) => {
              const [title, desc] = step.split(': ');
              return (
                <div key={idx} className="flex gap-6 items-start relative group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lux-bg border border-gold-brand/40 text-gold-brand text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm md:text-base font-semibold text-lux-text-primary uppercase tracking-wider">{title}</h4>
                    {desc && <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light">{desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Strategic FAQ Accordion section */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
        <div className="max-w-[800px] mx-auto px-5">
          
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold-brand block">
              Dúvidas Frequentes Solucionadas
            </span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary">
              Perguntas Comuns sobre {detail.headerTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            <p className="text-xs text-lux-text-muted mt-2 font-light">
              Lembre-se: em consonância com as normas éticas da OAB, estas respostas esclarecem pontos conceituais genéricos e não substituem uma avaliação detalhada de documentos em uma consulta.
            </p>
          </div>

          <div className="space-y-4">
            {detail.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-lux-border rounded-xl overflow-hidden bg-lux-panel">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm md:text-base font-medium text-lux-text-primary hover:text-gold-brand transition-colors outline-none cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 pr-4">
                      <HelpCircle className="w-4 h-4 text-gold-brand/80 shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gold-brand shrink-0" /> : <ChevronDown className="w-4 h-4 text-gold-brand shrink-0" />}
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light border-t border-lux-border/40 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Strategic conversion area footer for LP & Normal site */}
      <section id="procedimento-contato" className="py-16 md:py-24 bg-lux-panel">
        <div className="max-w-[1000px] mx-auto px-5">
          
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-4">
              <span className="bg-gold-brand/10 text-gold-brand text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                Atendimento Próximo
              </span>
              <h3 className="title-serif text-2xl md:text-3xl font-light leading-snug">
                Encontre o amparo e a orientação certa para o seu caso.
              </h3>
              <p className="text-xs md:text-sm text-lux-text-secondary font-light leading-relaxed">
                Preencha os seus dados ao lado ou envie uma mensagem direta pelo WhatsApp para agendarmos uma conversa e analisarmos o seu caso com calma e atenção.
              </p>
            </div>

            <div className="md:col-span-7 bg-lux-bg border border-lux-border p-6 rounded-2xl shadow-xl">
              <h4 className="title-serif text-lg font-light text-lux-text-primary mb-4">
                Solicitar Contato sobre {detail.headerTitle}
              </h4>

              {isSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl mb-4 animate-fade-in">
                  Mensagem enviada com sucesso! Retornaremos o mais breve possível para agendar o seu atendimento.
                </div>
              )}

              <form onSubmit={handleLocalSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="lp-name" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">Nome do Solicitante *</label>
                  <input
                    type="text"
                    id="lp-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ana Maria da Silva"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="lp-phone" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">WhatsApp ou Telefone *</label>
                  <input
                    type="tel"
                    id="lp-phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: (19) 99876-5432"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="lp-message" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">MENSAGEM *</label>
                  <textarea
                    id="lp-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva brevemente como podemos ajudar."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-gold-dark to-gold-brand hover:from-gold-brand text-lux-bg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                >
                  <span>Enviar Mensagem</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lux-bg" />
                </button>
              </form>

              {/* Instant WhatsApp Quick Link */}
              <div className="mt-4 pt-4 border-t border-lux-border/50 text-center">
                <span className="text-[10px] text-lux-text-muted font-light">Ou se preferir rapidez instantânea:</span>
                <button
                  onClick={handleWhatsappCTA}
                  className="mt-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] transition-colors text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Falar pelo WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
