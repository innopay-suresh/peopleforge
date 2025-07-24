import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props} className={props.className || 'border rounded px-2 py-1 w-full'} />
));
Input.displayName = 'Input';
