'use client';

import { ReactNode } from 'react';
import Button from '../ui/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  stats?: Array<{icon: ReactNode, value: string, label: string}>;
  className?: string;
  align?: 'left' | 'center';
}

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  stats,
  className = '',
  align = 'center',
}: HeroProps) {
  return (
    <section className={`bg-primary text-white pt-32 pb-16 relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto ${align === 'center' ? 'text-center' : 'text-left'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl font-semibold text-secondary mb-6">
            {subtitle}
          </p>
          
          {description && (
            <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
              {description}
            </p>
          )}
          
          {(ctaText || secondaryCtaText) && (
            <div className={`flex flex-wrap gap-4 mb-12 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
              {ctaText && ctaLink && (
                <Button 
                  href={ctaLink} 
                  variant="secondary" 
                  size="lg"
                >
                  {ctaText}
                </Button>
              )}
              
              {secondaryCtaText && secondaryCtaLink && (
                <Button 
                  href={secondaryCtaLink} 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          )}
          
          {stats && (
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-secondary text-2xl mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
