interface ButtonProps {  
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}


export const Button = (props : ButtonProps) => {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200";

  const buttonVariant = {
    primary: "bg-[#5244df] text-white hover:bg-[#5244df]/80",
    secondary: "bg-[#e0e7ff] text-[#5244df] hover:bg-[#e0e7ff]/80"
  }

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2", 
    lg: "text-lg px-6 py-3"
  };

  return (
    <button 
      className={`${baseClasses} ${buttonVariant[props.variant]} ${sizeClasses[props.size]} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.startIcon && <span className="flex-shrink-0">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="flex-shrink-0">{props.endIcon}</span>}
    </button>
  )
}

