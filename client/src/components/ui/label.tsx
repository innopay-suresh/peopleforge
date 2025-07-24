import React from 'react';

export const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className={props.className || 'block font-medium mb-1'}>
    {children}
  </label>
);
