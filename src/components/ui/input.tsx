import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-[var(--rule)] bg-transparent px-3 text-sm text-[var(--paper)] placeholder:text-[var(--paper)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-md border border-[var(--rule)] bg-transparent px-3 py-2 text-sm text-[var(--paper)] placeholder:text-[var(--paper)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] resize-none",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
