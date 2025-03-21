import React from 'react';
import { useNavigate } from 'react-router-dom';

type NewButtonProps = {
  label: string;
  to?: string; // 遷移先のパスを指定
  onClick?: () => void; 
  className?: string;   
  // 進むボタンか戻るボタンか
  direction: "forward" | "backward";
}

const NewButton: React.FC<NewButtonProps> = ({ label, to, onClick, className = '', direction }) => {
  const buttonClass = direction === "forward"
    ? "bg-blue hover:bg-blue text-white" // 進むボタンの色 (青)
    : "bg-lightgray hover:bg-lightgray text-white"; // 戻るボタンの色 (灰色)

  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-[175px] h-[48px] text-sm rounded-sm border-xs border-white text-white focus:outline-none shadow-custom ${buttonClass} ${className}`}
    >
      {label}
    </button>

  );
}

export default NewButton;