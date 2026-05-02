import type { InputHTMLAttributes } from "react";
import { Label } from "@ui/label";
import { Input } from "@ui/input";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Field = ({ label, className = "", id, ...rest }: FieldProps) => {
  const inputId = id || Math.random().toString(36).substring(7);
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={inputId} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input
        id={inputId}
        {...rest}
        className="rounded-xl px-4 py-6 focus-visible:ring-primary/20"
      />
    </div>
  );
};
