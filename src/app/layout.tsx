import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KOLIBRA SOLUTIONS - A solução certa para crescer | Soluções Digitais Acessíveis',
  description: 'Soluções tecnológicas acessíveis para impulsionar pequenos negócios com grande impacto. Criação de sites, identidade visual e marketing digital para transformar seu negócio.',
  keywords: 'Kolibra Solutions, soluções digitais, criação de sites, identidade visual, marketing digital, pequenos negócios, Muzambinho',
  authors: [{ name: 'Kolibra Solutions' }],
  openGraph: {
    title: 'KOLIBRA SOLUTIONS - A solução certa para seu negócio',
    description: 'Soluções tecnológicas acessíveis para impulsionar pequenos negócios com grandes resultados',
    url: 'https://www.kolibrasolutions.com.br/',
    siteName: 'Kolibra Solutions',
    images: [
      {
        url: 'https://www.kolibrasolutions.com.br/share-image.jpg',
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
    images: ['https://www.kolibrasolutions.com.br/share-image.jpg'],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.kolibrasolutions.com.br/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/img/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/img/favicon-64x64.png" />
        <link rel="apple-touch-icon" sizes="128x128" href="/img/favicon-128x128.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/img/favicon-152x152.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/img/favicon-192x192.png" />
      </head>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
