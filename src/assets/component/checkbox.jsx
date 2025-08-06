import React, { useState } from 'react';

export function Checkbox({ className, onCheckedChange, checked, ...props }) {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onCheckedChange) {
      onCheckedChange(newCheckedState);
    }
  };

  const baseClasses = "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const checkedClasses = "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground";

  const classes = `${baseClasses} ${isChecked ? checkedClasses : ''} ${className}`;
  
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={handleClick}
      className={classes}
      {...props}
    >
      {isChecked && (
        <svg className="h-4 w-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
}