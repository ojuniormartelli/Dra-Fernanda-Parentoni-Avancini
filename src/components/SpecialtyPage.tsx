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
    tagline: "Direito do Trabalho",
    heroBadge: "ORIENTAÇÃO AO TRABALHADOR",
    heroHeadline: "Tem dúvidas sobre seu acerto de rescisão ou acredita que seus direitos de trabalho não foram pagos corretamente? Esclareça sua situação de forma humana, clara e segura.",
    heroDescription: "Seja para conferir os cálculos de sua demissão, tirar dúvidas sobre horas extras acumuladas ou entender como funciona a rescisão devido a falhas do empregador, conte com nossa análise individual e confidencial.",
    resolutionDescription: "O ambiente de trabalho deve ser pautado pela correção e pelo respeito mútuo. Auxiliamos você a entender cada detalhe da sua relação profissional, revisando detalhadamente as verbas da sua rescisão, horas cumpridas, intervalos e o registro correto da carteira de trabalho, priorizando sempre um diálogo transparente e sem termos complicados.",
    situationsTitle: "Situações reais do dia a dia no trabalho que analisamos com você",
    situations: [
      "Conferência detalhada e cálculo de todos os valores apresentados no termo de rescisão de contrato",
      "Horas extras cumpridas na rotina que não foram devidamente compensadas ou pagas pela empresa",
      "Atividade continuada com horários e subordinação direta sem que tenha sido feito o registro em carteira",
      "Atrasos recorrentes no pagamento mensal dos salários ou ausência de depósitos na conta do FGTS",
      "Exercício frequente de funções diferentes ou acúmulo de tarefas além do acordado no contrato",
      "Dúvidas claras sobre as regras e o cabimento legal de demissões sob justificativa de justa causa",
      "Ausência de pagamento de adicionais garantidos em lei, como de periculosidade, insalubridade ou noturno",
      "Exposição a cobranças excessivas, tratamento inadequado ou constrangimentos na empresa (assédio moral)",
      "Orientações seguras sobre o pedido de rescisão indireta quando o empregador descumpre as regras do contrato"
    ],
    forWhomDescription: "Esta orientação jurídica informativa destina-se a trabalhadores, prestadores e ex-colaboradores que buscam clareza sobre suas condições contratuais ou que enfrentam impasses no acerto de contas.",
    forWhomItems: [
      "Trabalhadores recentemente desligados que desejam conferir a exatidão das verbas rescisórias recebidas.",
      "Profissionais submetidos a jornadas extensas recorrentes que querem verificar se o banco de horas está regular.",
      "Prestadores de serviço sem registro em carteira que precisam avaliar se preenchem os critérios do vínculo empregatício.",
      "Pessoas expostas a atividades nocivas à saúde que buscam esclarecimentos sobre adicionais não pagos."
    ],
    notForWhomDescription: "Nossa atuação informativa foca exclusivamente no trabalhador enquanto pessoa física, oferecendo análise personalizada para cada histórico. Não prestamos assessoria ou defesa a redes de grandes corporações ou marcas envolvidas em litígios institucionais.",
    howWeHelpTitle: "Como o escritório auxilia no seu caso",
    howWeHelpSubtitle: "Avaliamos suas dúvidas de maneira atenta e descomplicada, traduzindo as previsões da lei para que você entenda sua situação real de forma amigável e segura.",
    howWeHelp: [
      {
        title: "Leitura do Histórico",
        desc: "Análise cuidadosa da sua rotina de trabalho para verificar o que de fato aconteceu no dia a dia da sua atividade."
      },
      {
        title: "Esclarecimento Direto",
        desc: "Explicação em tom simples e acessível das regras aplicáveis ao seu setor e Convenção Coletiva de Trabalho."
      },
      {
        title: "Conferência Documental",
        desc: "Exame minucioso de recibos, extratos de FGTS, folhas de ponto e carteira para apontar incorreções em valores."
      },
      {
        title: "Caminhos Consensuais",
        desc: "Direcionamento focado em atitudes corretas e éticas, priorizando caminhos amigáveis que evitem discussões judiciais desgastantes."
      }
    ],
    timelineTitle: "Etapas do atendimento informativo",
    timelineDescription: "Projetamos um fluxo de contato simples, pautado pela mútua confiança, respeito ao sigilo das suas informações e total discrição.",
    timelineSteps: [
      {
        title: "Início de Conversa",
        desc: "Você entra em contato conosco por mensagem direta no WhatsApp ou enviando o formulário de e-mail deste site."
      },
      {
        title: "Apresentação de Perguntas",
        desc: "Você descreve as suas principais dúvidas, o tempo de trabalho na empresa e as tarefas reais que desempenhava."
      },
      {
        title: "Organização dos Papéis",
        desc: "Auxiliamos você a identificar quais documentos são necessários (como carteira, recibos e conversas) para analisar seu histórico."
      },
      {
        title: "Balanço e Esclarecimento",
        desc: "Com as informações organizadas, explicamos de forma transparente os seus reais direitos previstos em lei."
      }
    ],
    faqSectionTitle: "Perguntas frequentes sobre direitos do trabalhador",
    faqs: [
      {
        q: "Qual é o tempo limite para buscar os meus direitos de trabalho na Justiça?",
        a: "A legislação estabelece que o trabalhador tem o prazo de até 2 anos após o término do contrato de trabalho para propor uma ação judicial. Nesse caso, é permitido requerer os direitos não pagos dos últimos 5 anos de contratação. Decorrido o prazo de 2 anos, perde-se o direito de reivindicar."
      },
      {
        q: "Trabalhei vários meses sem carteira assinada. Eu perco as minhas garantias legais?",
        a: "Não. Na relação de trabalho, o que vale é a prática do dia a dia. Se você prestava serviços de forma contínua, pessoal, sob ordens e mediante salário, os critérios do vínculo estão presentes e o registro deve ser formalizado para garantir o recebimento de férias, 13º e FGTS."
      },
      {
        q: "Como posso comprovar que fazia horas extras se o registro de ponto era preenchido de forma errada?",
        a: "A jornada extra de trabalho pode ser demonstrada por outras provas além dos cartões de ponto, como conversas de WhatsApp por escrito, e-mails enviados fora do horário do expediente, relatórios internos ou por depoimentos de testemunhas que acompanhavam a rotina."
      },
      {
        q: "O que é e como funciona a dispensa por rescisão indireta?",
        a: "A rescisão indireta funciona como uma 'rescisão por culpa da empresa'. Quando o empregador comete falhas graves, como atrasar com frequência salários, não depositar o FGTS ou expor o colaborador a humilhações, o trabalhador pode solicitar o rompimento contratual recebendo todos os valores devidos na demissão sem justa causa."
      },
      {
        q: "A análise do meu caso e o envio de documentos podem ser feitos de forma online?",
        a: "Sim. Para sua maior praticidade, o atendimento preliminar e o recebimento das imagens dos documentos ocorrem de forma digital, mantendo absoluto sigilo profissional sobre todos os seus dados."
      }
    ],
    formSubjects: [
      "Revisão e Conferência de Rescisão",
      "Dúvidas sobre Horas Extras",
      "Trabalho sem Carteira Registrada",
      "Dúvidas sobre Demissão e Justa Causa",
      "Problemas ou Constrangimentos na Empresa",
      "Esclarecimentos sobre Rescisão Indireta",
      "Outros Assuntos de Direito de Trabalho"
    ],
    defaultSubject: "Revisão e Conferência de Rescisão"
  },
  previdenciario: {
    tagline: "Direito Previdenciário",
    heroBadge: "PLANEJAMENTO E APOSENTADORIA",
    heroHeadline: "Quer planejar seu momento de aposentadoria ou tem dificuldades com algum benefício do INSS? Entenda sua situação de forma clara, objetiva e sem termos difíceis.",
    heroDescription: "Descubra qual é a regra de transição mais favorável para sua futura concessão de aposentadoria ou compreenda as alternativas legais em casos de pedidos negados ou suspensos pelo órgão previdenciário.",
    resolutionDescription: "A decisão sobre o momento ideal para solicitar sua aposentadoria é definitiva para o seu sustento. Conduzimos a análise de todo o seu histórico de pagamentos, auxiliando você a corrigir pendências que atrasam a concessão, a entender as diferentes regras em vigor e a apresentar suas solicitações com o suporte adequado de quem entende do assunto.",
    situationsTitle: "Situações comuns envolvendo o INSS que ajudamos a analisar de perto",
    situations: [
      "Dúvidas de qual das cinco regras de transição pós-Reforma da Previdência trará a melhor renda para você",
      "Pedidos de aposentadorias ou auxílios de saúde que foram indeferidos, negados ou suspensos pelo INSS",
      "Necessidade de corrigir erros, vínculos de trabalho faltantes ou salários zerados no extrato oficial CNIS",
      "Projeção de contribuições futuras para evitar recolher em valores incorretos ou em códigos inapropriados",
      "Dúvidas quanto às exigências de renda e laudos para solicitar o Benefício de Prestação Continuada (BPC/LOAS)",
      "Dificuldades em reunir documentos para comprovar tempos de atividade especial (insalubre), rural ou de pesca",
      "Atraso recorrente do INSS na análise de pedidos ou na resposta formal de recursos administrativos",
      "Orientações prévias e organização de documentos para a realização de perícias médicas da previdência",
      "Análise de regras jurídicas para avaliar a possibilidade de requerer a revisão de aposentadoria já concedida"
    ],
    forWhomDescription: "Esta orientação jurídica informativa destina-se a segurados do INSS, profissionais liberais, autônomos e pessoas que necessitam de suporte em benefícios de saúde ou amparo da assistência social.",
    forWhomItems: [
      "Trabalhadores próximos de preencher a idade mínima ou o tempo de contribuição exigido por lei.",
      "Pessoas com problemas de saúde duradouros que buscam analisar se atendem às exigências do auxílio por incapacidade.",
      "Idosos em vulnerabilidade de renda ou pessoas com deficiência que pretendem compreender os critérios do LOAS.",
      "Dependentes e cônjuges que buscam orientações para reunir os papéis exigidos no pedido de pensão por morte."
    ],
    notForWhomDescription: "Nossos esclarecimentos amparam exclusivamente o Regime Geral de Previdência Social (INSS) e amparos assistenciais (BPC). Dessa forma, não prestamos assessoria a fundações ou planos corporativos de previdência privada fechada.",
    howWeHelpTitle: "Como realizamos sua análise previdenciária",
    howWeHelpSubtitle: "Estudamos o seu tempo de contribuição com rigor técnico e cuidado, traduzindo as regras de pedágio e fatores de cálculo para que você compreenda tudo sem complicação.",
    howWeHelp: [
      {
        title: "Correção do Extrato",
        desc: "Examinamos o seu extrato de contribuições (CNIS) para apontar pendências de valores que possam prejudicar o seu cálculo."
      },
      {
        title: "Cálculo de Regras",
        desc: "Projetamos o seu histórico de trabalho nas novas regras da reforma, identificando qual alternativa trará menor redução financeira."
      },
      {
        title: "Organização de Laudos",
        desc: "Auxiliamos você a agrupar atestados médicos, receitas e exames de forma adequada para apresentar no dia da perícia."
      },
      {
        title: "Suporte de Documentação",
        desc: "Orientamos sobre as carteiras de trabalho antigas, contratos e certidões necessárias para que seu pedido corra sem exigências."
      }
    ],
    timelineTitle: "Como funciona a conversa informativa",
    timelineDescription: "Proporcionamos um contato acolhedor e simples, preservando inteiramente o sigilo profissional de suas informações desde o início.",
    timelineSteps: [
      {
        title: "Agendamento Prévio",
        desc: "Você entra em contato enviando suas principais dúvidas pelo WhatsApp ou pelo canal de e-mail deste site."
      },
      {
        title: "Recebimento do Extrato",
        desc: "Organizamos os seus dados, orientando você sobre como baixar o extrato CNIS no aplicativo oficial do órgão."
      },
      {
        title: "Exame do Histórico",
        desc: "Estudamos suas datas de contribuição, idades atingidas e a existência de tempos especiais a serem convertidos."
      },
      {
        title: "Orientação e Direcionamento",
        desc: "Apresentamos por escrito as melhores alternativas de lei para o seu caso, indicando quais as atitudes mais seguras."
      }
    ],
    faqSectionTitle: "Perguntas de rotina sobre aposentadorias e auxílios",
    faqs: [
      {
        q: "O INSS negou meu pedido de auxílio-doença mesmo com atestado médico recomendando o repouso. O que fazer?",
        a: "Os atestados de consultórios particulares, embora sejam extremamente necessários, não obrigam legalmente o INSS a deferir o benefício. Se ele foi negado na via administrativa, o segurado pode apresentar um recurso escrito ao próprio INSS ou levar o caso à análise judicial, onde passará por um exame físico agendado com médico perito nomeado pela Justiça."
      },
      {
        q: "Quais os requisitos reais para pleitear o Benefício de Prestação Continuada (BPC/LOAS)?",
        a: "O BPC/LOAS é um amparo de assistência social pago pelo governo. Ele exige do beneficiário idoso a idade mínima de 65 anos, e da pessoa com deficiência uma limitação física ou mental de longo prazo. Além disso, a lei impõe o cadastramento atualizado no Cadastro Único (CadÚnico) e a prova de baixa renda do grupo do lar."
      },
      {
        q: "O que é o planejamento de aposentadoria e qual a sua finalidade prática?",
        a: "O planejamento é uma simulação matemática que cruza todas as suas contribuições antigas com as novas regras criadas em 2019. Ele previne que você peça seu benefício antes da hora ou em regras menos favoráveis, evitando perdas de renda definitivas por toda a sua vida."
      },
      {
        q: "Existe um prazo máximo para que o INSS decida sobre concessões de benefícios?",
        a: "Sim. A legislação regulamentar prevê prazos formais para resposta dos pedidos, variando entre 45 e 90 dias úteis dependendo da modalidade. Havendo atrasos excessivos e que não possuam qualquer justificativa razoável, é pertinente utilizar medidas formais contra a demora."
      },
      {
        q: "É possível realizar essa análise do meu caso inteiramente pela internet?",
        a: "Perfeitamente. O estudo de dados, a entrega de documentos e as orientações iniciais sobre as regras do INSS podem ser realizados de forma 100% digital e prática, garantindo absoluto segredo profissional."
      }
    ],
    formSubjects: [
      "Planejamento e Simulação de Aposentadoria",
      "Análise de Benefício Negado pelo INSS",
      "Orientações sobre BPC / LOAS",
      "Correção de Erros no Extrato CNIS",
      "Tempo de Trabalho Especial ou Especializado",
      "Dúvidas sobre Auxílio por Incapacidade",
      "Dúvidas Gerais de Direito Previdenciário"
    ],
    defaultSubject: "Planejamento e Simulação de Aposentadoria"
  },
  civel: {
    tagline: "Direito Cível",
    heroBadge: "RELAÇÕES CIVIS E CONTRATOS",
    heroHeadline: "Precisa de orientação clara sobre contratos, cobranças ou divisão consensual de bens? Esclareça sua situação de forma simples e humana.",
    heroDescription: "Evite conflitos contratuais e desgastes pessoais. Encontre suporte atencioso para compreender termos de compra e venda de imóveis, partilhas consensuais de bens diretamente em cartório ou notificações extrajudiciais de forma pacífica e segura.",
    resolutionDescription: "O Direito Cível organiza as obrigações fundamentais das relações privadas e familiares. Atuamos de forma atenta e individualizada para ajudar você a mediar conflitos materiais, resolver pendências contratuais, redigir acordos sob medida e providenciar inventários em cartório de forma amigável, transparente e mantendo o perfeito equilíbrio entre as partes.",
    situationsTitle: "Situações do cotidiano cível e relações de consumo em que podemos ajudar",
    situations: [
      "Dúvidas persistentes sobre deveres, multas e garantias previstos em contratos de prestação de serviços",
      "Inseguranças em cláusulas contratuais na realização de compra ou venda de terrenos e imóveis",
      "Pendência de valores em atraso para recebimento (como contratos descumpridos, notas promissórias ou cheques)",
      "Cobranças de taxas abusivas ou indevidas e falhas graves de atendimento em compras de grande valor",
      "Inclusão indevida ou sem aviso prévio do seu CPF em cadastros de proteção ao crédito (SPC ou Serasa)",
      "Necessidade de realizar o inventário consensual ou partilha amigável de bens da família diretamente em cartório",
      "Necessidade de redigir um contrato personalizado para resguardar adequadamente um acordo do dia a dia",
      "Envio de notificações formais (notificação extrajudicial) para constituir mora ou buscar soluções amigáveis",
      "Desentendimentos sobre obrigações civis privadas, conflitos de vizinhança ou necessidade de reparação por danos"
    ],
    forWhomDescription: "Esta orientação jurídica informativa destina-se a pessoas, profissionais autônomos e famílias que buscam segurança em negociações materiais, termos contratuais e transições amigáveis de bens.",
    forWhomItems: [
      "Quem realiza a compra de imóveis e deseja avaliar os riscos contratuais envolvidos antes de assinar.",
      "Membros de famílias que se encontram em pleno consenso e querem realizar o inventário em cartório.",
      "Consumidores afetados por cobranças abusivas de empresas prestadoras de serviço ou negativações sem aviso.",
      "Credores de títulos que preferem regularizar o recebimento de valores em atraso de forma respeitosa."
    ],
    notForWhomDescription: "Nossa atuação consultiva nesta área é estritamente voltada a contratos civis, inventários consensuais e obrigações privadas cotidianas. Não atuamos em divórcios litigiosos destrutivos, disputas graves de guarda na Vara de Família ou na vertente de Direito Penal e Criminal.",
    howWeHelpTitle: "Como o escritório auxilia nas suas relações civis",
    howWeHelpSubtitle: "Buscamos avaliar o seu problema com foco em soluções práticas, prevenindo longas batalhas judiciais de forma sustentável para o seu patrimônio.",
    howWeHelp: [
      {
        title: "Varredura de Cláusulas",
        desc: "Examinamos com atenção os termos de propostas e contratos para apontar multas excessivas ou obrigações injustas."
      },
      {
        title: "Soluções Extrajudiciais",
        desc: "Instruímos no envio de notificações e formulação de recibos para resolver passivos e cobranças de forma pacífica."
      },
      {
        title: "Relações de Consumo",
        desc: "Esclarecemos sobre os prazos de cancelamento, direito a garantias e providências contra cobranças de má-fé."
      },
      {
        title: "Inventários em Cartório",
        desc: "Preparamos toda a organização dos papéis para que a partilha amigável ocorra perante o cartório com agilidade."
      }
    ],
    timelineTitle: "Etapas do atendimento consultivo",
    timelineDescription: "Seguimos procedimentos de absoluto sigilo e ética profissional para orientar o seu caso com total respeito às suas particularidades.",
    timelineSteps: [
      {
        title: "Agendamento Inicial",
        desc: "Você inicia o contato por e-mail ou mandando mensagem rápida em nosso número de WhatsApp de forma protegida."
      },
      {
        title: "Apresentação do Problema",
        desc: "Você nos descreve como foi firmado o acerto, se há documentos escritos assinados ou conversas guardadas."
      },
      {
        title: "Verificação Legal",
        desc: "Estudamos o contrato apresentado para verificar como as leis civis e de consumo tratam a sua situação específica."
      },
      {
        title: "Orientações e Passos",
        desc: "Explicamos de forma direta se o melhor caminho envolve termos amigáveis, notificação extrajudicial ou acertos de quitação."
      }
    ],
    faqSectionTitle: "Dúvidas frequentes sobre contratos, acordos e bens",
    faqs: [
      {
        q: "Quais os requisitos reais para realizar um inventário de bens diretamente em cartório?",
        a: "Para viabilizar o inventários extrajudicial diretamente em tabelionato de notas, é exigido por lei que todos os herdeiros sejam maiores, plenamente capazes e estejam em completo consenso sobre a divisão amigável dos bens. Não deve haver testamento ativo, e a representação de advogado(a) é obrigatória por lei."
      },
      {
        q: "Meu nome foi incluído incorretamente em cadastros de restrição ao crédito. O que posso fazer?",
        a: "A inclusão indevida nos cadastros do SPC/Serasa, motivada por faturas pagas, erro de portabilidade ou falta de aviso antecipado, constitui prática passível de remoção do registro restritivo e eventual pedido de indenização civil por danos morais."
      },
      {
        q: "Por que não é recomendado assinar acordos e contratos usando apenas modelos prontos de internet?",
        a: "Os modelos genéricos baixados na internet omitem cláusulas de segurança vitais, utilizam artigos de lei defasados ou revogados e não tratam dos riscos pontuais do seu negócio real. Um contrato personalizado delimita com clareza os limites e deveres, evitando discussões penosas."
      },
      {
        q: "Como a notificação extrajudicial ajuda a resolver um descumprimento de acordo sem envolver o juiz?",
        a: "A notificação extrajudicial é um documento oficial enviado por escrito ao devedor. Ela formaliza a existência da pendência financeira de forma indiscutível, concede um prazo razoável para acerto amigável e indica as consequências do não pagamento, possuindo altíssima eficácia na composição de acordos de forma barata e rápida."
      },
      {
        q: "A avaliação de riscos de um contrato de compra e venda imobiliária pode ser feita de forma remota?",
        a: "Com certeza. Através de canais digitais e com total segurança, você pode encaminhar imagens nítidas das folhas do seu contrato para que analisemos suas cláusulas sob reserva profissional antes de você efetuar sua assinatura."
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
