import { Metadata } from 'next';
import { homeMetadata } from '@/lib/metadata';
import HomeContent from '@/components/pages/HomeContent';

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <div className="home-page-wrapper">
      {/* O conteúdo será renderizado pelo componente client */}
      <HomeContent />
    </div>
  );
}
