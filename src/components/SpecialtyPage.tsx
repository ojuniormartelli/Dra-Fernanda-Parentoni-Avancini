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
    heroBadge: "DIREITO DO TRABALHADOR",
    heroHeadline: "Está com dúvidas se os seus direitos no trabalho foram pagos da forma correta?",
    heroDescription: "Se você foi despedido, não recebeu o seu acerto como deveria, faz horas extras sem o devido pagamento ou enfrenta problemas na relação de emprego, entenda a sua situação real com clareza e responsabilidade jurídica.",
    resolutionDescription: "O Direito Trabalhista existe para proteger o trabalhador e restabelecer o equilíbrio na relação de emprego. Nossa atuação é focada na reparação de irregularidades contratuais, atraso no pagamento de rescisões e cumprimento justo de cada direito previsto na Consolidação das Leis do Trabalho (CLT).",
    situationsTitle: "Veja situações comuns em que a orientação trabalhista pode ser importante",
    situations: [
      "Demissão sem pagamento correto ou no prazo legal das verbas rescisórias",
      "Horas extras prestadas habitualmente sem o devido pagamento ou compensação",
      "Ausência de registro adequado em carteira (trabalho informal)",
      "Depósitos do FGTS incompletos ou não realizados pelo empregador",
      "Acúmulo de tarefas diferentes ou desvio da função contratada originalmente",
      "Dúvidas sobre justa causa ou demissão sob pressão psicológica",
      "Adicionais devidos não pagos (como insalubridade, noturno e periculosidade)",
      "Ambiente de trabalho inadequado, hostilidades constantes ou desgaste emocional",
      "Recusa da empresa na entrega de guias de seguro-desemprego ou saque do FGTS"
    ],
    forWhomDescription: "Esta página foi pensada para o trabalhador/empregado que está enfrentando conflitos ou dúvidas decorrentes da sua relação profissional e deseja entender as regras de forma esclarecedora antes de agir.",
    forWhomItems: [
      "Profissionais dispensados que buscam conferir a exatidão das verbas rescisórias.",
      "Colaboradores que trabalham em regime de sobrejornada sem receber hora extra.",
      "Pessoas que prestaram serviços sem registro e buscam o reconhecimento do vínculo.",
      "Trabalhadores expostos a ambientes prejudiciais à saúde sem os adicionais cabíveis."
    ],
    notForWhomDescription: "Esta seção é de orientação exclusiva ao trabalhador. Não se destina à elaboração de defesas patronais de grandes corporações ou ao planejamento de empresas. Cada dúvida exposta passa por estudo pormenorizado do histórico de trabalho individual.",
    howWeHelpTitle: "Como a Dra. Fernanda Avancini pode ajudar no seu caso",
    howWeHelpSubtitle: "A atuação no âmbito trabalhista é realizada de maneira atenta e personalizada, focando em analisar os documentos reais e assegurar um acompanhamento transparente.",
    howWeHelp: [
      {
        title: "Análise do caso",
        desc: "Exame minucioso da situação descrita pelo trabalhador, identificando possíveis irregularidades e violações contratuais."
      },
      {
        title: "Orientação jurídica",
        desc: "Explicação em tom claro e compreensível sobre as alternativas jurídicas e direitos presentes na legislação laboral."
      },
      {
        title: "Avaliação dos documentos",
        desc: "Inspeção cuidadosa de holerites, termos de rescisão, extratos de FGTS e cartões de ponto para fundamentar o caso."
      },
      {
        title: "Encaminhamento adequado",
        desc: "Direcionamento responsável e correto para a solução do impasse, seja de maneira preventiva ou contenciosa."
      }
    ],
    timelineTitle: "Como funciona o primeiro atendimento",
    timelineDescription: "O processo é desenhado para ser totalmente seguro, célere e transparente, resguardando sempre a sua privacidade.",
    timelineSteps: [
      {
        title: "Você entra em contato",
        desc: "Basta clicar em um dos botões desta página para falar pelo WhatsApp ou usar o formulário de e-mail ao final."
      },
      {
        title: "Explica brevemente sua situação",
        desc: "Você nos fornece um resumo sobre seus períodos de trabalho, cargo ocupado e qual é o seu principal problema trabalhista."
      },
      {
        title: "Recebe orientação profissional",
        desc: "Após a leitura do relato inicial, informamos quais são as providências iniciais e quais documentos devem ser separados."
      },
      {
        title: "Planejamento das ações",
        desc: "Com as informações em mãos, analisamos em detalhes cada ponto da sua situação para indicar a melhor estratégia jurídica."
      }
    ],
    faqSectionTitle: "Perguntas frequentes do trabalhador",
    faqs: [
      {
        q: "Qual é o prazo limite para cobrar meus direitos trabalhistas na Justiça?",
        a: "O trabalhador possui o limite de até 2 anos contados a partir da data de término do contrato de trabalho corporativo. Através da ação, é permitido vindicar as verbas referentes aos últimos 5 anos de contratação."
      },
      {
        q: "Trabalhei informalmente sem registro. Eu ainda tenho garantia dos mesmos direitos?",
        a: "Sim. Havendo prestação contínua de trabalho, subordinação técnica, habitualidade e salário, o vínculo se configura e os direitos (férias, décimo terceiro, FGTS e aviso prévio) podem ser devidamente exigidos por vias legais."
      },
      {
        q: "Como faço para comprovar minhas horas extras se não havia marcação de ponto correta?",
        a: "As horas de trabalho excedentes podem ser provadas por intermédio de diálogos em aplicativos de mensagem, e-mails de cobrança, relatórios eletrônicos de frequência ou testemunhas que vivenciavam o cotidiano laborado."
      },
      {
        q: "A empresa rescindiu meu contrato e não me pagou. Existe alguma penalidade?",
        a: "A quitação das verbas decorrentes da rescisão contratual deve ocorrer no prazo improrrogável de até 10 dias úteis. Eventual atraso atrai a incidência de uma multa punitiva no valor de uma remuneração integral do trabalhador em seu benefício."
      },
      {
        q: "O atendimento inicial de esclarecimentos de dúvidas pode ser feito online?",
        a: "Perfeitamente. O contato inicial por WhatsApp oferece praticidade total para o envio de fotos de documentos, agilizando as respostas preliminares de forma privativa e segura."
      }
    ],
    formSubjects: [
      "Contrato sem registro / Vínculo",
      "Erros nas verbas rescisórias / Demissão",
      "Horas extras não pagas",
      "FGTS atrasado ou zerado",
      "Assédio moral ou desvio de função",
      "Não recebimento de adicionais",
      "Outras dúvidas trabalhistas"
    ],
    defaultSubject: "Erros nas verbas rescisórias / Demissão"
  },
  previdenciario: {
    tagline: "Direito Previdenciário",
    heroBadge: "PLANEJAMENTO E APOSENTADORIA",
    heroHeadline: "Sente insegurança ou tem dúvidas sobre as regras de transição do INSS para se aposentar?",
    heroDescription: "Não corra o risco de requerer sua aposentadoria de forma precipitada e sofrer uma redução vitalícia de salário. Conte com um estudo previdenciário individualizado e focado em resguardar seu esforço contributivo.",
    resolutionDescription: "O Direito Previdenciário assegura proteção social e amparo financeiro diante da maturidade, invalidez ou enfermidade. Nosso escritório cuida de todo o relacionamento com o INSS, efetuando planejamentos exatos para concessão de aposentadorias seguras e restabelecendo benefícios ilegalmente cancelados.",
    situationsTitle: "Veja situações comuns em que a orientação previdenciária do INSS é necessária",
    situations: [
      "Incerteza sobre qual é a regra de transição pós-Reforma da Previdência mais favorável",
      "Aposentadoria, pensão por morte ou auxílio do INSS indeferidos ou suspensos injustamente",
      "Inconsistências no CNIS que demandam retificação de períodos trabalhados no passado",
      "Necessidade de planejar o valor futuro do seguro com base nas contribuições autônomas",
      "Requerimento e acompanhamento em cartório de Benefício de Prestação Continuada (BPC/LOAS)",
      "Vias complexas para comprovação técnica de atividades especiais, rurais ou de pesca",
      "Atraso inexplicável e morosidade abusiva do INSS na resposta de processos internos",
      "Perícia de invalidez ou prorrogação de auxílio-maternidade / incapacidade de saúde",
      "Necessidade de simular quanto vale a pena recolher sob as normas vigentes de recolhimentos"
    ],
    forWhomDescription: "Esta página foi estruturada para segurados, trabalhadores rurais, idosos, deficientes físicos e contribuintes autônomos que desejam obter transparência e segurança perante o INSS.",
    forWhomItems: [
      "Contribuintes de carteira assinada ou autônomos próximos da idade ou tempo de se aposentar.",
      "Pessoas que enfrentam limitações graves e de longo prazo de saúde por motivos de moléstia.",
      "Idosos em vulnerabilidade socioeconômica precisando requerer ou regularizar o BPC.",
      "Herdeiros de segurado que solicitam a pensão por morte de forma amigável."
    ],
    notForWhomDescription: "Esta seção não cobre planos de previdência privada complementar corporativos ou discussões de regimes próprios de servidores civis estaduais. Os estudos efetuados são focados na legislação do Regime Geral (INSS) e na Lei Orgânica da Assistência Social.",
    howWeHelpTitle: "Como a Dra. Fernanda Avancini pode ajudar no INSS",
    howWeHelpSubtitle: "A análise do histórico contributivo é estruturada sob rigor operacional, evitando que você receba um benefício menor do que o efetivamente amparado por lei.",
    howWeHelp: [
      {
        title: "Análise do caso",
        desc: "Exame minucioso de todo o extrato do CNIS para localizar períodos faltantes, vínculos desatualizados e tempo militar ou de lavoura."
      },
      {
        title: "Orientação jurídica",
        desc: "Realização de minucioso planejamento simulando as regras de transição vigentes, indicando o melhor momento para sua aposentadoria."
      },
      {
        title: "Avaliação dos documentos",
        desc: "Triagem técnica de laudos periciais, receitas e exames de saúde para instruir requerimentos de incapacidade com sustentabilidade provatória."
      },
      {
        title: "Encaminhamento adequado",
        desc: "Ajuizamento de ações recursais e mandados de segurança se houver indeferimento ou atraso sem justificativa por parte da previdência."
      }
    ],
    timelineTitle: "Como funciona o primeiro atendimento previdenciário",
    timelineDescription: "Com um percurso explicativo claro, reduzimos a ansiedade burocrática comum do contato com o sistema do INSS.",
    timelineSteps: [
      {
        title: "Você entra em contato",
        desc: "Acione o link de WhatsApp ou mande os seus dados preenchendo o formulário de e-mail seguro disponível na página."
      },
      {
        title: "Apresenta brevemente sua situação",
        desc: "Informa qual é a idade, o tempo que imagina de contribuição e se o INSS já negou alguma solicitação recente."
      },
      {
        title: "Recebe orientação inicial",
        desc: "Identificamos quais são os papéis essenciais e explicamos se há viabilidade do requerimento conforme as leis vigentes."
      },
      {
        title: "Estudo individual do CNIS",
        desc: "Analisamos detidamente cada período e contribuição para propor a melhor estratégia de solicitação ou retificação perante o INSS."
      }
    ],
    faqSectionTitle: "Perguntas de segurados sobre o INSS",
    faqs: [
      {
        q: "O INSS indeferiu meu pedido de auxílio-doença mesmo estando incapacitado de fato. O que posso fazer?",
        a: "Se o indeferimento ocorreu sob alegação de perícia negativa, você possui o direito de levar a discussão à via judicial. Por lá, ocorrerá uma perícia isenta promovida por perito médico designado pela Justiça."
      },
      {
        q: "Quais os requisitos para obter o Benefício de Prestação Continuada (BPC/LOAS)?",
        a: "Destina-se a idosos a partir de 65 anos ou pessoas com impedimentos de saúde significativos. Exige-se que a renda por membro familiar seja inferior a um quarto do salário mínimo, além de inscrição ativa no Cadastro Único (CadÚnico)."
      },
      {
        q: "O que é o planejamento previdenciário e qual o seu benefício prático?",
        a: "Trata-se de um estudo matemático do CNIS que projeta o valor de todos os possíveis caminhos de transição futura. Ele impede que você acabe escolhendo uma regra com fator de rebaixamento desfavorável."
      },
      {
        q: "O INSS está demorando meses para dar retorno. Existe algum prazo máximo?",
        a: "A lei estipula prazos que variam de 45 a 90 dias úteis de acordo com a espécie contratual do auxílio. Ultrapassado o limite sem decisão fundamentada, é cabível peticionar judicialmente para que a análise ocorra."
      },
      {
        q: "Como faço para dar os esclarecimentos iniciais online de forma reservada?",
        a: "O envio de dúvidas iniciais via WhatsApp com sigilo de informações é prático e agiliza a verificação preliminar da possibilidade do benefício."
      }
    ],
    formSubjects: [
      "Simular tempo de aposentadoria",
      "Benefício negado ou indeferido pelo INSS",
      "Requerer BPC / LOAS",
      "Reestabelecer auxílio suspenso",
      "Retificação do CNIS",
      "Outra dúvida sobre previdência"
    ],
    defaultSubject: "Simular tempo de aposentadoria"
  },
  civel: {
    tagline: "Direito Cível e Suporte Patrimonial",
    heroBadge: "RELAÇÕES CIVIS E CONTRATUAIS",
    heroHeadline: "Envolvido em conflitos de contratos, cobranças, relações de consumo ou inventários familiares?",
    heroDescription: "A assinatura de contratos inadequados ou a aceitação de termos unilaterais causam sérios prejuízos no cotidiano. Acesse suporte profissional focado em resguardar seus haveres, patrimônio e tranquilidade de relações.",
    resolutionDescription: "O Direito Cível organiza os compromissos contratuais da sociedade e a destinação pacífica de acervos patrimoniais. Nosso escritório atua de forma firme e humana para solucionar desacordos imobiliários, executar títulos de crédito vencidos e providenciar inventários em cartório de forma ágil.",
    situationsTitle: "Veja situações comuns em que a orientação cível é necessária",
    situations: [
      "Desentendimentos em relação às obrigações estipuladas em contratos de prestação",
      "Inadimplência de pessoas e empresas nas transações, com notas ou cheques vencidos",
      "Insegurança em contratos de compromisso de compra, venda ou locação de imóveis",
      "Exposição a práticas abusivas de fornecedores e defeitos cruciais em compras valiosas",
      "Cobrança arbitrária, inclusão indevida em listas de negativados e danos ao consumidor",
      "Processos de inventário amigável e partilha consensual de dotes familiares diretamente em cartório",
      "Necessidade de redigir um contrato único específico para proteger um acordo comercial",
      "Disputas de posse de terra, limites ou perigos imobiliários de vizinhança sem diálogo",
      "Envio de notificação extrajudicial para dar contornos formais e amigáveis a um desacordo"
    ],
    forWhomDescription: "Esta página foi criada para orientar cidadãos expostos a conflitos materiais, herdeiros em processo de divisão familiar de bens, e consumidores em busca de equilíbrio contratual.",
    forWhomItems: [
      "Pessoas que realizam transações imobiliárias importantes e desejam evitar o risco de golpes.",
      "Famílias de herdeiros em perfeito consenso propensas a lavrar inventários rápidos em cartório.",
      "Clientes lesados por defeitos não sanados ou práticas comerciais vexatórias de operadoras.",
      "Indivíduos que portam títulos de crédito em atraso e necessitam de recuperação monetária."
    ],
    notForWhomDescription: "Esta seção se limita às esferas civil, de consumo, contratos e inventários. Não realizamos atuações em divórcios litigiosos graves, disputas de guarda extremas na Vara de Família ou contendas de natureza penal.",
    howWeHelpTitle: "Como a Dra. Fernanda Avancini pode auxiliar no âmbito cível",
    howWeHelpSubtitle: "Buscamos de forma prioritária o restabelecimento do equilíbrio e soluções mais harmoniosas, reduzindo tempo e desgastes corporais ou financeiros.",
    howWeHelp: [
      {
        title: "Análise do caso",
        desc: "Exame das obrigações contratuais assumidas e reconstrução do histórico fático do desacordo comercial."
      },
      {
        title: "Orientação jurídica",
        desc: "Esclarecimento de forma límpida sobre o que as leis civis e de consumo asseguram diante dos termos contidos em assinaturas."
      },
      {
        title: "Avaliação dos documentos",
        desc: "Perícia legal de termos de adesão, mensagens, comprovantes de depósitos e termos imobiliários de registro oficial."
      },
      {
        title: "Encaminhamento adequado",
        desc: "Atuação focada na composição consensual extrajudicial e, quando esgotados os meios, propositura de processos indenizatórios adequados."
      }
    ],
    timelineTitle: "Como funciona o primeiro atendimento cível",
    timelineDescription: "Com rigoroso sigilo profissional e agendamentos estruturados, analisamos o seu caso de forma segura e totalmente privativa.",
    timelineSteps: [
      {
        title: "Você entra em contato",
        desc: "Envie detalhes sobre a sua preocupação pelo aplicativo de conversas ou inserindo as informações no formulário abaixo."
      },
      {
        title: "Apresenta brevemente sua situação",
        desc: "Nos descreve de forma simples as condições básicas do contrato violado, cobrança indevida ou falecimento para herança."
      },
      {
        title: "Recebe orientação profissional",
        desc: "Avaliamos as características normativas primárias de seu atrito e elencamos quais os papéis de suporte devem ser providenciados."
      },
      {
        title: "Definição do melhor caminho",
        desc: "Analisamos as regras e o contrato em questão para indicar se o melhor caminho é a notificação conciliadora ou a via judicial."
      }
    ],
    faqSectionTitle: "Perguntas comuns solucionadas pelas regras civis",
    faqs: [
      {
        q: "Como proceder para efetuar o inventário em cartório de forma célere?",
        a: "Os requisitos legais exigem que todos os herdeiros sejam plenamente capazes e concordem de forma harmônica com a divisão. Não deve haver testamento em disputa e o trâmite exige o acompanhamento obrigatório de uma advogada."
      },
      {
        q: "Tive meu CPF negativado de forma indevida por portabilidade ou serviços não contratados. Cabe direito material?",
        a: "Perfeitamente. Considera-se ilegal a inserção do nome de cidadão em cadastro restritivo de crédito sem aviso prévio. O ato possibilita a imediata exclusão e o pleito de indenização correspondente."
      },
      {
        q: "Modelos e cópias genéricas retiradas da internet trazem perigos reais?",
        a: "Sim. Geralmente negligenciam garantias particulares essenciais, contêm cláusulas revogadas de leis antigas ou não definem penalidades exatas em caso de atraso na sua região, gerando grande margem para conflitos futuros."
      },
      {
        q: "Como resolver um descumprimento de contato de forma rápida?",
        a: "Em boa parte dos cenários, a elaboração profissional de uma notificação extrajudicial enviada ao devedor resolve a situação de forma amigável, formalizando prazos e incentivando uma negociação amigável."
      },
      {
        q: "O primeiro contato é suficiente para verificar se a causa possui viabilidade?",
        a: "Sim. Analisando as fotografias contratuais ou descrição dos fatos, conseguimos vislumbrar documentalmente se há amparo claro ou qual a melhor estratégia preventiva."
      }
    ],
    formSubjects: [
      "Inventário amigável / Partilha em Cartório",
      "Descumprimento de Contrato / Cobrança",
      "Contratos de Compra e Venda de Imóveis",
      "Danos morais e problemas de Consumo",
      "Elaboração de contrato sob medida",
      "Notificação Extrajudicial / Outro assunto"
    ],
    defaultSubject: "Descumprimento de Contrato / Cobrança"
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
              <button 
                onClick={onToggleMode}
                className="px-2.5 py-1 rounded border border-lux-border hover:bg-lux-bg text-[9px] text-gold-brand uppercase font-bold tracking-wider transition-colors duration-200"
                title="Visualizar como landing page de alta conversão"
              >
                Visualizar Como LP
              </button>
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
