'use client';

interface RadioFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export default function RadioField({
  id,
  name,
  label,
  value,
  checked = false,
  onChange,
  error,
  className = '',
}: RadioFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && e.target.checked) {
      onChange(e.target.value);
    }
  };
  
  return (
    <div className={`mb-2 ${className}`}>
      <div className="flex items-center">
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={handleChange}
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
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
