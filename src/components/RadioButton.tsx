import React from 'react';

type RadioButtonProps = {
  label: string;             // ラベル
  value: string;             // ラジオボタンの値
  checked: boolean;          // 選択されてるかどうか
  onChange: (value: string) => void; // 選択された時の動作
  disabled?: boolean;        // 無効化（オプション）
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label className={`flex items-center text-sm gap-2 cursor-pointer ${disabled && 'opacity-50 cursor-not-allowed'}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="form-radio text-gray w-5 h-5"
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
