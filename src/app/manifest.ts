import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kolibra Solutions',
    short_name: 'Kolibra',
    description: 'Soluções digitais acessíveis para pequenos negócios',
    start_url: '/',
    display: 'standalone',
    background_color: '#1E3A8A',
    theme_color: '#1E3A8A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
