
import React from 'react';

interface RadioFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  className?: string;
}

const RadioField = React.forwardRef<HTMLInputElement, RadioFieldProps>((
  {
    id,
    name,
    label,
    value,
    error,
    className = '',
    ...props // Captura o resto das props, incluindo as do react-hook-form
  },
  ref // Encaminha a ref para o input
) => {
  return (
    <div className={`mb-2 ${className}`}>
      <div className="flex items-center">
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          ref={ref} // Usa a ref encaminhada
          {...props} // Espalha as props restantes (incluindo as do register)
          className={`
            h-4 w-4 border-gray-300 text-primary focus:ring-primary
            ${error ? 'border-red-500' : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
        />
        <label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
      
      {/* O erro é geralmente exibido no nível do grupo de rádio, não individualmente */}
      {/* Se necessário, pode ser adicionado aqui ou no componente pai */}
      {/* {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )} */}
    </div>
  );
});

RadioField.displayName = 'RadioField';

export default RadioField;

