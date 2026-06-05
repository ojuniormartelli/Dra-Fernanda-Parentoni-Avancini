/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article, SpecialtyDetail, Testimonial } from './types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'artigo-aposentadoria-tempo-contribuicao',
    category: 'Direito Previdenciário',
    title: 'Planejamento Previdenciário: como buscar um benefício mais adequado',
    excerpt: 'Organizar o histórico de contribuições e entender as regras aplicáveis pode fazer diferença no momento de pedir a aposentadoria ou outro benefício.',
    date: '15 de Maio de 2026',
    readTime: '5 min de leitura',
    image: 'https://picsum.photos/seed/retirement-law/800/450',
    content: 'A aposentadoria é um dos momentos mais importantes na vida do trabalhador. Contudo, após a Reforma da Previdência, muitos caminhos alternativos foram criados por meio das regras de transição. Sem um estudo prévio do histórico de contribuições, o segurado pode acabar escolhendo uma modalidade desvantajosa ou requerendo o benefício antes do momento ideal. O planejamento previdenciário analisa o tempo total de contribuição, os salários e as lacunas no cadastro administrativo para apontar a melhor alternativa legal, assegurando que o trabalhador receba o valor correto por direito.'
  },
  {
    id: 'artigo-verbas-rescisorias',
    category: 'Direito Trabalhista',
    title: 'Verbas Rescisórias: O que você deve receber ao sair do emprego?',
    excerpt: 'A rescisão do contrato de trabalho costuma gerar dúvidas sobre valores, prazos e direitos. Entenda os principais pontos que merecem atenção nesse momento.',
    date: '28 de Abril de 2026',
    readTime: '4 min de leitura',
    image: 'https://picsum.photos/seed/labor-law/800/450',
    content: 'O término da relação de trabalho exige atenção de ambos os lados. Na demissão sem justa causa, o trabalhador tem direito ao saldo de salário, aviso prévio, décimo terceiro proporcional, férias proporcionais com terço constitucional, além do levantamento do FGTS com a multa de 40%. É de suma importância verificar se as verbas reflexas, como horas extras habituais and adicionais devidos, foram devidamente computadas e adimplidas dentro do prazo legal de 10 dias após a rescisão.'
  },
  {
    id: 'artigo-contratos-civis-seguranca',
    category: 'Direito Cível',
    title: 'Dúvidas frequentes em contratos de compra e venda de imóveis',
    excerpt: 'A compra e venda de um imóvel exige cuidados importantes para reduzir riscos e evitar conflitos futuros. Veja alguns pontos que merecem atenção.',
    date: '10 de Abril de 2026',
    readTime: '5 min de leitura',
    image: 'https://picsum.photos/seed/civil-contract/800/450',
    content: 'Seja para alugar um imóvel, vender um bem de valor ou firmar uma prestação de serviço, o contrato verbal ou modelos genéricos de internet costumam gerar sérias dores de cabeça. Um contrato redigido sob medida estabelece os deveres, os prazos de cumprimento, as multas contratuais e as regras em caso de desistência de maneira clara e transparente. A assessoria cível prévia protege o patrimônio das partes e confere previsibilidade jurídica às obrigações cotidianas.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: 'Antônio de Oliveira',
    role: 'Comerciante Local',
    text: 'A Dra. Fernanda analisou meu tempo de contribuição de forma muito atenciosa e transparente. Com o estudo que ela fez, entendi exatamente o que faltava para minha aposentadoria e o valor correto do meu benefício.'
  },
  {
    name: 'Márcia Vasconcelos',
    role: 'Auxiliar Administrativa',
    text: 'Procurei o escritório para me orientar em uma rescisão trabalhista confusa. Fui atendida com muito respeito, paciência e clareza. Me senti acolhida e informada sobre os meus direitos em todo o momento.'
  },
  {
    name: 'Rita de Cássia',
    role: 'Produtora Rural',
    text: 'O atendimento com a Dra. Fernanda é sempre muito direto e humano. Ela nos auxiliou na regularização de contratos de arrendamento de terra e partilha de bens com extrema seriedade e atenção aos mínimos detalhes.'
  }
];

