
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>((
  {
    id,
    label,
    type = 'text',
    placeholder = '',
    required = false,
    error,
    className = '',
    ...props // Captura o resto das props, incluindo as do react-hook-form
  },
  ref // Encaminha a ref para o input
) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className={`relative rounded-md shadow-sm ${error ? 'border-red-500' : ''}`}>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          ref={ref} // Usa a ref encaminhada
          {...props} // Espalha as props restantes (incluindo as do register)
          className={`
            block w-full px-4 py-3 rounded-md border 
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-primary focus:ring-primary'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;

