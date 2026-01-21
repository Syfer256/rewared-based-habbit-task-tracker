
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 120 }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        
        {/* Cup Body */}
        <path 
          d="M30 45C30 35 40 35 50 35C60 35 70 35 70 45C70 55 60 65 50 65C40 65 30 55 30 45Z" 
          fill="url(#goldGradient)" 
        />
        
        {/* Handles */}
        <path 
          d="M30 42C25 42 22 45 22 50C22 55 25 58 30 58M70 42C75 42 78 45 78 50C78 55 75 58 70 58" 
          stroke="url(#goldGradient)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
        
        {/* Liquid and Bubbles Inside Cup */}
        <path 
          d="M33 45C33 53 40 60 50 60C60 60 67 53 67 45H33Z" 
          fill="#0f172a" 
          opacity="0.2"
        />
        <circle cx="45" cy="48" r="1.5" fill="white" opacity="0.8" />
        <circle cx="50" cy="52" r="1.2" fill="white" opacity="0.6" />
        <circle cx="55" cy="49" r="1.8" fill="white" opacity="0.7" />

        {/* Base */}
        <path 
          d="M48 65V75H42V78H58V75H52V65" 
          fill="url(#goldGradient)" 
        />
        <path 
          d="M40 78C40 78 45 80 50 80C55 80 60 78 60 78H40Z" 
          fill="url(#goldGradient)" 
        />
      </svg>
    </div>
  );
};

export default Logo;