export const SPECIALTIES_DETAILS: Record<string, SpecialtyDetail> = {
  trabalhista: {
    id: 'trabalhista',
    title: 'Direito Trabalhista',
    shortDescription: 'Orientação clara para trabalhadores na defesa de seus direitos e suporte preventivo a empregadores locais buscando conformidade legislativa.',
    heroSubtitle: 'Atendimento humanizado e focado em resolver problemas de trabalho, assegurando verbas rescisórias, horas extras e o cumprimento justo da legislação trabalhista.',
    headerTitle: 'Direito Trabalhista',
    illustration: 'Briefcase',
    painPoints: [
      'Rescisão de contrato de trabalho sem o correto pagamento de aviso prévio, férias e proporcionalidade.',
      'Dúvidas sobre o recebimento de horas extraordinárias, banco de horas e intervalos de descanso não observados.',
      'Ausência de registro adequado na carteira de trabalho (CTPS) e falta de recolhimento do FGTS.',
      'Dúvidas sobre insalubridade e periculosidade em atividades industriais ou comerciais regionais.',
      'Insegurança de micro e pequenas empresas locais quanto a acertos demissionais e riscos de ações judiciais de trabalho.'
    ],
    solutions: [
      'Cálculo e cobrança de verbas rescisórias devidas em caso de demissão do trabalhador.',
      'Ações trabalhistas com fundamentação sólida para reconhecimento de direitos, horas extras e assédio.',
      'Assessoria e consultoria preventiva contínua ou pontual para empresas, evitando passivos judiciais trabalhistas.',
      'Defesa técnica em reclamatórias trabalhistas buscando equilíbrio e diminuição de riscos para o empregador.',
      'Análise de contratos de prestação de serviços civis e terceirizações sob a ótica da legislação trabalhista.'
    ],
    howItWorks: [
      'Entendimento das Circunvizinhanças: Conversa inicial acolhedora para que o cliente narre a rotina de trabalho ou a dificuldade da empresa.',
      'Análise Documental: Verificação detalhada de recibos, cartões de ponto, extratos de FGTS e outros comprovantes materiais de trabalho.',
      'Avaliação Transparente: Esclarecimento objetivo dos riscos operacionais e das verbas realmente de direito do cliente.',
      'Busca por Diálogo ou Atuação Judicial: Tentativa de resolução extrajudicial lícita e ágil, ou propositura de ação de forma técnica junto ao judiciário competente.'
    ],
    differentials: [
      {
        title: 'Presença e Acompanhamento Direto',
        description: 'Toda defesa ou parecer é estudado, redigido e acompanhado pessoalmente pela Dra. Fernanda de forma próxima e focada.'
      },
      {
        title: 'Linguagem Acessível e Simples',
        description: 'Buscamos desmistificar o jargão do tribunal tradicional para que você se sinta seguro e compreenda todo o processo.'
      },
      {
        title: 'Cálculos Elaborados com Critério',
        description: 'Planilhas desenvolvidas com clareza matemática e pé no chão, buscando a realidade concreta de cada profissional ou negócio.'
      }
    ],
    faqs: [
      {
        question: 'Qual é o prazo limite para cobrar os direitos trabalhistas na Justiça?',
        answer: 'O trabalhador tem o prazo de até 2 anos após a saída efetiva da empresa para ingressar com uma ação judicial de cobrança trabalhadora. Na ação, ele poderá reclamar verbas referentes aos últimos 5 anos de contrato laborado.'
      },
      {
        question: 'Como funciona a comprovação de horas extras na prática?',
        answer: 'A primeira prova costuma ser o controle escrito ou digital de horários da empresa. Se esses controles apresentarem erros ou não refletirem a realidade, o trabalhador pode comprovar a jornada de trabalho excedente por meio de testemunhas, emails, conversas no WhatsApp e relatórios de atividades.'
      },
      {
        question: 'O trabalho sem carteira assinada gera direitos trabalhistas?',
        answer: 'Sim. Se houver prestação de serviços habitual, pessoal, sob subordinação jurídica e mediante remuneração financeira, a relação de emprego é caracterizada. É possível requerer o reconhecimento do vínculo de emprego judicialmente para obter o registro em carteira e todas as verbas rescisórias, férias, décimo terceiro e depósitos de FGTS.'
      }
    ]
  },
  previdenciario: {
    id: 'previdenciario',
    title: 'Direito Previdenciário',
    shortDescription: 'Orientação técnica dedicada para aposentadorias, concessão de benefícios por incapacidade e BPC/LOAS junto ao INSS.',
    heroSubtitle: 'Planejamento e suporte contínuo para garantir que você receba o benefício previdenciário correto e possa se aposentar de forma justa e transparente.',
    headerTitle: 'Direito Previdenciário',
    illustration: 'Calendar',
    painPoints: [
      'Incerteza sobre a data certa de aposentadoria após as mudanças provocadas pela Reforma da Previdência.',
      'Indeferimento injusto ou atraso inexplicável na análise de benefícios de auxílio-doença ou aposentadoria no INSS.',
      'Divergências de dados no CNIS (extrato de contribuição) que prejudicam a contagem de tempo de serviço.',
      'Necessidade de fundamentação e documentos rurais adequados para justificar o período de atividade rural (segurado especial).',
      'Falta de instrução sobre os critérios de renda e documentação exigidos para a concessão do BPC/LOAS para idosos ou deficientes.'
    ],
    solutions: [
      'Planejamento Previdenciário Prático: Levantamento minucioso do tempo para descobrir a transição e a contribuição certa.',
      'Encaminhamento administrativo completo de aposentadoria por tempo de contribuição, idade ou especial.',
      'Assessoria jurídica na obtenção e regularização do Benefício de Prestação Continuada (BPC/LOAS) para idoso ou deficiente.',
      'Representação em pedidos de concessão e restabelecimento de auxílio-doença, auxílio-recidente e aposentadoria por invalidez.',
      'Ações judiciais justificadas de revisão de aposentadoria para corrigir erros de cálculo cometidos na concessão originária.'
    ],
    howItWorks: [
      'Organização do Histórico: Coleta do CNIS, carteiras de trabalho antigas, certidões e comprovantes de auxílios e laudos médicos.',
      'Estudo Comparativo de Transições: Realização de cálculos reais para identificar a regra que propicia o maior valor legal de benefício.',
      'Abertura do Pedido Administrativo: Requerimento no portal do INSS munido de petição explicativa e provas documentais sólidas.',
      'Atuação Judicial se Necessário: Busca imediata pela via judicial nos casos de demora crônica ou indeferimento arbitrário do benefício correto.'
    ],
    differentials: [
      {
        title: 'Explicação Didática do Planejamento',
        description: 'Explicamos os cenários de aposentadoria de forma muito compreensível, sem termos difíceis ou custos desproporcionais.'
      },
      {
        title: 'Foco em Solução de Inconsistências',
        description: 'Corrigimos dados errados no INSS antes que o erro atrase a concessão definitiva de seu benefício planejado.'
      },
      {
        title: 'Acolhimento de Casos de Vulnerabilidade',
        description: 'Tratamos benefícios como BPC/LOAS e auxílio-doença com a celeridade e o cuidado social humano que esses cuidados necessitam.'
      }
    ],
    faqs: [
      {
        question: 'O INSS negou meu auxílio-doença, mesmo eu estando sem trabalhar. O que posso fazer?',
        answer: 'Você pode recorrer administrativamente no próprio INSS ou propor uma ação judicial para pedir uma perícia médica comandada por um médico perito nomeado pelo juiz. Na via judicial, a avaliação costuma ser feita de forma mais humana e pormenorizada por especialistas.'
      },
      {
        question: 'O que é preciso para requerer o benefício do BPC/LOAS?',
        answer: 'O BPC garante um salário-mínimo mensal para idosos acima de 65 anos ou pessoas com deficiência física/mental que impeça o trabalho. É indispensável estar inscrito no Cadastro Único (CadÚnico) atualizado e comprovar que a renda familiar mensal por pessoa é igual ou inferior a 1/4 do salário-mínimo vigente.'
      },
      {
        question: 'Vale a pena investir em um Planejamento Previdenciário antes de pedir o benefício?',
        answer: 'Com certeza. O planejamento evita que você peça a aposentadoria em uma regra de transição ruim que aplique um fator de cálculo rebaixado e reduz o seu salário para sempre. Ele simula o valor futuro do seu benefício de forma objetiva de acordo com cada cenário contributivo histórico.'
      }
    ]
  },
  civel: {
    id: 'civel',
    title: 'Direito Cível e Suporte Patrimonial',
    shortDescription: 'Assessoria em contratos, cobranças de títulos, conflitos condominiais, direito do consumidor, indenizações por danos e partilhas familiares.',
    heroSubtitle: 'Soluções jurídicas preventivas e processos judiciais pautados pelo equilíbrio, seriedade ética técnica e proteção de seus interesses civis.',
    headerTitle: 'Direito Cível',
    illustration: 'Shield',
    painPoints: [
      'Inadimplência de devedores, descumprimento de obrigações contratuais acordadas ou títulos não pagos.',
      'Problemas na compra, venda ou locação residencial e comercial de bens imóveis sem contratos seguros.',
      'Prejuízos decorrentes de falhas em produtos ou serviços e condutas comerciais abusivas que ofendem o consumidor.',
      'Cobrança indevida de taxas ou multas de consumo que necessitam de intervenção ou indenizações por dano material e moral.',
      'Necessidade de organizar e partilhar bens por meio de inventários administrativos consensuais e amigáveis de comum acordo.'
    ],
    solutions: [
      'Análise de Contratos: Análise, revisão e elaboração de contratos comerciais, imobiliários, civis e societários simples.',
      'Ações de Cobrança e Execução de títulos extrajudiciais, cheques e notas promissórias pendentes de quitação.',
      'Relações de Consumo: Atuação em indenizações, revisões contratuais de consumo e defesa contra práticas abusivas de fornecedores.',
      'Ações Indenizatórias e de Responsabilidade Civil por perdas materiais e danos morais injustos causados a terceiros.',
      'Inventário e Partilha Amigável: Condução de heranças e dote familiar em cartório, buscando o consenso e a redução de desgastes de parentesco.'
    ],
    howItWorks: [
      'Análise do Conflito: Conversa para entender as razões do desacordo em cobranças, contratos ou relações de família e consumo.',
      'Auditoria de Documentos: Exame de contratos vigentes, notas de compras, mensagens de WhatsApp com promessas e comprovantes financeiros.',
      'Busca de Solução Amigável: Notificação e reuniões para resolver o embate sem a lentidão que um processo de justiça tradicional costuma impor.',
      'Trâmite Judicial Dedicado: Em caso de litígio inevitável, elaboração de petição detalhada com acompanhamento transparente de cada andamento.'
    ],
    differentials: [
      {
        title: 'Foco na Conciliação e Redução de Atritos',
        description: 'Buscamos ativamente restabelecer acordos benéficos aos nossos clientes sem judicializar tudo de forma automática ou desmedida.'
      },
      {
        title: 'Contratos Inteiramente Personalizados',
        description: 'Não trabalhamos com modelos prontos. Cada cláusula é repensada de acordo com as particularidades de seu negócio ou bem patrimonial.'
      },
      {
        title: 'Suporte Confidencial Permanente',
        description: 'Tratamos transições familiares de partilha ou desavenças financeiras sob absoluto sigilo ético e respeito humano.'
      }
    ],
    faqs: [
      {
        question: 'Como funciona o inventário extrajudicial em cartório?',
        answer: 'O inventário pode ser realizado de forma rápida por escritura de cartório se todos os herdeiros forem maiores de idade, plenamente incapazes (não houver menores) e estiverem em pleno acordo quanto à partilha de todos os bens descritos. É obrigatória a presença e assinatura de uma advogada no ato.'
      },
      {
        question: 'O inquilino pode ser despejado se atrasar o aluguel comum por poucos dias?',
        answer: 'De acordo com a Lei do Inquilinato brasileira, o atraso de apenas um dia de aluguel já autoriza o locador a iniciar a ação de despejo por falta de pagamento. Contudo, é prudente e comum buscar a conciliação prévia por telefone ou notificação para acertar uma data de quitação consensual amigável.'
      },
      {
        question: 'O que fazer ao constatar que comprou um produto com defeito e a loja se recusa a trocar?',
        answer: 'O Código de Defesa do Consumidor concede o prazo de até 30 dias para solução do problema de bens não duráveis e 90 dias para duráveis. Caso o vício não seja solucionado em até 30 dias pelas assistências autorizadas, o consumidor pode exigir o dinheiro integral atualizado de volta, a troca de produtos similares ou desconto proporcional no preço.'
      }
    ]
  }
};
