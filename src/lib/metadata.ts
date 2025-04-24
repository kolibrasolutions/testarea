import { Metadata } from 'next';

// Função para gerar metadata para cada página de serviço
export function generateServiceMetadata(
  title: string,
  description: string,
  keywords: string[],
  ogImage: string = '/images/share-image.jpg'
): Metadata {
  return {
    title: `${title} | KOLIBRA SOLUTIONS`,
    description,
    keywords: ['Kolibra Solutions', ...keywords].join(', '),
    openGraph: {
      title: `${title} | KOLIBRA SOLUTIONS`,
      description,
      url: 'https://www.kolibrasolutions.com.br/',
      siteName: 'Kolibra Solutions',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | KOLIBRA SOLUTIONS`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://www.kolibrasolutions.com.br/servicos/${title.toLowerCase().replace(/\s+/g, '-')}`,
    },
  };
}

// Metadados para a página inicial
export const homeMetadata: Metadata = {
  title: 'KOLIBRA SOLUTIONS - A solução certa para crescer | Soluções Digitais Acessíveis',
  description: 'Soluções tecnológicas acessíveis para impulsionar pequenos negócios com grande impacto. Criação de sites, identidade visual e marketing digital para transformar seu negócio.',
  keywords: 'Kolibra Solutions, soluções digitais, criação de sites, identidade visual, marketing digital, pequenos negócios, Muzambinho, desenvolvimento web, branding, suporte mensal',
  openGraph: {
    title: 'KOLIBRA SOLUTIONS - A solução certa para seu negócio',
    description: 'Soluções tecnológicas acessíveis para impulsionar pequenos negócios com grandes resultados',
    url: 'https://www.kolibrasolutions.com.br/',
    siteName: 'Kolibra Solutions',
    images: [
      {
        url: '/images/share-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KOLIBRA SOLUTIONS - A solução certa para seu negócio',
    description: 'Soluções tecnológicas acessíveis para impulsionar pequenos negócios com grandes resultados',
    images: ['/images/share-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.kolibrasolutions.com.br/',
  },
};

// Metadados para a página de portfólio
export const portfolioMetadata: Metadata = {
  title: 'Portfólio | KOLIBRA SOLUTIONS - Nossos Projetos e Cases de Sucesso',
  description: 'Conheça nossos projetos de desenvolvimento web, branding e marketing digital. Veja como ajudamos pequenos negócios a crescerem com soluções digitais acessíveis.',
  keywords: 'portfólio Kolibra Solutions, projetos web, cases de sucesso, branding, identidade visual, sites responsivos, marketing digital, pequenos negócios',
  openGraph: {
    title: 'Portfólio | KOLIBRA SOLUTIONS - Nossos Projetos e Cases de Sucesso',
    description: 'Conheça nossos projetos de desenvolvimento web, branding e marketing digital. Veja como ajudamos pequenos negócios a crescerem com soluções digitais acessíveis.',
    url: 'https://www.kolibrasolutions.com.br/portfolio',
    siteName: 'Kolibra Solutions',
    images: [
      {
        url: '/images/portfolio-share.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfólio | KOLIBRA SOLUTIONS - Nossos Projetos e Cases de Sucesso',
    description: 'Conheça nossos projetos de desenvolvimento web, branding e marketing digital. Veja como ajudamos pequenos negócios a crescerem com soluções digitais acessíveis.',
    images: ['/images/portfolio-share.jpg'],
  },
  alternates: {
    canonical: 'https://www.kolibrasolutions.com.br/portfolio',
  },
};

// Metadados para a página de construtor
export const constructorMetadata: Metadata = {
  title: 'Construtor de Pacotes | KOLIBRA SOLUTIONS - Monte seu Pacote Personalizado',
  description: 'Monte seu pacote personalizado de serviços digitais de acordo com as necessidades do seu negócio. Desenvolvimento web, branding e marketing digital com preços acessíveis.',
  keywords: 'construtor de pacotes, serviços personalizados, desenvolvimento web, branding, marketing digital, preços acessíveis, pequenos negócios, Kolibra Solutions',
  openGraph: {
    title: 'Construtor de Pacotes | KOLIBRA SOLUTIONS - Monte seu Pacote Personalizado',
    description: 'Monte seu pacote personalizado de serviços digitais de acordo com as necessidades do seu negócio. Desenvolvimento web, branding e marketing digital com preços acessíveis.',
    url: 'https://www.kolibrasolutions.com.br/construtor',
    siteName: 'Kolibra Solutions',
    images: [
      {
        url: '/images/construtor-share.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construtor de Pacotes | KOLIBRA SOLUTIONS - Monte seu Pacote Personalizado',
    description: 'Monte seu pacote personalizado de serviços digitais de acordo com as necessidades do seu negócio. Desenvolvimento web, branding e marketing digital com preços acessíveis.',
    images: ['/images/construtor-share.jpg'],
  },
  alternates: {
    canonical: 'https://www.kolibrasolutions.com.br/construtor',
  },
};

// Metadados para a página de diagnóstico
export const diagnosticMetadata: Metadata = {
  title: 'Diagnóstico Digital Gratuito | KOLIBRA SOLUTIONS - Avalie seu Negócio',
  description: 'Receba um diagnóstico digital gratuito para seu negócio. Avalie sua presença online e descubra oportunidades de crescimento com a Kolibra Solutions.',
  keywords: 'diagnóstico digital gratuito, avaliação de presença online, oportunidades de crescimento, marketing digital, pequenos negócios, Kolibra Solutions',
  openGraph: {
    title: 'Diagnóstico Digital Gratuito | KOLIBRA SOLUTIONS - Avalie seu Negócio',
    description: 'Receba um diagnóstico digital gratuito para seu negócio. Avalie sua presença online e descubra oportunidades de crescimento com a Kolibra Solutions.',
    url: 'https://www.kolibrasolutions.com.br/diagnostico',
    siteName: 'Kolibra Solutions',
    images: [
      {
        url: '/images/diagnostico-share.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico Digital Gratuito | KOLIBRA SOLUTIONS - Avalie seu Negócio',
    description: 'Receba um diagnóstico digital gratuito para seu negócio. Avalie sua presença online e descubra oportunidades de crescimento com a Kolibra Solutions.',
    images: ['/images/diagnostico-share.jpg'],
  },
  alternates: {
    canonical: 'https://www.kolibrasolutions.com.br/diagnostico',
  },
};

// Metadados para a página de contato
export const contactMetadata: Metadata = {
  title: 'Contato | KOLIBRA SOLUTIONS - Fale Conosco',
  description: 'Entre em contato com a Kolibra Solutions. Estamos prontos para ajudar a transformar seu negócio com soluções digitais acessíveis e de qualidade.',
  keywords: 'contato Kolibra Solutions, fale conosco, orçamento, soluções digitais, atendimento, Muzambinho, pequenos negócios',
  openGraph: {
    title: 'Contato | KOLIBRA SOLUTIONS - Fale Conosco',
    description: 'Entre em contato com a Kolibra Solutions. Estamos prontos para ajudar a transformar seu negócio com soluções digitais acessíveis e de qualidade.',
    url: 'https://www.kolibrasolutions.com.br/contato',
    siteName: 'Kolibra Solutions',
    images: [
      {
        url: '/images/contato-share.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contato | KOLIBRA SOLUTIONS - Fale Conosco',
    description: 'Entre em contato com a Kolibra Solutions. Estamos prontos para ajudar a transformar seu negócio com soluções digitais acessíveis e de qualidade.',
    images: ['/images/contato-share.jpg'],
  },
  alternates: {
    canonical: 'https://www.kolibrasolutions.com.br/contato',
  },
};
