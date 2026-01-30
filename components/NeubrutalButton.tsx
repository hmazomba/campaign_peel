
import React from 'react';

interface NeubrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

const NeubrutalButton: React.FC<NeubrutalButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading, 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 font-black uppercase transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none border-2 border-black neubrutalism-shadow disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-300",
    secondary: "bg-white hover:bg-slate-100",
    danger: "bg-red-500 hover:bg-red-400 text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};

export default NeubrutalButton;
