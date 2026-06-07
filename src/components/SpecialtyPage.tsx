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
    heroBadge: "ORIENTAÇÃO AO TRABALHADOR",
    heroHeadline: "Tem dúvidas sobre o acerto de contas ou acha que seus direitos de trabalho não foram pagos corretamente? Esclareça sua situação de forma simples, humana e segura.",
    heroDescription: "Seja para conferir os valores da sua demissão, tirar dúvidas sobre horas extras ou saber se seu contrato está de acordo com as regras, conte com uma análise atenta de cada detalhe do seu histórico profissional com absoluto sigilo.",
    resolutionDescription: "A relação de trabalho deve ser equilibrada e respeitar os limites previstos em lei. Atuamos de forma atenta e individualizada para ajudar você a compreender sua situação jurídica com clareza, seja conferindo as parcelas do termo de rescisão, avaliando a regularidade de jornadas ou orientando sobre o andamento e o cumprimento de cada direito em vigor.",
    situationsTitle: "Situações comuns do dia a dia no trabalho que analisamos",
    situations: [
      "Cálculo e conferência dos valores informados no termo de rescisão (rescisão do contrato)",
      "Horas extras prestadas com frequência que não foram devidamente pagas ou compensadas",
      "Trabalho realizado de forma frequente e subordinada sem o registro em carteira (trabalho informal)",
      "Atrasos seguidos no pagamento do salário ou ausência de depósito mensal na conta do FGTS",
      "Acúmulo de tarefas diferentes ou desvio para uma função diferente da contratada originalmente",
      "Dúvidas técnicas sobre o funcionamento, direitos e cabimento de demissão por justa causa",
      "Não recebimento de adicionais garantidos em lei, como insalubridade, periculosidade ou noturno",
      "Ambiente profissional inadequado, hostilidades constantes ou desgaste emocional (assédio moral)",
      "Dúvidas sobre o funcionamento e o pedido de rescisão indireta em razão de falhas graves do empregador"
    ],
    forWhomDescription: "Esta orientação jurídica é indicada a trabalhadores, prestadores de serviços e ex-colaboradores que buscam clareza sobre suas regras de trabalho, valores devidos ou se depararam com desentendimentos contratuais.",
    forWhomItems: [
      "Quem foi desligado da empresa recentemente e deseja conferir a exatidão das verbas rescisórias.",
      "Profissionais que realizam jornadas prolongadas recorrentes e querem verificar se as horas extras estão corretas.",
      "Quem prestou serviços contínuos sem registro em carteira e deseja avaliar se há direito ao reconhecimento do vínculo.",
      "Trabalhadores expostos a atividades desgastantes ou nocivas à saúde que buscam esclarecimentos sobre adicionais."
    ],
    notForWhomDescription: "Esta seção é dedicada exclusivamente à orientação informativa do trabalhador enquanto pessoa física. Não realizamos consultoria empresarial ou defesa de grandes corporações, focando nossa atenção no estudo de cada histórico de forma singular.",
    howWeHelpTitle: "Como funciona a nossa análise profissional",
    howWeHelpSubtitle: "A avaliação de cada caso de trabalho é conduzida de forma humana, transparente e baseada nas regras vigentes, trazendo clareza para que você compreenda sua situação de forma prática.",
    howWeHelp: [
      {
        title: "Estudo do Caso",
        desc: "Análise cuidadosa do seu histórico profissional para identificar possíveis falhas ou desrespeito às regras trabalhistas."
      },
      {
        title: "Esclarecimento Prático",
        desc: "Explicação em tom simples e de fácil entendimento das regras aplicáveis ao seu cargo, convenção coletiva e setor."
      },
      {
        title: "Conferência de Documentos",
        desc: "Análise detalhada de termos de rescisão (TRCT), holerites, extratos do FGTS e cartões de frequência para verificar irregularidades."
      },
      {
        title: "Orientação Preventiva",
        desc: "Direcionamento focado em atitudes éticas e seguras, priorizando caminhos amigáveis e soluções que evitem litígios desgastantes."
      }
    ],
    timelineTitle: "Como funciona o atendimento informativo",
    timelineDescription: "O fluxo de comunicação é desenhado de forma simples, descomplicada e voltado inteiramente a resguardar sua privacidade e sigilo.",
    timelineSteps: [
      {
        title: "Agendamento Inicial",
        desc: "Você entra em contato de forma reservada através do formulário de e-mail ou do nosso link de WhatsApp."
      },
      {
        title: "Descrição da Situação",
        desc: "Você nos apresenta um resumo contendo o tempo de trabalho na empresa, a função que exercia e sua dúvida principal."
      },
      {
        title: "Exame das Condições",
        desc: "Avaliamos as características da sua situação trabalhista e indicamos quais os papéis e documentos essenciais a separar."
      },
      {
        title: "Parecer de Orientação",
        desc: "Com as informações organizadas, explicamos de forma transparente a sua situação contratual e as alternativas legais aplicáveis."
      }
    ],
    faqSectionTitle: "Dúvidas comuns respondidas sob a ótica da lei",
    faqs: [
      {
        q: "Qual é o tempo limite para buscar os meus direitos trabalhistas na Justiça?",
        a: "A legislação estabelece que o trabalhador tem o prazo de até 2 anos após o término do contrato de trabalho para entrar com um processo. Nesse processo, é permitido requerer os valores pendentes referentes aos últimos 5 anos de contratação."
      },
      {
        q: "Trabalhei sem carteira assinada. Eu também tenho as garantias da CLT?",
        a: "Sim. Se você prestava serviços de forma frequente, recebendo ordens e salários, os requisitos do vínculo de emprego estão presentes. Comprovada essa situação de fato, o registro em carteira deve ser feito e os direitos trabalhistas (férias, FGTS e 13º salário) são devidos."
      },
      {
        q: "Como posso comprovar as horas extras se o registro de ponto não marcava os horários corretos?",
        a: "As horas trabalhadas além do horário normal podem ser comprovadas por meio de depoimentos de testemunhas que acompanhavam a rotina, registros de mensagens eletrônicas de cobrança, e-mails corporativos fora do expediente ou relatórios de tarefas."
      },
      {
        q: "Existe um prazo máximo para que a empresa realize o acerto e pague as verbas da demissão?",
        a: "Sim. O pagamento integral da rescisão e a liberação das guias (para saque do FGTS e seguro-desemprego) devem ocorrer no prazo máximo de até 10 dias corridos, contados a partir do encerramento do contrato. O descumprimento gera direito a uma multa de um salário em favor do trabalhador."
      },
      {
        q: "É possível realizar essa verificação e o primeiro atendimento de forma online?",
        a: "Perfeitamente. O contato inicial por vias digitais ou WhatsApp oferece rapidez para o esclarecimento de dúvidas e permite o envio prático de fotografias dos holerites e termo de rescisão com completo sigilo e discrição."
      }
    ],
    formSubjects: [
      "Conferência de Verbas Rescisórias",
      "Esclarecimento sobre Horas Extras",
      "Trabalho sem Carteira Assinada",
      "Dúvidas sobre Demissão por Justa Causa",
      "Problemas com Ambiente de Trabalho / Assédio",
      "Orientações sobre Rescisão Indireta",
      "Outras Dúvidas de Direito Trabalhista"
    ],
    defaultSubject: "Conferência de Verbas Rescisórias"
  },
  previdenciario: {
    tagline: "Direito Previdenciário",
    heroBadge: "PLANEJAMENTO E APOSENTADORIA",
    heroHeadline: "Tem dúvidas sobre o seu tempo de contribuição ou quer planejar sua futura aposentadoria? Esclareça seu caso com uma análise individualizada e cuidadosa.",
    heroDescription: "A aproximação do momento de se aposentar ou a necessidade de requerer um benefício exige um estudo atento do histórico de pagamentos, evitando que você faça seu pedido em uma regra desfavorável ou menos vantajosa.",
    resolutionDescription: "O amparo da previdência social é fundamental em momentos de transição, maturidade e cuidados com a saúde. Nosso escritório conduz a análise minuciosa de cada histórico de contribuição, auxiliando você a entender as diferentes regras criadas pela Reforma da Previdência, planejar os recolhimentos futuros e organizar a documentação com total clareza e respeito.",
    situationsTitle: "Situações comuns do dia a dia em que se recomenda analisar seu histórico previdenciário",
    situations: [
      "Incerteza sobre em qual regra de transição pós-Reforma da Previdência você se enquadra",
      "Aposentadoria, auxílio por incapacidade temporária (auxílio-doença) ou pensão por morte indeferidos pelo INSS",
      "Necessidade de corrigir erros, lacunas ou pendências no seu extrato oficial de contribuições (CNIS)",
      "Planejamento de recolhimentos futuros para projetar as melhores estimativas para sua aposentadoria",
      "Dúvidas sobre as condições e requisitos legais para requerer o Benefício de Prestação Continuada (BPC/LOAS)",
      "Dificuldades em reunir os documentos para comprovação de tempo de contribuição especial, rural ou de pesca",
      "Demora excessiva do INSS para emitir um posicionamento formal no seu processo administrativo",
      "Dúvidas e orientações preliminares sobre a perícia médica em auxílios por incapacidade",
      "Avaliação de viabilidade jurídica para revisão de benefícios de aposentadoria já concedidos pelo INSS"
    ],
    forWhomDescription: "Esta orientação técnica destina-se a segurados do INSS, trabalhadores autônomos, profissionais de diversas áreas e idosos ou pessoas com deficiência que necessitam de amparo previdenciário e buscam clareza jurídica em seus pedidos.",
    forWhomItems: [
      "Segurados que estão próximos de atingir a idade ou as exigências de tempo de contribuição para se aposentar.",
      "Pessoas afastadas por problemas de saúde de longo prazo que buscam compreender os critérios do benefício por incapacidade.",
      "Idosos em vulnerabilidade social ou pessoas com impedimentos de saúde que desejam informações sobre o BPC/LOAS.",
      "Familiares e dependentes que precisam de orientações seguras sobre o funcionamento da pensão por morte."
    ],
    notForWhomDescription: "Nossos esclarecimentos informativos tratam puramente do Regime Geral da Previdência Social (INSS) e das regras da assistência social (LOAS). Sendo assim, não realizamos estudos sobre planos corporativos fechados de previdência privada.",
    howWeHelpTitle: "Como funciona a nossa análise previdenciária",
    howWeHelpSubtitle: "A análise do seu tempo de contribuição é desenvolvida sob rigor ético e olhar atencioso, trazendo clareza para que o segurado saiba as reais regras de lei que amparam seu caso.",
    howWeHelp: [
      {
        title: "Regularização de Inconsistências",
        desc: "Exame cuidadoso do extrato de contribuições (CNIS) para apontar recolhimentos abaixo do mínimo, lacunas e solicitar retificações."
      },
      {
        title: "Orientação de Transição",
        desc: "Simulação do seu tempo trabalhado nas diferentes regras pós-reforma para ajudar você a identificar o momento mais adequado de pedir o benefício."
      },
      {
        title: "Análise de Laudos de Saúde",
        desc: "Triagem de atestados, laudos médicos, receitas e exames de saúde para auxiliar na comprovação necessária em benefícios por incapacidade."
      },
      {
        title: "Apoio Técnico",
        desc: "Acompanhamento das decisões administrativas do INSS e instrução clara sobre os documentos que devem ser apresentados."
      }
    ],
    timelineTitle: "Como funciona o atendimento informativo",
    timelineDescription: "O fluxo de conversa é projetado para acolher suas dúvidas de forma humana, transparente e com respeito ao segredo profissional.",
    timelineSteps: [
      {
        title: "Agendamento Reservado",
        desc: "Você inicia o contato por e-mail ou mandando mensagens pelo WhatsApp de forma totalmente protegida."
      },
      {
        title: "Relato do Histórico",
        desc: "Você nos apresenta os seus dados básicos: tempo trabalhado, idade e se já possui algum benefício em análise ou negado."
      },
      {
        title: "Instrução de Documentos",
        desc: "Indicamos quais são as documentações essenciais (carteiras de trabalho antigas, carnês ou laudos) adequadas para a análise."
      },
      {
        title: "Estudo e Recomendações",
        desc: "Analisamos as suas informações de forma individualizada e explicamos quais são as reais alternativas e caminhos legais sob as regras atuais."
      }
    ],
    faqSectionTitle: "Dúvidas frequentes respondidas sob a ótica legal",
    faqs: [
      {
        q: "O INSS negou o meu pedido de auxílio-doença mesmo com recomendação médica. Como devo proceder?",
        a: "No caso de indeferimento de benefício por incapacidade na via administrativa, o segurado pode apresentar um recurso perante o próprio INSS ou optar por levar a discussão à via judicial. Na esfera judicial, é realizada uma perícia médica isenta, conduzida por profissional nomeado pela Justiça."
      },
      {
        q: "Quem tem direito de requerer o Benefício de Prestação Continuada (BPC/LOAS)?",
        a: "O BPC destina-se a idosos a partir de 65 anos de idade ou pessoas com deficiência que comprovem limitação de longo prazo. É exigido estar inscrito e regularizado no CadÚnico do município e demonstrar critérios de baixa renda familiar."
      },
      {
        q: "O que é e para que serve a elaboração do planejamento previdenciário?",
        a: "É uma simulação detalhada baseada em todo o seu histórico contributivo perante o INSS. O planejamento previne decisões precipitadas e indica de forma segura qual das regras de transição vigentes trará o cálculo mais adequado e seguro à sua realidade de vida."
      },
      {
        q: "Existe um prazo legal para que o INSS dê uma resposta formal ao pedido de benefício?",
        a: "Sim. A legislação previdenciária estabelece prazos estimados (de 45 a 90 dias dependendo do tipo de benefício) para decisão administrativa. Havendo atraso desproporcional e sem justificativa razoável, é cabível tomar providências legais para exigir a respectiva análise fática."
      },
      {
        q: "A documentação e a simulação das regras podem ser feitas de forma remota?",
        a: "Com certeza. O atendimento inicial, o compartilhamento do extrato do CNIS e o envio das fotografias dos documentos ocorrem de forma digital e prática, sob profundo respeito à ética profissional e privacidade dos envolvidos."
      }
    ],
    formSubjects: [
      "Simulação de Tempo de Aposentadoria",
      "Planejamento Previdenciário Completo",
      "Benefício Negado ou Descontinuado pelo INSS",
      "Orientações sobre BPC / LOAS",
      "Regularização e Pendências no CNIS",
      "Esclarecimentos sobre Auxílio por Incapacidade",
      "Assuntos Diversos de Direito Previdenciário"
    ],
    defaultSubject: "Simulação de Tempo de Aposentadoria"
  },
  civel: {
    tagline: "Direito Cível e Relações de Consumo",
    heroBadge: "RELAÇÕES CIVIS E CONTRATUAIS",
    heroHeadline: "Precisa resolver questões de contratos, cobranças ou um inventário consensual de forma amigável? Esclareça sua situação de forma segura, com orientação clara e humana.",
    heroDescription: "A condução inadequada de compromissos ou a falta de clareza das obrigações assumidas podem ocasionar problemas no dia a dia. Encontre orientações profissionais focadas em harmonizar acordos e manter relações pacíficas.",
    resolutionDescription: "O Direito Cível organiza as obrigações fundamentais e preserva a destinação tranquila de bens pessoais ou familiares. Nosso escritório atua no esclarecimento de cláusulas de compra e venda de imóveis, na cobrança fundamentada de valores pendentes e na realização de inventários consensuais diretamente em cartório, priorizando caminhos amigáveis e seguros.",
    situationsTitle: "Situações do dia a dia cível em que a nossa orientação pode ajudar",
    situations: [
      "Dúvidas quanto ao cumprimento de termos e cláusulas em contratos de prestação de serviços",
      "Insegurança em negociações e assinaturas de termos de compra e venda de imóveis",
      "Pendência financeira para recebimento de valores em atraso (cheques ou notas promissórias)",
      "Cobranças indevidas de serviços, falhas em compras de valor expressivo e direitos do consumidor",
      "Inserção injustificada do CPF em cadastros de negativados por erros das operadoras ou bancos",
      "Dúvidas e necessidade de orientações para realizar o inventário consensual ou partilha amigável de bens",
      "Necessidade de elaborar um contrato personalizado para resguardar um acordo do cotidiano",
      "Uso de notificações extrajudiciais para formalizar cobranças ou buscar acordos de forma amigável",
      "Problemas relacionados a obrigações cotidianas, desentendimentos no bairro ou danos em propriedade"
    ],
    forWhomDescription: "Este canal informativo foi planejado para orientar cidadãos e empreendedores autônomos que desejam segurança ao assinar compromissos contratuais e buscam soluções equilibradas para pendências materiais ou sucessões familiares.",
    forWhomItems: [
      "Quem realiza a compra ou venda de imóveis e deseja avaliar os riscos e cláusulas contratuais antes da assinatura.",
      "Membros de famílias que se encontram em acordo e desejam formalizar o inventário diretamente em cartório.",
      "Consumidores que enfrentam problemas em compras importantes ou negativações de crédito sem notificação.",
      "Credores de títulos que preferem solucionar a cobrança de débitos pendentes de forma respeitosa e extrajudicial."
    ],
    notForWhomDescription: "Nossa atuação informativa nessa área se atém a contratos, sucessões extrajudiciais amigáveis e relações cotidianas privadas. Não realizamos consultoria em divórcios litigiosos graves, disputas de guarda na Vara de Família ou contendas penais e criminais.",
    howWeHelpTitle: "Como atua nosso suporte profissional",
    howWeHelpSubtitle: "Buscamos avaliar o seu problema priorizando caminhos práticos e extrajudiciais, minimizando conflitos prolongados e reduzindo as preocupações cotidianas.",
    howWeHelp: [
      {
        title: "Análise de Riscos",
        desc: "Analisamos minuciosamente as cláusulas e termos contratuais para apontar ambiguidades, condições desequilibradas ou riscos de litígio."
      },
      {
        title: "Soluções Consensuais",
        desc: "Instruímos na elaboração de acordos, termos de quitação e acordos extrajudiciais para mediar soluções sem desgaste judicial."
      },
      {
        title: "Relações de Consumo",
        desc: "Esclarecemos sobre os caminhos adequados para exigir direitos de garantia, devolução ou cancelamento de restrições indevidas."
      },
      {
        title: "Procedimentos em Cartório",
        desc: "Orientamos sobre as etapas e documentações necessárias para partilhas e inventários consensuais extrajudiciais."
      }
    ],
    timelineTitle: "Como funciona o nosso atendimento",
    timelineDescription: "Seguimos procedimentos de absoluto sigilo e discrição profissional para conduzir e orientar o seu caso com total respeito.",
    timelineSteps: [
      {
        title: "Agendamento por WhatsApp ou E-mail",
        desc: "Você entra em contato e agenda uma orientação inicial de forma rápida e segura."
      },
      {
        title: "Descrição do seu Caso",
        desc: "Você descreve as principais características do contrato, cobrança ou inventário de bens."
      },
      {
        title: "Exame das Condições",
        desc: "Fazemos uma leitura preliminar dos termos expostos para entender como a legislação civil trata da situação apresentada."
      },
      {
        title: "Recomendação de Passos",
        desc: "Explicamos de forma direta se o melhor caminho envolve termos amigáveis, notificação extrajudicial ou outras medidas adequadas."
      }
    ],
    faqSectionTitle: "Dúvidas comuns respondidas de forma simples",
    faqs: [
      {
        q: "Quais são as regras para que um inventário familiar possa ser feito de forma rápida em cartório?",
        a: "Para viabilizar o inventário extrajudicial diretamente em cartório, é exigido por lei que todos os herdeiros sejam plenamente capazes, de maior idade e estejam em perfeito acordo amigável com a divisão (consenso). Não deve haver testamento ativo, e a representação por advogada é um requisito obrigatório."
      },
      {
        q: "Tive meu nome inscrito indevidamente no SPC/SERASA por um erro. Eu tenho direito a reparação?",
        a: "Sim. A inscrição injustificada de uma pessoa em cadastros de inadimplentes, seja por serviço não contratado, erro de portabilidade ou falta de notificação de cobrança, constitui prática ilegal passível de ensejar a suspensão do registro e eventual reparação civil."
      },
      {
        q: "Quais os principais riscos de usar modelos genéricos e prontos de contratos baixados da internet?",
        a: "Modelos pré-formatados retirados da internet costumam omitir obrigações essenciais do acordo real, utilizam artigos de leis que já foram modificados e não estipulam multas válidas. Um contrato feito sob medida analisa as suas reais necessidades e previne desentendimentos."
      },
      {
        q: "Como a notificação extrajudicial ajuda a resolver um descumprimento de acordo?",
        a: "Ela serve para dar ciência formal ao devedor de maneira amigável, estabelecendo prazos definitivos para regularização e constituindo mora legal. É um instrumento pacífico e persuasivo para abrir negociação sem precisar envolver a Justiça."
      },
      {
        q: "O atendimento de análise inicial de um contrato pode ser realizado à distância?",
        a: "Perfeitamente. Através de canais eletrônicos ou WhatsApp, você pode compartilhar imagens de contratos e nos descrever o problema para que façamos a análise preliminar fática e jurídica com total sigilo e proteção das suas informações."
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
