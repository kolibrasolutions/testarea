'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon?: ReactNode;
  imageSrc?: string;
  ctaText?: string;
  ctaLink?: string;
  highlighted?: boolean;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  price,
  features,
  icon,
  imageSrc,
  ctaText = 'Selecionar',
  ctaLink,
  highlighted = false,
  className = '',
}: ServiceCardProps) {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 
        ${highlighted ? 'border-2 border-secondary transform scale-105 shadow-xl' : 'hover:shadow-lg'}
        ${className}
      `}
    >
      {/* Card Header */}
      <div className={`p-6 ${highlighted ? 'bg-secondary text-white' : 'bg-gray-50'}`}>
        {icon && (
          <div className={`mb-4 text-3xl ${highlighted ? 'text-white' : 'text-secondary'}`}>
            {icon}
          </div>
        )}
        
        {imageSrc && (
          <div className="mb-4 h-16 w-16 mx-auto">
            <Image
              src={imageSrc}
              alt={title}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        )}
        
        <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-primary'}`}>
          {title}
        </h3>
        
        <p className={`text-sm mb-4 ${highlighted ? 'text-white opacity-90' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <div className={`text-2xl font-bold ${highlighted ? 'text-white' : 'text-secondary'}`}>
          {price}
        </div>
      </div>
      
      {/* Features List */}
      <div className="p-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className="w-5 h-5 text-secondary mt-0.5 mr-2 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        {ctaLink ? (
          <Link 
            href={ctaLink}
            className={`
              block w-full text-center py-3 px-4 rounded-md font-medium transition-colors
              ${highlighted 
                ? 'bg-white text-secondary hover:bg-gray-100' 
                : 'bg-secondary text-white hover:bg-secondary-dark'
              }
            `}
          >
            {ctaText}
          </Link>
        ) : (
          <Button 
            variant={highlighted ? 'light' : 'secondary'} 
            fullWidth
          >
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}
