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
}

const SPECIALTIES_COPIES: Record<Exclude<PageId, 'home'>, CustomSpecialtyData> = {
  trabalhista: {
    tagline: "Direito Trabalhista",
    heroBadge: "ANÁLISE E INFORMAÇÃO CONTRATUAL",
    heroHeadline: "Precisa de orientação jurídica esclarecedora sobre seus direitos trabalhistas?Esclarece a conformidade legal do seu contrato de forma ética, individualizada e segura.",
    heroDescription: "Seja na necessidade de conferir verbas rescisórias, horas extras pendentes, ou para esclarecer dúvidas gerais sobre as regras do contrato de trabalho, tenha o suporte de um estudo técnico pautado no sigilo absoluto e na legislação vigente.",
    resolutionDescription: "O Direito do Trabalho visa estruturar as relações profissionais sob a égide da conformidade técnica e do equilíbrio legal. Nossa atuação foca no exame detalhado de cada histórico funcional, de maneira a esclarecer as regras aplicáveis às verbas rescisórias, às jornadas e ao estrito cumprimento das garantias previstas na Consolidação das Leis do Trabalho (CLT).",
    situationsTitle: "Situações comuns que justificam a análise do seu contrato de trabalho",
    situations: [
      "Conferência de cálculo e prazo de pagamento das verbas decorrentes da rescisão contratual",
      "Esclarecimento sobre horas extras prestadas habitualmente sem a devida compensação",
      "Verificação dos requisitos legais fáticos para fins de reconhecimento de vínculo de trabalho sem registro",
      "Perícia de regularidade dos depósitos de FGTS durante o período de vigência contratual",
      "Dúvidas técnicas sobre o enquadramento de acúmulo de tarefas ou desvio da função contratada",
      "Orientação jurídica sobre as hipóteses legais de justa causa ou cabimento de rescisão indireta",
      "Avaliação de enquadramento quanto aos adicionais de insalubridade, periculosidade e noturno",
      "Dúvidas decorrentes de ambiente de trabalho inadequado, hostilidades ou assédio moral",
      "Esclarecimentos operacionais sobre habilitação no seguro-desemprego e saque do FGTS"
    ],
    forWhomDescription: "Esta orientação profissional é direcionada a trabalhadores, prestadores ou ex-colaboradores que buscam compreender a regularidade técnica dos atos e pagamentos praticados ao longo de sua relação laboral.",
    forWhomItems: [
      "Trabalhadores desligados que desejam conferir a integridade dos valores do termo de rescisão.",
      "Colaboradores submetidos a regimes de horas extras recorrentes sem preenchimento de acordo.",
      "Prestadores em regime de informalidade que necessitam avaliar o cabimento dos direitos de CLT.",
      "Profissionais expostos a atividades especiais ou de perigo em busca de informações sobre adicionais."
    ],
    notForWhomDescription: "Este canal de utilidade é dedicado à orientação informativa do trabalhador em caráter individual. Não realizamos consultoria corporativa de massa para grandes conglomerados empresariais, focando nossa atenção no estudo analítico e singular de cada caso fático.",
    howWeHelpTitle: "Como se desenvolve a análise consultiva da Dra. Fernanda Avancini",
    howWeHelpSubtitle: "A avaliação de cada situação de fato é conduzida sob estrito compromisso ético e rigor legal, conferindo transparência absoluta e segurança na instrução dos documentos informados.",
    howWeHelp: [
      {
        title: "Auditoria Funcional",
        desc: "Exame pormenorizado do histórico do contrato de trabalho para mapear eventuais desconformidades legais."
      },
      {
        title: "Doutrina e Esclarecimento",
        desc: "Explicação cuidadosa das normas técnicas, prazos constitucionais e direitos aplicáveis ao seu setor de atuação."
      },
      {
        title: "Conferência Documental",
        desc: "Análise técnica de termos de rescisão (TRCT), contracheques, registros de frequência e extratos analíticos de FGTS."
      },
      {
        title: "Direcionamento Preventivo",
        desc: "Orientação honesta sobre as alternativas legais viáveis, priorizando caminhos consensuais e extrajudiciais."
      }
    ],
    timelineTitle: "Como funciona o atendimento informativo",
    timelineDescription: "O fluxo de comunicação é pautado pela discrição total, preservando a identidade e o segredo profissional desde o primeiro contato.",
    timelineSteps: [
      {
        title: "Agendamento Reservado",
        desc: "Você aciona o escritório por e-mail ou WhatsApp para iniciar o contato de forma reservada."
      },
      {
        title: "Exposição dos Fatos",
        desc: "Você apresenta um breve resumo contendo as principais características da relação de trabalho e as dúvidas existentes."
      },
      {
        title: "Estudo de Viabilidade",
        desc: "Analisamos preliminarmente as informações prestadas para orientar sobre os enquadramentos trazidos pela legislação."
      },
      {
        title: "Organização dos Documentos",
        desc: "Se houver elementos relevantes, indicamos quais os documentos indispensáveis para subsidiar uma análise de precisão."
      }
    ],
    faqSectionTitle: "Dúvidas frequentes respondidas sob a ótica legal",
    faqs: [
      {
        q: "Qual é o prazo limite para buscar esclarecimento e revisão de direitos na Justiça?",
        a: "A legislação estabelece o prazo de até 2 anos a contar da data da rescisão ou encerramento do contrato de trabalho para postular judicialmente verbas cumuladas, abrangendo o limite retroativo dos últimos 5 anos de vigência da relação contratual."
      },
      {
        q: "Prestei serviços de forma habitual e subordinada, mas sem carteira assinada. Quais regras são válidas?",
        a: "Existindo os requisitos de habitualidade, pessoalidade, subordinação jurídica e remuneração, é viável postular o reconhecimento formal de vínculo. Havendo a comprovação fática, todas as parcelas resguardadas pela CLT passam a ser devidas."
      },
      {
        q: "Como comprovar a prestação de horas extras em caso de controle de ponto inconsistente?",
        a: "A duração da jornada laboral que exceda o limite contratado pode ser demonstrada por registros indiretos, como correspondências eletrônicas, relatórios de produtividade, mensagens escritas corporativas e relatos testemunhais isentos."
      },
      {
        q: "Existem prazos específicos para o empregador efetuar a homologação e o respectivo pagamento de rescisão?",
        a: "Sim. O pagamento integral das parcelas devidas e a entrega de guias devem ocorrer no prazo de até 10 dias corridos contados do término contratual. O descumprimento injustificado acarreta a incidência de multa equivalente a um salário do empregado."
      },
      {
        q: "O suporte inicial de esclarecimentos pode ser prestado inteiramente à distância?",
        a: "Sim, perfeitamente. O contato preliminar por meio do atendimento remoto ou WhatsApp é amplamente aceito e seguro, agilizando de forma privativa a triagem inicial do seu caso através da análise dos documentos encaminhados."
      }
    ],
    formSubjects: [
      "Análise de Termo de Rescisão (TRCT)",
      "Verificação de Horas Extras e Intervalos",
      "Reconhecimento de Vínculo de Emprego",
      "Regularização de Depósitos de FGTS",
      "Estudo sobre Adicionais e Enquadramentos",
      "Dúvidas sobre Demissão ou Rescisão Indireta",
      "Esclarecimentos Gerais de Direitos de CLT"
    ],
    defaultSubject: "Análise de Termo de Rescisão (TRCT)"
  },
  previdenciario: {
    tagline: "Direito Previdenciário",
    heroBadge: "CONSULTORIA E ORIENTAÇÃO PREVIDENCIÁRIA",
    heroHeadline: "Aposentadoria, benefícios e planejamento previdenciário: esclareça sua situação perante o INSS com suporte técnico especializado e individualizado.",
    heroDescription: "A concessão e a revisão de benefícios previdenciários exigem uma análise minuciosa de cada histórico de contribuição. Planeje seu futuro com base em estudos técnicos detalhados e na legislação previdenciária vigente.",
    resolutionDescription: "O Direito Previdenciário ampara o segurado em momentos fundamentais de sua jornada. Nosso objetivo é esclarecer os critérios de transição pós-Reforma da Previdência, realizar o planejamento de contribuições e orientar o segurado individualmente quanto aos requisitos legais necessários para cada tipo de benefício, de forma técnica e transparente.",
    situationsTitle: "Situações que justificam a análise do seu histórico previdenciário",
    situations: [
      "Dúvidas sobre o enquadramento em regras de transição pós-Reforma da Previdência",
      "Benefício (aposentadoria, pensão por morte ou auxílio-doença) indeferido ou suspenso pelo INSS",
      "Necessidade de regularização ou retificação de períodos contributivos no Cadastro Nacional de Informações Sociais (CNIS)",
      "Planejamento previdenciário para projeção de valores e otimização de contribuições futuras",
      "Esclarecimentos sobre os requisitos para solicitação do Benefício de Prestação Continuada (BPC/LOAS)",
      "Orientação sobre comprovação de tempo especial (insalubridade e periculosidade), rural ou de pesca",
      "Atraso excedente ou ausência de posicionamento do INSS nos processos administrativos",
      "Esclarecimentos sobre perícia médica e prorrogação de auxílio por incapacidade temporária",
      "Avaliação da viabilidade de revisão de benefícios já implantados pelo INSS"
    ],
    forWhomDescription: "Esta orientação técnica destina-se a segurados do Regime Geral (INSS), profissionais de diversas categorias, autônomos e pessoas em situação de vulnerabilidade que buscam segurança jurídica em suas relações previdenciárias.",
    forWhomItems: [
      "Segurados que se aproximam da idade ou do tempo de contribuição para aposentadoria.",
      "Pessoas com impedimentos de longo prazo que buscam compreender os critérios para o auxílio por incapacidade.",
      "Idosos ou pessoas com deficiência em busca de esclarecimentos sobre o Benefício de Prestação Continuada (BPC/LOAS).",
      "Dependentes que necessitam de orientação técnica para o requerimento de pensão por morte."
    ],
    notForWhomDescription: "Nossos serviços informativos são voltados exclusivamente à análise de direito previdenciário com foco no Regime Geral (RGPS) e na Lei Orgânica da Assistência Social (LOAS). Não realizamos auditorias de fundos corporativos de previdência privada fechada.",
    howWeHelpTitle: "Como se desenvolve a análise previdenciária da Dra. Fernanda Avancini",
    howWeHelpSubtitle: "A análise do seu histórico de contribuições é conduzida com rigor técnico e ética profissional, promovendo a clareza indispensável para que o segurado compreenda sua real situação legal.",
    howWeHelp: [
      {
        title: "Análise de Vínculos (CNIS)",
        desc: "Exame minucioso do extrato de contribuições para certificar períodos, localizar lacunas e planejar retificações necessárias."
      },
      {
        title: "Planejamento de Transição",
        desc: "Simulação das diferentes regras pós-reforma para identificar as opções mais adequadas a cada perfil de contribuição."
      },
      {
        title: "Análise Documental",
        desc: "Revisão de laudos de saúde, receitas e exames periciais para instruir requerimentos com sustentabilidade jurídica."
      },
      {
        title: "Suporte Administrativo",
        desc: "Prevenção de atrasos através de acompanhamento continuado das decisões do INSS e instrução ética de recursos e justificações."
      }
    ],
    timelineTitle: "Como funciona o atendimento informativo",
    timelineDescription: "O fluxo de atendimento é desenhado de forma simples e segura, com total discrição e respeito ao segredo profissional.",
    timelineSteps: [
      {
        title: "Contato Inicial Reservado",
        desc: "Você entra em contato pelo formulário ou WhatsApp para agendar um atendimento técnico individualizado."
      },
      {
        title: "Relato do Histórico Previdenciário",
        desc: "Apresentação de informações sobre tempo trabalhado, idade e qual benefício deseja planejar ou regularizar."
      },
      {
        title: "Exame de Documentos",
        desc: "Indicação e triagem dos documentos necessários, como a carteira de trabalho (CTPS) e o CNIS, para embasar a análise fática."
      },
      {
        title: "Parecer e Direcionamento",
        desc: "Apresentação de orientações claras em conformidade com as regras vigentes do INSS e da assistência social."
      }
    ],
    faqSectionTitle: "Dúvidas frequentes respondidas sob a ótica legal",
    faqs: [
      {
        q: "O INSS indeferiu meu pedido de auxílio-doença mesmo estando incapacitado de fato. O que posso fazer?",
        a: "No caso de indeferimento de benefício administrativo, o segurado pode apresentar recurso perante o próprio INSS ou submeter a verificação de sua real situação de saúde à via judicial, onde será realizada uma nova perícia médica especializada de forma isenta."
      },
      {
        q: "Quais são as condições estipuladas por lei para o recebimento do Benefício de Prestação Continuada (BPC/LOAS)?",
        a: "O BPC-LOAS é assegurado a idosos a partir de 65 anos ou pessoas com deficiência que comprovem impedimento de longo prazo. É necessário demonstrar estado de vulnerabilidade socioeconômica na composição da renda familiar, além de manter inscrição regularizada no respectivo CadÚnico."
      },
      {
        q: "Em que consiste a elaboração de um planejamento previdenciário?",
        a: "Trata-se de um estudo analítico focado em realizar simulações numéricas e jurídicas com base em todo o CNIS do segurado. O planejamento previne escolhas precipitadas e indica precisamente qual dentre as regras de transição vigentes é a mais adequada à realidade do contribuinte."
      },
      {
        q: "Há um prazo legal estabelecido para que o INSS emita uma decisão formal sobre as solicitações administrativas?",
        a: "A legislação previdenciária estabelece prazos estimados para resposta dos requerimentos. Havendo morosidade injustificada além do limite tolerável em lei, é cabível peticionar judicialmente visando exigir que a autoridade administrativa proceda à respectiva análise fática."
      },
      {
        q: "O suporte de esclarecimentos pode ser prestado inteiramente à distância?",
        a: "Sim, perfeitamente. O contato preliminar por meio do atendimento remoto ou WhatsApp é amplamente aceito e seguro, simplificando o envio e a conferência inicial de documentos sob o mais absoluto sigilo profissional."
      }
    ],
    formSubjects: [
      "Análise e Planejamento Previdenciário",
      "Auxílio ou Benefício Indeferido pelo INSS",
      "Orientações sobre BPC / LOAS (Idoso ou Deficiência)",
      "Regularização e Retificação de CNIS",
      "Tempo de Contribuição Especial ou Rural",
      "Esclarecimentos Gerais de Direitos do INSS"
    ],
    defaultSubject: "Análise e Planejamento Previdenciário"
  },
  civel: {
    tagline: "Direito Cível e Suporte Patrimonial",
    heroBadge: "RELAÇÕES CIVIS E CONTRATUAIS",
    heroHeadline: "Precisa de orientação em contratos, cobranças ou inventários consensuais? Esclareça sua situação de forma segura, compreensiva e em total conformidade ética.",
    heroDescription: "Problemas em relações civis ou transações imobiliárias demandam atenção sobre termos e obrigações assumidos. Acesse suporte profissional focado em resguardar seus direitos de forma informada e em sigilo absoluto.",
    resolutionDescription: "O Direito Cível disciplina as relações cotidianas, os contratos e a destinação de bens. Nosso escritório atua de forma dedicada para solucionar desacordos imobiliários, realizar cobranças fundamentadas e providenciar inventários em cartório, priorizando caminhos consensuais com seriedade e idoneidade.",
    situationsTitle: "Situações comuns que justificam a análise do seu caso na esfera cível",
    situations: [
      "Dúvidas sobre o cumprimento de cláusulas em contratos de prestação de serviços ou parcerias",
      "Insegurança em contratos de compromisso de compra, venda ou locação de imóveis",
      "Necessidade de efetuar a cobrança ou o recebimento de valores em atraso de forma legal",
      "Desenvolvimento de contratos personalizados sob medida para proteger acordos comerciais fáticos",
      "Dúvidas relacionadas a inventários consensuais e divisão amigável de bens diretamente em cartório",
      "Esclarecimentos sobre cobranças indevidas, restrições cadastrais arbitrárias ou direito do consumidor",
      "Envio ou resposta a notificações extrajudiciais para conferir contornos formais e buscar soluções amigáveis",
      "Dúvidas de responsabilidade civil, danos ambientais de vizinhança ou disputas de posse imobiliária",
      "Orientação técnica sobre reparação cível por danos materiais ou morais decorrentes de inadimplemento"
    ],
    forWhomDescription: "Esta orientação técnica destina-se a cidadãos e empreendedores que buscam clareza normativa em suas relações privadas, segurança na assinatura de novos compromissos ou soluções consensuais para demandas cotidianas.",
    forWhomItems: [
      "Pessoas envolvidas em transações imobiliárias que desejam avaliar riscos contratuais antes de assinar.",
      "Membros familiares em pleno acordo interessados em formalizar o inventário e a partilha rápida em cartório.",
      "Consumidores prejudicados por práticas comerciais inadequadas ou inclusões indevidas nos órgãos de restrição.",
      "Credores de títulos em atraso que priorizam um processo de mediação ou cobrança extrajudicial responsável."
    ],
    notForWhomDescription: "Nossa atuação consultiva e instrutiva nesta área se concentra em contratos, sucessões extrajudiciais e direito obrigacional. Não atuamos em ações de divórcios litigiosos complexos, contendas graves de guarda na Vara de Família ou representações criminais.",
    howWeHelpTitle: "Como se desenvolve a análise consultiva da Dra. Fernanda Avancini",
    howWeHelpSubtitle: "Buscamos de forma prioritária o equilíbrio técnico e as soluções consensuais, evitando discussões prolongadas na via judicial e reduzindo o desgaste pessoal dos envolvidos.",
    howWeHelp: [
      {
        title: "Diagnóstico de Riscos",
        desc: "Exame das cláusulas do contrato celebrado para detectar possíveis desequilíbrios, ambiguidades ou obrigações abusivas."
      },
      {
        title: "Esclarecimento Prático",
        desc: "Explicação em tom direto e compreensível sobre regras de responsabilidade, prazos e direitos contidos na norma civil."
      },
      {
        title: "Triagem de Documentos",
        desc: "Análise cuidadosa de termos, mensagens, certidões registradas em cartórios e comunicações para embasar a fundamentação legal."
      },
      {
        title: "Apoio à Conciliação",
        desc: "Direcionamento focado na elaboração de termos de conciliação e notificações extrajudiciais para soluções sem litígio."
      }
    ],
    timelineTitle: "Como funciona o atendimento informativo",
    timelineDescription: "O fluxo de comunicação é pautado pela discrição total e respeito ao segredo profissional na condução de suas informações.",
    timelineSteps: [
      {
        title: "Agendamento Reservado",
        desc: "Você entra em contato por meio de formulário de correio eletrônico ou WhatsApp de forma segura."
      },
      {
        title: "Apresentação dos Fatos",
        desc: "Você descreve as características fundamentais do seu acordo, contrato inadimplido ou questão sucessória."
      },
      {
        title: "Exame de Viabilidade",
        desc: "Realizamos uma avaliação prévia dos termos informados para indicar o enquadramento do caso na legislação civil."
      },
      {
        title: "Definição de Próximos Passos",
        desc: "Oferecemos recomendações claras sobre a melhor forma de prosseguir, indicando os papéis e vias consensuais cabíveis."
      }
    ],
    faqSectionTitle: "Dúvidas frequentes respondidas sob a ótica legal",
    faqs: [
      {
        q: "Quais são as regras para que um inventário possa ser feito diretamente em cartório?",
        a: "Para viabilizar o inventário pela via extrajudicial (consensual), é imperativo que todos os herdeiros sejam maiores de idade, plenamente capazes e concordem de forma unânime sobre a divisão de bens. Além disso, não deve haver testamento ativo e a representação por advogada é exigência legal."
      },
      {
        q: "Tive meu CPF negativado de forma indevida por portabilidade ou serviços não contratados. Cabe direito material?",
        a: "Sim. A inscrição indevida nos órgãos de proteção ao crédito, seja por erro operacional ou ausência de notificação regulamentar, gera direito à imediata suspensão restritiva e possibilidade de reparação, sendo passível de discussão judicial."
      },
      {
        q: "Quais os riscos associados ao uso de modelos contratuais genéricos da internet?",
        a: "Modelos pré-formatados comumente não preveem as obrigações específicas tratadas no acordo fático, empregam leis que já foram revogadas ou não estipulam multas válidas por atraso. Um contrato planejado sob medida resguarda e previne litígios futuros."
      },
      {
        q: "De que maneira a notificação extrajudicial auxilia na resolução de um descumprimento contratual?",
        a: "A notificação formaliza e cientifica o devedor quanto à inadimplência praticada, concedendo prazo razoável para regularização e constituindo mora legal. Trata-se de uma ferramenta altamente persuasiva para abrir negociação sem litígio."
      },
      {
        q: "O atendimento consultivo preliminar pode ser realizado à distância?",
        a: "Sim, sem qualquer ônus de segurança. A triagem inicial por canais online e WhatsApp é ágil, reservada e permite o envio prático de imagens de documentos para o devido exame preliminar das regras e das cláusulas aplicáveis ao impasse."
      }
    ],
    formSubjects: [
      "Inventário Consensual / Cartório",
      "Análise e Elaboração de Contratos",
      "Cobrança e Recebimento de Valores",
      "Problemas de Consumo e Negativação",
      "Contratos de Compra e Venda de Imóveis",
      "Notificação Extrajudicial / Outro Assunto"
    ],
    defaultSubject: "Análise e Elaboração de Contratos"
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
            {copy.heroHeadline.split('?')[0]}? <br />
            <span className="title-serif italic font-medium text-gold-brand">
              {copy.heroHeadline.split('?')[1] || ""}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-lux-text-secondary leading-relaxed font-light max-w-3xl mx-auto">
            {copy.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={handleWhatsappCTA}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center space-x-2.5 cursor-pointer hover:scale-102"
            >
              <MessageSquare className="w-4.5 h-4.5 text-white" />
              <span>Conversar pelo WhatsApp</span>
            </button>
            <button
              onClick={() => document.querySelector('#procedimento-contato-especifico')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest border border-lux-border-bright text-lux-text-primary bg-lux-panel hover:bg-lux-panel-light cursor-pointer transition-all text-center"
            >
              Solicitar Atendimento por E-mail
            </button>
          </div>

          <p className="text-[11px] text-lux-text-muted font-light pt-2">
            Atendimento em Itapira, região e de forma digital, com garantia de absoluto sigilo profissional e privacidade.
          </p>
        </div>
      </section>

      {/* 
        ============================================================
        2. COMPREHENSIVE SERVICE INTRODUCTION (O QUE A ÁREA RESOLVE)
        ============================================================
      */}
      <section className="py-16 bg-lux-panel border-b border-lux-border relative overflow-hidden">
        <div className="max-w-[850px] mx-auto px-5 text-center relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold-brand block">PROPÓSITO SOCIAL E JURÍDICO</span>
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
        3. MOST COMMON SITUATIONS (SITUAÇÕES MAIS COMUNS)
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border relative">
        <div className="max-w-[1250px] mx-auto px-5 md:px-8 xl:px-0">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">SITUAÇÕES DO DIA A DIA</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.situationsTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.situations.map((situation, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-lux-panel border border-lux-border flex items-start space-x-3.5 hover:border-gold-brand/35 transition-all duration-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-yellow-500/10 text-yellow-400 text-xs flex items-center justify-center font-bold mt-0.5">!</span>
                <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light">{situation}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-10">
            <p className="text-xs md:text-sm text-lux-text-muted font-light max-w-2xl mx-auto italic mb-6">
              Cada situação descrita acima exige verificação cuidada das provas documentais de acordo com suas particularidades contratuais.
            </p>
            
            <button
              onClick={handleWhatsappCTA}
              className="inline-flex px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-lg shadow-emerald-500/10 items-center justify-center space-x-2 cursor-pointer hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>SOLICITAR ANÁLISE DETALHADA DO MEU CASO</span>
            </button>
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        4. WHO IS THIS PAGE FOR / NOT FOR (PARA QUEM É / QUANDO NÃO É)
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-panel border-b border-lux-border">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 xl:px-0">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Suitable audience (Para quem serve) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-brand block">PÚBLICO-ALVO</span>
              <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
                Para quem esta página pode ser útil
              </h2>
              <div className="h-0.5 w-12 bg-gold-brand" />
              <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light">
                {copy.forWhomDescription}
              </p>

              <div className="space-y-4 pt-4">
                {copy.forWhomItems.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-5.5 h-5.5 rounded-full bg-gold-brand/10 border border-gold-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-gold-brand" />
                    </div>
                    <p className="text-xs md:text-sm text-lux-text-primary font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Unsuitable scenario disclaimer (Para quem NÃO serve as a boundary) */}
            <div className="lg:col-span-5 bg-lux-bg border border-lux-border/60 p-6 md:p-8 rounded-2xl relative overflow-hidden self-stretch flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-brand/[0.015] rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-lux-text-muted block">RESTRIÇÃO DE FOCO</span>
                <h3 className="text-lg md:text-xl font-light text-lux-text-primary tracking-tight">
                  Quando nossa orientação não é a ideal
                </h3>
                <div className="h-[1px] w-full bg-lux-border/40" />
                <p className="text-xs md:text-sm text-lux-text-secondary leading-relaxed font-light">
                  {copy.notForWhomDescription}
                </p>
              </div>

              <div className="pt-8 mt-auto">
                <button
                  onClick={handleWhatsappCTA}
                  className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FALAR COM A ADVOGADA</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ============================================================
        5. HOW THE ATTORNEY CAN HELP (COMO A DRA. FERNANDA PODE AJUDAR)
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-bg border-b border-lux-border">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">MÉTODO DE SUPORTE</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.howWeHelpTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light text-center max-w-3xl mx-auto mb-12">
            {copy.howWeHelpSubtitle}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 pt-2">
            {copy.howWeHelp.map((helpItem, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-lux-panel border border-lux-border hover:border-gold-brand/20 transition-all duration-300 flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-gold-brand/10 border border-gold-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-gold-brand" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm md:text-base text-lux-text-primary font-medium">{helpItem.title}</h4>
                  <p className="text-xs md:text-sm text-lux-text-secondary font-light leading-relaxed">{helpItem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ============================================================
        6. STEP-BY-STEP ADVISORY (COMO FUNCIONA O ATENDIMENTO)
        ============================================================
      */}
      <section className="py-16 md:py-24 bg-lux-panel border-b border-lux-border">
        <div className="max-w-[850px] mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-brand block">PROCESSO SEGURO</span>
            <h2 className="text-2xl md:text-3xl font-light text-lux-text-primary tracking-tight">
              {copy.timelineTitle}
            </h2>
            <div className="h-0.5 w-12 bg-gold-brand mx-auto" />
          </div>

          <p className="text-sm md:text-base text-lux-text-secondary leading-relaxed font-light text-center max-w-3xl mx-auto mb-12">
            {copy.timelineDescription}
          </p>

          <div className="space-y-8 relative pl-2 max-w-2xl mx-auto">
            {copy.timelineSteps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start relative group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lux-bg border border-gold-brand/40 text-gold-brand text-xs font-bold flex items-center justify-center shadow-md">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm md:text-base text-lux-text-primary font-medium">{step.title}</h4>
                  <p className="text-xs md:text-sm text-lux-text-secondary font-light leading-relaxed">{step.desc}</p>
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
              Estrutura de Apoio e Confiança
            </h3>
            <div className="h-0.5 w-8 bg-gold-brand/60 mx-auto" />
            <p className="text-sm md:text-base text-lux-text-secondary font-light leading-relaxed italic px-4">
              “O escritório atua com atendimento jurídico cuidadoso, comunicação clara e análise individual das situações apresentadas, oferecendo orientação com responsabilidade e seriedade.”
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
                Fale com a Dra. Fernanda Parentoni Avancini
              </h3>
              <p className="text-xs md:text-sm text-lux-text-secondary font-light leading-relaxed">
                Se você está enfrentando uma situação em que necessita de esclarecimento ou deseja dar andamento aos seus direitos, apresente seu caso. O contato preliminar é seguro, restrito e amparado legalmente.
              </p>

              <div className="flex flex-col space-y-3 pt-2">
                <button
                  onClick={handleWhatsappCTA}
                  className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-white" />
                  <span>FALAR PELO WHATSAPP</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-lux-text-muted justify-center md:justify-start pt-1">
                <ShieldCheck className="w-4 h-4 text-gold-brand" />
                <span className="text-[10px] font-light">Seu e-mail e informações estão sob absoluto sigilo em nosso banco.</span>
              </div>
            </div>

            <div className="md:col-span-7 bg-lux-bg border border-lux-border p-6 md:p-8 rounded-2xl shadow-xl">
              <h4 className="title-serif text-xl font-light text-lux-text-primary mb-5">
                Solicite contato sobre {copy.tagline}
              </h4>

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
