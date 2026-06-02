import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-[#2A2A2A] bg-[#111111] px-3 py-1 text-sm text-[#E8E8E8] shadow-sm transition-colors",
          "placeholder:text-[#666666]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C05A38] focus-visible:border-[#C05A38]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#E8E8E8]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
