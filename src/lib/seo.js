// Arquivo de utilitários para otimização de SEO
import { NextSeo } from 'next-seo';

// Função para gerar schema.org JSON-LD para empresas locais
export function generateLocalBusinessSchema(businessInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    image: businessInfo.image,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.region,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    openingHoursSpecification: businessInfo.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    priceRange: businessInfo.priceRange,
  };
}

// Função para gerar schema.org JSON-LD para serviços
export function generateServiceSchema(serviceInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceInfo.name,
    description: serviceInfo.description,
    provider: {
      '@type': 'Organization',
      name: serviceInfo.provider.name,
      url: serviceInfo.provider.url,
    },
    areaServed: serviceInfo.areaServed,
    serviceType: serviceInfo.serviceType,
    offers: {
      '@type': 'Offer',
      price: serviceInfo.price,
      priceCurrency: serviceInfo.currency,
    },
  };
}

// Função para gerar schema.org JSON-LD para FAQs
export function generateFAQSchema(questions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

// Função para gerar schema.org JSON-LD para breadcrumbs
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Componente para adicionar schema.org JSON-LD a uma página
export function SchemaOrg({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Componente para adicionar tags canônicas e alternativas
export function CanonicalTags({ canonical, alternates = [] }) {
  return (
    <>
      <link rel="canonical" href={canonical} />
      {alternates.map((alternate, index) => (
        <link 
          key={index}
          rel="alternate" 
          hrefLang={alternate.lang} 
          href={alternate.url} 
        />
      ))}
    </>
  );
}

// Função para gerar meta tags para compartilhamento social
export function SocialTags({ title, description, url, image, twitterHandle }) {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        site_name: 'Kolibra Solutions',
      }}
      twitter={{
        handle: twitterHandle,
        site: '@kolibrasolutions',
        cardType: 'summary_large_image',
      }}
    />
  );
}

// Função para gerar meta tags para SEO local
export function LocalSEOTags({ business }) {
  return (
    <>
      <meta name="geo.region" content={business.region} />
      <meta name="geo.placename" content={business.city} />
      <meta name="geo.position" content={`${business.latitude};${business.longitude}`} />
      <meta name="ICBM" content={`${business.latitude}, ${business.longitude}`} />
    </>
  );
}

// Função para gerar meta tags para SEO técnico
export function TechnicalSEOTags() {
  return (
    <>
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
}

// Função para gerar meta tags para SEO de conteúdo
export function ContentSEOTags({ keywords, author, published, modified }) {
  return (
    <>
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      {published && <meta name="article:published_time" content={published} />}
      {modified && <meta name="article:modified_time" content={modified} />}
    </>
  );
}

// Dados da empresa para uso em todo o site
export const companyInfo = {
  name: 'KOLIBRA SOLUTIONS',
  slogan: 'A solução certa para crescer',
  description: 'Soluções tecnológicas acessíveis para impulsionar pequenos negócios com grande impacto.',
  url: 'https://www.kolibrasolutions.com.br',
  logo: 'https://www.kolibrasolutions.com.br/images/logo.png',
  telephone: '+5535999796570',
  email: 'contato@kolibrasolutions.com.br',
  address: {
    street: 'Rua Vereador João Pacheco, 56',
    city: 'Muzambinho',
    region: 'MG',
    postalCode: '37890-000',
    country: 'BR',
  },
  geo: {
    latitude: '-21.3709',
    longitude: '-46.5222',
  },
  openingHours: [
    { dayOfWeek: 'Monday', opens: '08:00', closes: '18:00' },
    { dayOfWeek: 'Tuesday', opens: '08:00', closes: '18:00' },
    { dayOfWeek: 'Wednesday', opens: '08:00', closes: '18:00' },
    { dayOfWeek: 'Thursday', opens: '08:00', closes: '18:00' },
    { dayOfWeek: 'Friday', opens: '08:00', closes: '18:00' },
  ],
  priceRange: '$$',
  socialMedia: {
    instagram: 'https://www.instagram.com/kolibrasolutions',
    facebook: 'https://www.facebook.com/kolibrasolutions',
    whatsapp: 'https://wa.me/5535999796570',
  },
  services: [
    'Desenvolvimento Web',
    'Branding',
    'Marketing Digital',
    'Suporte Mensal',
    'Consultoria em Processos',
  ],
};
