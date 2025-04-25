'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  link?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  link,
  className = '',
}: ServiceCardProps) {
  const IconComponent = () => {
    if (!icon) return null;
    
    return (
      <div className="mb-4 text-3xl text-secondary">
        <img 
          src={`/${icon}.svg`} 
          alt={title} 
          className="w-12 h-12"
        />
      </div>
    );
  };

  const content = (
    <>
      <IconComponent />
      
      <h3 className="text-xl font-bold mb-3 text-primary">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-4">
        {description}
      </p>
      
      {link && (
        <span className="text-secondary font-medium hover:underline inline-flex items-center">
          Saiba mais
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </span>
      )}
    </>
  );

  return link ? (
    <Link 
      href={link}
      className={`
        block bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg
        ${className}
      `}
    >
      {content}
    </Link>
  ) : (
    <div 
      className={`
        bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg
        ${className}
      `}
    >
      {content}
    </div>
  );
}
