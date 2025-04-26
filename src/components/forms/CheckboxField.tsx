
import React from 'react';

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>((
  {
    id,
    label,
    error,
    className = '',
    ...props // Captura o resto das props, incluindo as do react-hook-form
  },
  ref // Encaminha a ref para o input
) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            name={id}
            type="checkbox"
            ref={ref} // Usa a ref encaminhada
            {...props} // Espalha as props restantes (incluindo as do register)
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
});

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;

