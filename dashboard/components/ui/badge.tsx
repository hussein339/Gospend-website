import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#1A1A1A] text-[#E8E8E8] border border-[#2A2A2A]",
        secondary:
          "bg-[#242424] text-[#AAAAAA] border border-[#333]",
        outline:
          "border border-[#2A2A2A] text-[#888] bg-transparent",
        destructive:
          "bg-red-900/30 text-red-400 border border-red-800/50",
        terra:
          "bg-[#C05A38]/15 text-[#E07A5F] border border-[#C05A38]/30",
        success:
          "bg-green-900/30 text-green-400 border border-green-800/50",
        blue:
          "bg-blue-900/30 text-blue-400 border border-blue-800/50",
        purple:
          "bg-purple-900/30 text-purple-400 border border-purple-800/50",
        yellow:
          "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50",
        orange:
          "bg-orange-900/30 text-orange-400 border border-orange-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
