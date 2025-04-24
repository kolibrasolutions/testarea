import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  bgColor?: 'white' | 'gray' | 'primary' | 'secondary';
  id?: string;
  className?: string; // Adicionando propriedade className opcional
}

export default function Section({ 
  title, 
  subtitle, 
  children, 
  bgColor = 'white',
  id,
  className = ''
}: SectionProps) {
  const getBgColor = () => {
    switch (bgColor) {
      case 'gray':
        return 'bg-gray-100';
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      default:
        return 'bg-white';
    }
  };

  return (
    <section id={id} className={`py-16 ${getBgColor()} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg opacity-80">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
