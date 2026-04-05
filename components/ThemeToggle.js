'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center gap-3 px-1 py-1 rounded-full
        transition-all duration-500 ease-out
        ${theme === 'dark' 
          ? 'bg-[#1a1a1a] border border-white/10' 
          : 'bg-[#f5f5f5] border border-gray-200'
        }
        hover:scale-105 active:scale-95
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Track */}
      <div className="relative flex items-center gap-2 px-3 py-1.5">
        {/* Icons */}
        <div className="relative w-10 h-5 flex items-center justify-between px-0.5">
          {/* Sun */}
          <div 
            className={`
              absolute transition-all duration-500 ease-out
              ${theme === 'light' 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-75 -translate-x-2'
              }
            `}
          >
            <Sun 
              size={14} 
              className="text-amber-500" 
              strokeWidth={2.5}
            />
          </div>
          
          {/* Moon */}
          <div 
            className={`
              absolute transition-all duration-500 ease-out
              ${theme === 'dark' 
                ? 'opacity-100 scale-100 translate-x-0' 
                : 'opacity-0 scale-75 translate-x-2'
              }
            `}
          >
            <Moon 
              size={14} 
              className="text-blue-400" 
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Label */}
        <span 
          className={`
            text-xs font-medium tracking-wide transition-colors duration-300
            ${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}
          `}
        >
          {theme === 'dark' ? 'NIGHT' : 'DAY'}
        </span>
      </div>

      {/* Sliding Indicator */}
      <div 
        className={`
          absolute top-1 left-1 w-8 h-8 rounded-full
          transition-all duration-500 ease-out
          ${theme === 'dark' 
            ? 'translate-x-[calc(100%+16px)] bg-[#2a2a2a] shadow-lg shadow-black/30' 
            : 'translate-x-0 bg-white shadow-md shadow-gray-200/50'
          }
        `}
      />
    </button>
  );
}
