import React from 'react';
import { useNavigate } from 'react-router-dom';

type NewButtonProps = {
  label: string;
  to?: string; // 遷移先のパスを指定
  onClick?: () => void; 
  className?: string;   
  disabled?: boolean;
  // 進むボタンか戻るボタンか
  direction: "forward" | "backward";
}

const NewButton: React.FC<NewButtonProps> = ({ 
  label,
  to, 
  onClick, 
  className = '', 
  direction, 
  disabled = false
}) => {
  const navigate = useNavigate();

  // ボタンの色
  const buttonClass = disabled
    ? "bg-lightgray hover:bg-lightgray text-white opacity-50 cursor-not-allowed" // 無効時
    : direction === "forward"
      ? "bg-blue hover:bg-blue text-white" // 進むボタンの色 (青)
      : "bg-gray hover:bg-lightgray text-white"; // 戻るボタンの色 (灰色)
  
    const handleClick = () => {
      if (disabled) return; // 無効なら動かない
      if (onClick) onClick();
      if (to) navigate(to);
    };
    

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-[175px] h-[48px] text-sm rounded-sm border-xs border-white text-white focus:outline-none shadow-custom ${buttonClass} ${className}`}
    >
      {label}
    </button>

  );
}

export default NewButton;