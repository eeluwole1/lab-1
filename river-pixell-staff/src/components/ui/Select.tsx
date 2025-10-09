import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className = "", ...props }: SelectProps) {
  const baseClassName = "border-[1.5px] rounded-sm border-neutral-600 p-[4px] bg-neutral-50";
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return <select className={combinedClassName} {...props} />;
}
