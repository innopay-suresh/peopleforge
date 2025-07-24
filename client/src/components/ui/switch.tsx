import React from 'react';

export const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (val: boolean) => void }) => (
  <input type="checkbox" checked={checked} onChange={e => onCheckedChange(e.target.checked)} />
);
