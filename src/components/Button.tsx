import React, { FC, ReactNode } from 'react';
import './Button.css';

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: FC<ButtonProps> = ({ onClick, children, type = 'button', className = '' }) => {
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;