import React from 'react';
import { ModuleItem } from '../types';

interface FloatingBoxProps {
  item: ModuleItem;
  onClick: (item: ModuleItem) => void;
}

const FloatingBox: React.FC<FloatingBoxProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className={`
        relative group cursor-pointer transition-all duration-500 
        hover:scale-105 active:scale-95 touch-manipulation
        ${item.offset}
      `}
      style={{
        animation: `float ${4 + Math.random() * 2}s ease-in-out infinite alternate`,
        animationDelay: `${item.delay}s`
      }}
    >
      {/* Matte Black Main Box with White Glow */}
      <div className="white-glow w-[140px] h-[140px] md:w-[200px] md:h-[200px] matte-finish rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center gap-3 md:gap-5 border border-white/5 group-hover:border-white/20 transition-all duration-300">
        <div className="text-white opacity-90 group-hover:opacity-100 transition-opacity scale-90 md:scale-100">
          {item.icon}
        </div>
        <span className="text-white font-semibold text-[10px] md:text-sm tracking-[0.1em] text-center px-4 md:px-6 leading-tight uppercase">
          {item.label}
        </span>
      </div>
    </div>
  );
};

export default FloatingBox;