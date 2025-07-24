import React from 'react';

export const Select = ({ value, onValueChange, children, ...props }: { value: string; onValueChange: (val: string) => void; children: React.ReactNode }) => (
  <select value={value} onChange={e => onValueChange(e.target.value)} {...props}>
    {children}
  </select>
);

export const SelectTrigger = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);

export const SelectValue = ({ placeholder }: { placeholder: string }) => (
  <span>{placeholder}</span>
);

export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const SelectItem = ({ children, ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) => (
  <option {...props}>{children}</option>
);
