/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { ArrowLeft, MessageSquare, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, HelpCircle, Scale, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface SpecialtyPageProps {
  specialtyId: PageId;
  landingPageMode: boolean; // if true, hides global navigation and works as high-conversion page
  onBackToHome: () => void;
  onToggleMode: () => void; // allow interactive toggle between institutional & LP modes in preview
}

interface CustomSpecialtyData {
  tagline: string;
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  resolutionDescription: string;
  situationsTitle: string;
  situations: string[];
  forWhomDescription: string;
  forWhomItems: string[];
  notForWhomDescription: string;
  howWeHelpTitle: string;
  howWeHelpSubtitle: string;
  howWeHelp: { title: string; desc: string }[];
  timelineTitle: string;
  timelineDescription: string;
  timelineSteps: { title: string; desc: string }[];
  faqSectionTitle: string;
  faqs: { q: string; a: string }[];
  formSubjects: string[];
  defaultSubject: string;
  // Optional areas for custom section headers & LP/Institutional variations
  heroHeadlineLP?: string;
  heroDescriptionLP?: string;
  ctaPrincipalText?: string;
  ctaSecundarioText?: string;
  forWhomTitle?: string;
  notForWhomTitle?: string;
  trustBlockTitle?: string;
  trustBlockText?: string;
  finalCtaTitle?: string;
  finalCtaText?: string;
  finalCtaButtonText?: string;
  formSupportText?: string;
}

const SPECIALTIES_COPIES: Record<Exclude<PageId, 'home'>, CustomSpecialtyData> = {
  trabalhista: {
    tagline: "Direito do Trabalho",
    heroBadge: "ORIENTAÇÃO AO TRABALHADOR",
    heroHeadline: "Orientação jurídica em Direito do Trabalho com análise clara e atendimento individualizado",
    heroDescription: "Se você está com dúvidas sobre verbas rescisórias, horas extras, FGTS, vínculo de emprego, assédio ou outras situações no trabalho, o primeiro passo é entender com clareza o que aconteceu e quais caminhos jurídicos podem ser avaliados no seu caso.",
    heroHeadlineLP: "Está com dúvidas sobre um problema no trabalho?",
    heroDescriptionLP: "Verbas rescisórias, FGTS, horas extras, vínculo de emprego, assédio e outras situações podem exigir análise jurídica individual. Entenda melhor o seu caso com orientação clara e atendimento responsável.",
    ctaPrincipalText: "Solicitar análise do caso",
    ctaSecundarioText: "Conversar pelo WhatsApp",
    resolutionDescription: "Questões trabalhistas costumam surgir em momentos de insegurança. Em muitos casos, o trabalhador sabe que algo pode estar errado, mas não tem certeza sobre quais direitos podem ser analisados ou qual é a melhor forma de buscar orientação. O atendimento jurídico começa com escuta, análise dos documentos e avaliação individual da situação.",
    situationsTitle: "Situações trabalhistas que podem ser analisadas",
    situations: [
      "Verbas rescisórias pagas de forma incompleta ou com dúvida sobre os valores",
      "Falta de depósito de FGTS ou irregularidades nos recolhimentos",
      "Horas extras não pagas corretamente",
      "Situação de vínculo de emprego sem registro formal",
      "Rescisão indireta em casos de falta grave do empregador",
      "Assédio moral ou situações de constrangimento no ambiente de trabalho",
      "Acidente de trabalho e seus desdobramentos",
      "Alterações indevidas de função, jornada, salário ou condições de trabalho"
    ],
    forWhomTitle: "Para quem esta página é indicada",
    forWhomDescription: "Esta página é indicada para trabalhadores que desejam entender melhor a própria situação antes de tomar uma decisão. Também é útil para quem já reuniu documentos, recebeu uma rescisão, enfrentou problemas durante o vínculo de trabalho ou busca orientação jurídica mais clara sobre o caso.",
    forWhomItems: [],
    notForWhomTitle: "Quando a orientação jurídica pode ser importante",
    notForWhomDescription: "A orientação jurídica pode ser útil quando há dúvidas sobre a regularidade da relação de trabalho, da rescisão do contrato ou do pagamento de valores ligados ao vínculo empregatício. Também pode ser importante quando a situação envolve desgaste no ambiente profissional, alteração indevida das condições de trabalho ou dificuldade para reunir documentos e entender os próximos passos.",
    howWeHelpTitle: "Como o atendimento é conduzido",
    howWeHelpSubtitle: "Cada situação exige análise individual. O atendimento parte da escuta do relato, da verificação dos documentos disponíveis e da avaliação jurídica do caso concreto. A partir disso, o escritório orienta sobre os caminhos possíveis, sempre com clareza, responsabilidade e atenção às particularidades de cada atendimento.",
    howWeHelp: [],
    timelineTitle: "Como funciona o atendimento",
    timelineDescription: "",
    timelineSteps: [
      {
        title: "Entendimento inicial da situação apresentada",
        desc: ""
      },
      {
        title: "Análise dos documentos disponíveis",
        desc: ""
      },
      {
        title: "Orientação jurídica sobre os caminhos possíveis",
        desc: ""
      },
      {
        title: "Esclarecimento de dúvidas sobre o caso e sobre o atendimento",
        desc: ""
      },
      {
        title: "Definição dos próximos passos, quando cabível",
        desc: ""
      }
    ],
    trustBlockTitle: "Atendimento com seriedade, discrição e clareza",
    trustBlockText: "Em questões trabalhistas, muitas pessoas chegam ao atendimento sem saber exatamente por onde começar. Por isso, a proposta do escritório é oferecer uma análise cuidadosa, comunicação clara e acompanhamento responsável, sempre com atenção às circunstâncias reais de cada caso.",
    faqSectionTitle: "Perguntas frequentes",
    faqs: [
      {
        q: "Preciso ter todos os documentos para buscar orientação?",
        a: "Não necessariamente. Os documentos ajudam na análise, mas a orientação inicial também pode começar a partir do relato da situação e da verificação do que já está disponível."
      },
      {
        q: "Quem foi demitido sempre tem direito a receber valores adicionais?",
        a: "Cada caso precisa ser analisado individualmente. A existência de diferenças a receber depende do histórico da relação de trabalho, da forma de desligamento e da documentação envolvida."
      },
      {
        q: "Quem trabalhou sem registro pode buscar orientação jurídica?",
        a: "Sim. Situações sem registro formal podem ser analisadas juridicamente a partir das circunstâncias do caso e dos elementos disponíveis."
      },
      {
        q: "Posso tirar dúvidas antes de decidir se vou seguir com atendimento?",
        a: "Sim. O objetivo do primeiro contato é justamente permitir uma compreensão inicial da situação e do formato de atendimento."
      },
      {
        q: "O atendimento é feito de forma individual?",
        a: "Sim. Cada caso é analisado de forma individual, considerando documentos, contexto e necessidades específicas."
      }
    ],
    formSubjects: [
      "Verbas Rescisórias / Acerto",
      "Falta de Depósito de FGTS",
      "Horas Extras",
      "Vínculo de Trabalho sem Registro",
      "Rescisão Indireta / Falta Grave",
      "Assédio Moral / Ambiente de Trabalho",
      "Acidente de Trabalho",
      "Alterações Indevidas no Trabalho",
      "Outro Assunto Trabalhista"
    ],
    defaultSubject: "Verbas Rescisórias / Acerto",
    finalCtaTitle: "Se você precisa entender melhor sua situação trabalhista, o primeiro passo é uma análise clara do caso.",
    finalCtaText: "",
    finalCtaButtonText: "Falar com o escritório",
    formSupportText: "Preencha os dados abaixo e descreva brevemente sua situação. O contato será analisado com atenção, e o retorno será feito pelos canais informados."
  },
  previdenciario: {
    tagline: "Direito Previdenciário",
    heroBadge: "PLANEJAMENTO E APOSENTADORIA",
    heroHeadline: "Orientação jurídica previdenciária com análise individual e explicação clara",
    heroDescription: "Aposentadoria, benefícios por incapacidade, BPC/LOAS, revisão, vínculos e contribuições exigem análise cuidadosa. O atendimento jurídico ajuda a compreender melhor a situação e os caminhos que podem ser avaliados em cada caso.",
    heroHeadlineLP: "Está com dúvidas sobre aposentadoria, benefício ou revisão?",
    heroDescriptionLP: "A análise previdenciária deve considerar documentos, histórico contributivo e regras aplicáveis ao caso. Receba orientação clara para entender melhor a sua situação.",
    ctaPrincipalText: "Solicitar análise do caso",
    ctaSecundarioText: "Conversar pelo WhatsApp",
    resolutionDescription: "Questões previdenciárias costumam gerar muitas dúvidas. Regras de aposentadoria, tempo de contribuição, vínculos no CNIS, indeferimentos e revisões exigem atenção aos detalhes. Por isso, a orientação jurídica começa com análise individual da situação, dos documentos e do histórico previdenciário apresentado.",
    situationsTitle: "Situações previdenciárias que podem ser analisadas",
    situations: [
      "Dúvidas sobre aposentadoria e regras aplicáveis ao caso",
      "Planejamento do melhor momento para requerer benefício",
      "Benefício por incapacidade",
      "BPC/LOAS",
      "Indeferimento de benefício",
      "Suspensão ou cessação de benefício",
      "Revisão de benefício",
      "Acerto de vínculos, contribuições ou informações no histórico previdenciário"
    ],
    forWhomTitle: "Para quem esta página é indicada",
    forWhomDescription: "Esta página é indicada para pessoas que desejam entender melhor sua situação previdenciária antes de tomar uma decisão. Também é útil para quem recebeu uma negativa, enfrenta dúvidas com documentos ou quer orientação mais segura sobre aposentadoria, benefício ou revisão.",
    forWhomItems: [],
    notForWhomTitle: "Quando a orientação jurídica pode ser importante",
    notForWhomDescription: "A orientação jurídica pode ser importante quando há dúvida sobre o melhor momento para pedir aposentadoria, quando um benefício foi negado ou suspenso, quando existem inconsistências no histórico contributivo ou quando a pessoa precisa entender melhor as possibilidades relacionadas ao seu caso.",
    howWeHelpTitle: "Como o atendimento é conduzido",
    howWeHelpSubtitle: "Cada caso previdenciário exige análise própria. O atendimento parte do exame das informações disponíveis, dos documentos apresentados e das dúvidas trazidas pela pessoa atendida. A partir disso, o escritório orienta sobre os caminhos que podem ser avaliados com clareza, responsabilidade e atenção às particularidades do caso.",
    howWeHelp: [],
    timelineTitle: "Como funciona o atendimento",
    timelineDescription: "",
    timelineSteps: [
      {
        title: "Entendimento inicial da situação previdenciária",
        desc: ""
      },
      {
        title: "Verificação dos documentos e das informações disponíveis",
        desc: ""
      },
      {
        title: "Análise jurídica do caso",
        desc: ""
      },
      {
        title: "Esclarecimento das dúvidas principais",
        desc: ""
      },
      {
        title: "Orientação sobre os próximos passos, quando cabível",
        desc: ""
      }
    ],
    trustBlockTitle: "Atendimento com clareza, cuidado e responsabilidade",
    trustBlockText: "Em matéria previdenciária, decisões tomadas sem análise adequada podem gerar insegurança e dúvidas desnecessárias. Por isso, o atendimento é conduzido com atenção aos detalhes, explicação clara e avaliação individual de cada situação.",
    faqSectionTitle: "Perguntas frequentes",
    faqs: [
      {
        q: "Preciso já saber qual benefício pedir antes de buscar orientação?",
        a: "Não. A orientação jurídica também serve para ajudar a entender qual é a questão principal do caso e quais possibilidades precisam ser analisadas."
      },
      {
        q: "Posso buscar orientação mesmo se meu benefício já tiver sido negado?",
        a: "Sim. Situações de indeferimento podem ser analisadas com base nos documentos, no histórico previdenciário e nas circunstâncias do caso."
      },
      {
        q: "Quem tem dúvida sobre tempo de contribuição pode buscar atendimento?",
        a: "Sim. Dúvidas sobre vínculos, contribuições e tempo de serviço fazem parte das situações que podem exigir análise previdenciária."
      },
      {
        q: "O atendimento previdenciário é individual?",
        a: "Sim. Cada situação é analisada de forma individual, considerando documentos, histórico e necessidades específicas."
      },
      {
        q: "O primeiro contato já serve para entender melhor o caso?",
        a: "Sim. O contato inicial ajuda a organizar as informações e permite uma compreensão mais clara sobre a situação apresentada."
      }
    ],
    formSubjects: [
      "Aposentadoria e Regras Aplicáveis",
      "Planejamento Previdenciário",
      "Benefício por Incapacidade",
      "BPC/LOAS",
      "Benefício Negado (Indeferimento)",
      "Suspensão ou Cessação de Benefício",
      "Revisão de Benefício",
      "Acerto de Vínculos / CNIS",
      "Outro Assunto Previdenciário"
    ],
    defaultSubject: "Aposentadoria e Regras Aplicáveis",
    finalCtaTitle: "Se você precisa entender melhor sua situação previdenciária, o primeiro passo é uma análise cuidadosa do caso.",
    finalCtaText: "",
    finalCtaButtonText: "Falar com o escritório",
    formSupportText: "Preencha os dados abaixo e descreva brevemente sua situação. As informações enviadas serão analisadas com atenção, e o retorno será feito pelos canais informados."
  },
  civel: {
    tagline: "Direito Cível",
    heroBadge: "RELAÇÕES CIVIS E CONTRATOS",
    heroHeadline: "Orientação jurídica em Direito Cível com clareza e atendimento individualizado",
    heroDescription: "Questões envolvendo contratos, cobranças, responsabilidade civil, relações de consumo, notificações, imóveis e conflitos patrimoniais exigem análise cuidadosa. O atendimento jurídico ajuda a compreender o caso com mais segurança e clareza.",
    heroHeadlineLP: "Está com dúvidas sobre contrato, cobrança, imóvel ou outra questão cível?",
    heroDescriptionLP: "Situações cíveis exigem análise individual e compreensão clara do contexto. Receba orientação jurídica com atendimento responsável e comunicação objetiva.",
    ctaPrincipalText: "Solicitar análise do caso",
    ctaSecundarioText: "Conversar pelo WhatsApp",
    resolutionDescription: "Demandas cíveis fazem parte do dia a dia de muitas pessoas e empresas. Nem sempre é simples entender quando uma situação exige orientação jurídica, quais documentos são importantes ou qual caminho pode ser avaliado com mais segurança. O atendimento começa com escuta, análise do contexto e verificação das informações disponíveis.",
    situationsTitle: "Situações cíveis que podem ser analisadas",
    situations: [
      "Dúvidas sobre contratos e descumprimento de obrigações",
      "Cobranças indevidas ou conflitos relacionados a dívidas",
      "Questões de responsabilidade civil",
      "Problemas em relações de consumo",
      "Compra e venda de imóveis",
      "Notificações extrajudiciais",
      "Conflitos patrimoniais",
      "Outras situações cíveis compatíveis com a atuação do escritório"
    ],
    forWhomTitle: "Para quem esta página é indicada",
    forWhomDescription: "Esta página é indicada para pessoas que desejam compreender melhor uma situação cível antes de tomar decisão. Também é útil para quem já recebeu documentos, notificações, cobranças ou enfrenta conflitos contratuais e patrimoniais que exigem orientação mais clara.",
    forWhomItems: [],
    notForWhomTitle: "Quando a orientação jurídica pode ser importante",
    notForWhomDescription: "A orientação jurídica pode ser importante quando há dúvidas sobre contratos, cobranças, danos, relações de consumo, conflitos envolvendo patrimônio, notificações extrajudiciais ou outras situações em que seja necessário avaliar direitos, deveres e possibilidades de encaminhamento.",
    howWeHelpTitle: "Como o atendimento é conduzido",
    howWeHelpSubtitle: "Cada situação cível exige análise individual. O atendimento parte da escuta do relato, da verificação dos documentos disponíveis e da avaliação jurídica do caso concreto. A partir disso, o escritório orienta sobre os caminhos que podem ser considerados, sempre com clareza, responsabilidade e atenção ao contexto apresentado.",
    howWeHelp: [],
    timelineTitle: "Como funciona o atendimento",
    timelineDescription: "",
    timelineSteps: [
      {
        title: "Entendimento inicial da situação apresentada",
        desc: ""
      },
      {
        title: "Análise dos documentos e informações disponíveis",
        desc: ""
      },
      {
        title: "Avaliação jurídica do caso",
        desc: ""
      },
      {
        title: "Esclarecimento das dúvidas principais",
        desc: ""
      },
      {
        title: "Orientação sobre os próximos passos, quando cabível",
        desc: ""
      }
    ],
    trustBlockTitle: "Atendimento com seriedade, clareza e atenção ao caso concreto",
    trustBlockText: "Em questões cíveis, a forma como o problema é compreendido faz diferença no encaminhamento adequado do caso. Por isso, o atendimento é conduzido com análise cuidadosa, comunicação clara e consideração das particularidades de cada situação.",
    faqSectionTitle: "Perguntas frequentes",
    faqs: [
      {
        q: "Quando vale a pena buscar orientação jurídica em uma questão cível?",
        a: "Sempre que houver dúvida relevante sobre direitos, deveres, documentos, contratos, cobranças ou consequências jurídicas de uma situação concreta, a orientação pode ajudar a avaliar o caso com mais clareza."
      },
      {
        q: "Preciso estar com toda a documentação em mãos para buscar atendimento?",
        a: "Não necessariamente. Os documentos ajudam na análise, mas o primeiro contato também serve para entender o contexto e identificar o que será importante reunir."
      },
      {
        q: "Questões contratuais podem ser analisadas pelo escritório?",
        a: "Sim, desde que estejam dentro do escopo de atuação da página e possam ser avaliadas a partir das informações e documentos apresentados."
      },
      {
        q: "O atendimento é feito de forma individual?",
        a: "Sim. Cada situação é analisada de forma individual, considerando contexto, documentos e necessidades específicas."
      },
      {
        q: "Posso usar o primeiro contato para entender se meu caso se encaixa na área cível?",
        a: "Sim. O contato inicial também serve para esclarecer se a situação apresentada está dentro da área de atuação indicada na página."
      }
    ],
    formSubjects: [
      "Contratos e Obrigações",
      "Cobranças e Dívidas",
      "Responsabilidade Civil",
      "Relações de Consumo",
      "Compra e Venda de Imóveis",
      "Notificações Extrajudiciais",
      "Conflitos Patrimoniais",
      "Outro Assunto Cível"
    ],
    defaultSubject: "Contratos e Obrigações",
    finalCtaTitle: "Se você precisa compreender melhor uma situação cível, o primeiro passo é uma análise clara do caso.",
    finalCtaText: "",
    finalCtaButtonText: "Falar com o escritório",
    formSupportText: "Preencha os dados abaixo e descreva brevemente sua situação. O contato será analisado com atenção, e o retorno será feito pelos canais informados."
  }
};

export default function SpecialtyPage({ specialtyId, landingPageMode, onBackToHome, onToggleMode }: SpecialtyPageProps) {
  // Gracefully fall back to 'trabalhista' if home happens to be active or unsupported id occurs
  const activeKey = (specialtyId === 'home' || !SPECIALTIES_COPIES[specialtyId]) ? 'trabalhista' : specialtyId;
  const copy: CustomSpecialtyData = SPECIALTIES_COPIES[activeKey];
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Local form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(copy.defaultSubject);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default subject when loaded area changes
  useEffect(() => {
    setSubject(copy.defaultSubject);
    setOpenFaqIndex(null);
  }, [activeKey, copy.defaultSubject]);

  // Force scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [specialtyId]);

  const handleLocalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !message || !phone || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject(copy.defaultSubject);
      setMessage('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  const handleWhatsappCTA = () => {
    window.open('https://wa.me/5519982111193', '_blank');
  };

  return (
    <div className="min-h-screen bg-lux-bg text-lux-text-primary w-full pb-20 font-sans selection:bg-gold-brand selection:text-lux-bg transition-colors duration-300">
      
      {/* 
        ============================================================
        LP-SPECIFIC HEADER
        Rendered only when landingPageMode is TRUE.
        Hides menu lines, keeping the focus entirely on conversions.
        ============================================================
      */}
      {landingPageMode && (
        <div className="w-full bg-lux-bg/95 border-b border-lux-border/50 py-4 backdrop-blur-sm sticky top-0 z-40 animate-fade-in shadow-sm">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 xl:px-0 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-md border border-gold-brand/20 flex items-center justify-center bg-lux-panel overflow-hidden">
                <img src="/logo-fernanda-parentoni-avancini.png" alt="Logo Dra. Fernanda Parentoni" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold tracking-widest text-lux-text-primary uppercase leading-tight">
                  Fernanda Parentoni Avancini
                </span>
                <span className="text-[9px] font-medium tracking-wider text-gold-brand uppercase">
                  {copy.tagline}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                id="lp-header-whatsapp-call"
                onClick={handleWhatsappCTA}
                className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/5 outline-none hover:scale-102"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Conversar Agora</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 
        ============================================================
        INSTITUTIONAL NAVIGATION BAR
        Rendered only when landingPageMode is FALSE.
        Provides high-end navigation back into the main vitrine.
        ============================================================
      */}
      {!landingPageMode && (
        <div className="bg-lux-panel/90 border-b border-lux-border fixed top-16 left-0 right-0 z-40 backdrop-blur-md py-3.5 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0 flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold-brand hover:text-gold-light cursor-pointer select-none outline-none group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Voltar ao Site Principal</span>
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-[10px] text-lux-text-muted font-light hidden sm:block">
                Área de Atuação: <strong className="text-lux-text-primary font-medium">{copy.tagline}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 
        ============================================================
        1. HERO SECTION
        Headline focused on client doubts and pain points, with deep respect.
        ============================================================
      */}
      <section className={`relative overflow-hidden border-b border-lux-border bg-lux-bg ${landingPageMode ? 'pt-12 pb-16 md:py-24' : 'pt-36 pb-20 md:py-32'}`}>
        {/* Background photo of the office */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/images/luxury_law_firm_interior_1780499738480.png"
            alt="Escritório"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-50 brightness-[0.8] grayscale-0"
          />
          {/* Subtle gradient overlay to keep it elegant, deep and dark while preserving photo visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-lux-bg/70 via-lux-bg/60 to-lux-bg/78" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.1),transparent)]" />
        </div>
        
        <div className="max-w-[1000px] mx-auto px-5 text-center relative z-10 space-y-6 md:space-y-8">
          <div className="inline-flex items-center space-x-2 bg-gold-brand/10 border border-gold-brand/20 px-3.5 py-1.5 rounded-full">
            <Scale className="w-3.5 h-3.5 text-gold-brand animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-gold-light">
              {copy.heroBadge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-lux-text-primary leading-[1.12] tracking-tight max-w-4xl mx-auto">
            {(() => {
              const headline = (landingPageMode && copy.heroHeadlineLP) ? copy.heroHeadlineLP : copy.heroHeadline;
              if (headline.includes('?')) {
                const parts = headline.split('?');
                return (
                  <>
                    {parts[0]}? <br />
                    <span className="title-serif italic font-medium text-gold-brand">
                      {parts[1] || ""}
                    </span>
                  </>
                );
              }
              return (
                <span className="font-light">
                  {headline}
                </span>
              );
            })()}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-lux-text-secondary leading-relaxed font-light max-w-3xl mx-auto">
            {(landingPageMode && copy.heroDescriptionLP) ? copy.heroDescriptionLP : copy.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={handleWhatsappCTA}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center space-x-2.5 cursor-pointer hover:scale-102"
            >
              <MessageSquare className="w-4.5 h-4.5 text-white" />
              <span>{copy.ctaSecundarioText || "Conversar pelo WhatsApp"}</span>
            </button>
            <button
              onClick={() => document.querySelector('#procedimento-contato-especifico')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest border border-lux-border-bright text-lux-text-primary bg-lux-panel hover:bg-lux-panel-light cursor-pointer transition-all text-center"
            >
              {copy.ctaPrincipalText || "Solicitar Atendimento por E-mail"}
            </button>
          </div>

          <p className="text-[11px] text-lux-text-muted font-light pt-2">
            Atendimento em Itapira, região e de forma digital, com garantia de absoluto sigilo profissional e privacidade.
          </p>
        </div>
      </section>

      {/* 
        ============================================================
        2. INTRODUÇÃO
        ============================================================
      */}
      <section className="py-16 bg-lux-panel border-b border-lux-border relative overflow-hidden">
        <div className="max-w-[850px] mx-auto px-5 text-center relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold-brand block">INTRODUÇÃO</span>
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="title-serif text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              Entenda como funciona o suporte em <span className="italic text-gold-brand">{copy.tagline}</span>
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand/60 mx-auto animate-pulse" />
            <p className="text-sm md:text-base text-lux-text-secondary font-light leading-relaxed">
              {copy.resolutionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        3. BLOCO — QUANDO BUSCAR ORIENTAÇÃO
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border relative">
        <div className="max-w-[850px] mx-auto px-5 text-center relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold-brand block">QUANDO BUSCAR ORIENTAÇÃO</span>
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="title-serif text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.notForWhomTitle || "Quando a orientação jurídica pode ser importante"}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light max-w-3xl mx-auto">
              {copy.notForWhomDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        4. BLOCO — SITUAÇÕES COMUNS
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-panel border-b border-lux-border relative">
        <div className="max-w-[1250px] mx-auto px-5 md:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">SITUAÇÕES COMUNS</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.situationsTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.situations.map((situation, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-lux-bg border border-lux-border flex items-start space-x-3.5 hover:border-gold-brand/35 transition-all duration-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-yellow-500/10 text-yellow-400 text-xs flex items-center justify-center font-bold mt-0.5">!</span>
                <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light">{situation}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-10">
            <p className="text-xs md:text-sm text-lux-text-muted font-light max-w-2xl mx-auto italic mb-6">
              Cada situação descrita acima exige verificação de acordo com as particularidades de cada caso concreto.
            </p>
            
            <button
              onClick={handleWhatsappCTA}
              className="inline-flex px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-lg shadow-emerald-500/10 items-center justify-center space-x-2 cursor-pointer hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>SOLICITAR ANÁLISE DO CASO</span>
            </button>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        5. BLOCO — PARA QUEM É INDICADA
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border relative">
        <div className="max-w-[850px] mx-auto px-5 text-center relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold-brand block">PÚBLICO-ALVO</span>
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="title-serif text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.forWhomTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light max-w-3xl mx-auto">
              {copy.forWhomDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        6. BLOCO — COMO O ATENDIMENTO É CONDUZIDO
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-panel border-b border-lux-border relative">
        <div className="max-w-[850px] mx-auto px-5 text-center relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold-brand block">COMO O ATENDIMENTO É CONDUZIDO</span>
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="title-serif text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.howWeHelpTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
            <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light max-w-3xl mx-auto">
              {copy.howWeHelpSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        7. BLOCO — ETAPAS DO ATENDIMENTO
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
        <div className="max-w-[850px] mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">ETAPAS DO ATENDIMENTO</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.timelineTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          <div className="space-y-8 relative pl-2 max-w-2xl mx-auto">
            {copy.timelineSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start relative group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lux-panel border border-gold-brand/40 text-gold-brand text-xs font-bold flex items-center justify-center shadow-md">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm md:text-base text-lux-text-primary font-medium">{step.title}</h4>
                  {step.desc && (
                    <p className="text-xs md:text-sm text-lux-text-secondary font-light leading-relaxed">{step.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-lux-text-muted font-light pt-10 italic max-w-xl mx-auto leading-relaxed">
            O contato inicial permite compreender melhor o seu caso e orientar sobre a organização dos documentos necessários.
          </p>
        </div>
      </section>

      {/* 
        ============================================================
        7. ABOUT DRA. FERNANDA & THE OFFICE (SOBRE A ADVOGADA E O ESCRITÓRIO)
        Built specifically to avoid duplications while serving as heavy credit element.
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.02),transparent)] pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-5 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="md:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-brand to-gold-dark opacity-20 blur-lg transition duration-1000 group-hover:opacity-30 pointer-events-none" />
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl border border-lux-border bg-lux-panel overflow-hidden">
                  <img
                    src="/images/fernanda_avancini_office_1780499722468.png"
                    alt="Dra. Fernanda Parentoni Avancini — Advogada"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-brand block">CONDUÇÃO PROFISSIONAL</span>
              <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
                Atendimento com clareza, seriedade e atenção ao seu caso
              </h2>
              <div className="h-0.5 w-12 bg-gold-brand" />
              
              <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light">
                A Dra. Fernanda Parentoni Avancini atua com foco em orientação jurídica cuidadosa, comunicação clara e análise individual de cada situação de fato apresentada. O atendimento integrado preza por profundo respeito ético e dedicação atenta aos seus interesses.
              </p>

              {/* 4 Trust points in card margins */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-lux-border/50">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-lux-text-primary flex items-center space-x-1.5">
                    <span className="w-1 h-3.5 bg-gold-brand rounded" />
                    <span>Atendimento próximo</span>
                  </h4>
                  <p className="text-[11px] leading-relaxed text-lux-text-secondary font-light">
                    Cada atendimento é conduzido de forma próxima, com paciência e escuta realmente atenta ao seu contexto de vida.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-lux-text-primary flex items-center space-x-1.5">
                    <span className="w-1 h-3.5 bg-gold-brand rounded" />
                    <span>Comunicação acessível</span>
                  </h4>
                  <p className="text-[11px] leading-relaxed text-lux-text-secondary font-light">
                    Exposição perfeitamente transparente. Sem jargões técnicos excessivos ou juridiquês que impedem a real compreensão de seus direitos.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-lux-text-primary flex items-center space-x-1.5">
                    <span className="w-1 h-3.5 bg-gold-brand rounded" />
                    <span>Análise individual</span>
                  </h4>
                  <p className="text-[11px] leading-relaxed text-lux-text-secondary font-light">
                    Cada caso possui circunstâncias fáticas próprias. Não aplicamos fórmulas prontas, moldando a atuação aos detalhes documentados.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-lux-text-primary flex items-center space-x-1.5">
                    <span className="w-1 h-3.5 bg-gold-brand rounded" />
                    <span>Clareza e Seriedade</span>
                  </h4>
                  <p className="text-[11px] leading-relaxed text-lux-text-secondary font-light">
                    Orientamos você com honestidade técnica de acordo com as reais premissas de lei, agindo em constante conformidade com o código da OAB.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SHORT TRUST BLOCK FOR THE FIRM - EXCLUSIVELY REINFORCING CREDIBILITY */}
      <section className="py-16 bg-lux-panel border-b border-lux-border relative overflow-hidden">
        <div className="max-w-[850px] mx-auto px-5 text-center relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-lux-text-muted block">REFLEXO DE VALORES</span>
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="title-serif text-xl md:text-2xl font-light text-lux-text-primary tracking-tight">
              {copy.trustBlockTitle || "Estrutura de Apoio e Confiança"}
            </h3>
            <div className="h-0.5 w-8 bg-gold-brand/60 mx-auto" />
            <p className="text-sm md:text-base text-lux-text-secondary font-light leading-relaxed italic px-4">
              “{copy.trustBlockText || "O escritório atua com atendimento jurídico cuidadoso, comunicação clara e análise individual das situações apresentadas, oferecendo orientação com responsabilidade e seriedade."}”
            </p>
          </div>
          <div className="h-[1px] w-16 bg-lux-border/60 mx-auto" />
          <p className="text-[10px] text-lux-text-muted uppercase tracking-widest">
            Fernanda Parentoni Avancini Advocacia • OAB/SP
          </p>
        </div>
      </section>

      {/* 
        ============================================================
        8. AREA-SPECIFIC FAQ ACCORDION
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-10 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">SABER SEUS DIREITOS</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.faqSectionTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          <div className="space-y-4">
            {copy.faqs.map((faq, idx) => {
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

      {/* 
        ============================================================
        9. FINAL CTA + SECURE CONTACT FORM
        ============================================================
      */}
      <section id="procedimento-contato-especifico" className="py-16 md:py-24 bg-lux-panel">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="md:col-span-5 space-y-5">
              <span className="bg-gold-brand/10 text-gold-brand text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                ATENDIMENTO RESPONSÁVEL
              </span>
              <h3 className="title-serif text-2xl md:text-3xl lg:text-4xl font-light leading-snug font-sans">
                {copy.finalCtaTitle || "Fale com a Dra. Fernanda Parentoni Avancini"}
              </h3>
              {copy.finalCtaText && (
                <p className="text-xs md:text-sm text-lux-text-secondary font-light leading-relaxed">
                  {copy.finalCtaText}
                </p>
              )}

              <div className="flex flex-col space-y-3 pt-2">
                <button
                  onClick={handleWhatsappCTA}
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-white" />
                  <span>{copy.finalCtaButtonText || "FALAR PELO WHATSAPP"}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-lux-text-muted justify-center md:justify-start pt-1">
                <ShieldCheck className="w-4 h-4 text-gold-brand" />
                <span className="text-[10px] font-light">Seu e-mail e informações estão sob absoluto sigilo em nosso banco.</span>
              </div>
            </div>

            <div className="md:col-span-7 bg-lux-bg border border-lux-border p-6 md:p-8 rounded-2xl shadow-xl">
              <h4 className="title-serif text-xl font-light text-lux-text-primary mb-2">
                Solicite contato sobre {copy.tagline}
              </h4>
              {copy.formSupportText && (
                <p className="text-xs text-lux-text-secondary font-light mb-5">
                  {copy.formSupportText}
                </p>
              )}

              {isSuccess && (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl mb-4 animate-fade-in">
                  Mensagem enviada com sucesso! Retornaremos o mais breve possível para agendar o seu atendimento.
                </div>
              )}

              <form onSubmit={handleLocalSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="sys-name" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">Nome completo *</label>
                  <input
                    type="text"
                    id="sys-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome completo"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="sys-phone" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">Telefone com DDD *</label>
                    <input
                      type="tel"
                      id="sys-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: (19) 99876-5432"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="sys-email" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">E-mail *</label>
                    <input
                      type="email"
                      id="sys-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Digite seu melhor e-mail"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="sys-subject" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">Assunto *</label>
                  <select
                    id="sys-subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all"
                  >
                    {copy.formSubjects.map((sub, sidx) => (
                      <option key={sidx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="sys-message" className="text-[10px] font-bold uppercase tracking-wider text-lux-text-muted">MENSAGEM *</label>
                  <textarea
                    id="sys-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva brevemente sua situação."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-lux-panel border border-lux-border focus:border-gold-brand focus:outline-none focus:ring-1 focus:ring-gold-brand text-xs md:text-sm font-light text-lux-text-primary transition-all resize-none"
                  ></textarea>
                </div>

                <button
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
