import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] focus-visible:ring-[var(--accent)] disabled:opacity-50 disabled:pointer-events-none",
          size === "md" ? "h-10 px-4 text-sm" : "h-8 px-3 text-xs",
          variant === "primary" &&
            "bg-[var(--accent)] text-[var(--ink)] hover:brightness-110",
          variant === "outline" &&
            "border border-[var(--rule)] text-[var(--paper)] hover:border-[var(--accent)]",
          variant === "ghost" &&
            "text-[var(--paper)] hover:bg-white/5",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
