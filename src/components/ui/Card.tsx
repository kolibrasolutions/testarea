'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface CardProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  className?: string;
}

export default function Card({
  title,
  description,
  icon,
  imageSrc,
  imageAlt = '',
  children,
  className = '',
}: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      {/* Card Image (if provided) */}
      {imageSrc && (
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Card Icon (if provided) */}
        {icon && (
          <div className="mb-4 text-secondary">
            {icon}
          </div>
        )}
        
        {/* Card Title */}
        {title && <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>}
        
        {/* Card Description */}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        
        {/* Additional Content */}
        {children}
      </div>
    </div>
  );
}
