import React from 'react';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2 w-[253px] pb-4">
      {label && <label className="flex justify-center font-banana text-sm text-gray">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-2 border-yellow rounded-xs p-3 focus:outline-none focus:ring-2 focus:ring-yellow"
      />
    </div>
  );
};

export default TextField;
