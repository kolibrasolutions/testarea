import { Metadata } from 'next';

// Configurações base de metadados para todo o site
export const siteConfig = {
  name: 'Kolibra Solutions',
  description: 'Soluções digitais acessíveis para pequenos negócios',
  url: 'https://kolibrasolutions.com.br',
  ogImage: 'https://kolibrasolutions.com.br/og-image.jpg',
  links: {
    instagram: 'https://www.instagram.com/kolibrasolutions/',
    linkedin: 'https://www.linkedin.com/company/kolibrasolutions/',
    tiktok: 'https://www.tiktok.com/@kolibrasolutions',
  },
};

// Metadados base para todas as páginas
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'desenvolvimento web',
    'sites para pequenos negócios',
    'identidade visual',
    'presença digital',
    'marketing digital',
    'websites acessíveis',
    'Kolibra Solutions',
  ],
  authors: [{ name: 'Kolibra Solutions', url: siteConfig.url }],
  creator: 'Kolibra Solutions',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@kolibrasolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'verificação_google',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'pt-BR': siteConfig.url,
    },
  },
};

// Metadados específicos para a página inicial
export const homeMetadata: Metadata = {
  ...baseMetadata,
  title: 'Soluções Digitais para Pequenos Negócios',
  description: 'Transforme sua presença online com websites, identidade visual e estratégias digitais acessíveis para pequenos negócios.',
  alternates: {
    canonical: siteConfig.url,
  },
};

// Metadados específicos para a página de portfólio
export const portfolioMetadata: Metadata = {
  ...baseMetadata,
  title: 'Portfólio | Nossos Projetos',
  description: 'Conheça nossos projetos de desenvolvimento web, identidade visual e estratégias digitais para pequenos negócios.',
  alternates: {
    canonical: `${siteConfig.url}/portfolio`,
  },
};

// Metadados específicos para a página do construtor
export const construtorMetadata: Metadata = {
  ...baseMetadata,
  title: 'Construtor de Pacotes | Monte sua Solução Digital',
  description: 'Monte seu pacote personalizado de serviços digitais de acordo com as necessidades do seu negócio.',
  alternates: {
    canonical: `${siteConfig.url}/construtor`,
  },
};

// Metadados específicos para a página de contato
export const contatoMetadata: Metadata = {
  ...baseMetadata,
  title: 'Contato | Fale Conosco',
  description: 'Entre em contato com a Kolibra Solutions para transformar a presença digital do seu negócio.',
  alternates: {
    canonical: `${siteConfig.url}/contato`,
  },
};

// Metadados específicos para a página de diagnóstico
export const diagnosticoMetadata: Metadata = {
  ...baseMetadata,
  title: 'Diagnóstico Digital | Avalie seu Negócio',
  description: 'Faça um diagnóstico gratuito da presença digital do seu negócio e descubra oportunidades de melhoria.',
  alternates: {
    canonical: `${siteConfig.url}/diagnostico`,
  },
};
