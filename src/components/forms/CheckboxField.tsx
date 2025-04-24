'use client';

import { useState } from 'react';

interface CheckboxFieldProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  className?: string;
}

export default function CheckboxField({
  id,
  label,
  checked = false,
  onChange,
  error,
  className = '',
}: CheckboxFieldProps) {
  const [isChecked, setIsChecked] = useState(checked);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            name={id}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className={`
              h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary
              ${error ? 'border-red-500' : ''}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={id} className="font-medium text-gray-700">
            {label}
          </label>
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
