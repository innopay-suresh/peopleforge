import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={props.className || 'bg-blue-600 text-white px-4 py-2 rounded'}>
    {children}
  </button>
);
