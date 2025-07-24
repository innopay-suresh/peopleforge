import React from 'react';

export const Card = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={props.className || 'bg-white rounded shadow p-4'}>
    {children}
  </div>
);

export const CardContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={props.className || ''}>
    {children}
  </div>
);
