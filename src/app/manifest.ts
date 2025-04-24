import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KOLIBRA SOLUTIONS - A solução certa para crescer',
    short_name: 'Kolibra Solutions',
    description: 'Soluções tecnológicas acessíveis para impulsionar pequenos negócios com grande impacto.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#004494',
    icons: [
      {
        src: '/img/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/img/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
