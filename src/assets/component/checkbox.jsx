import React from 'react';

export function Checkbox({ id, icon, label, badge, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap- bg-white cursor-pointer rounded-lg"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="appearance-none h-4 w-4 border-2 border-sky-400 rounded-sm checked:bg-sky-500 checked:border-transparent cursor-pointer"
      />
      <div className="flex items-center gap-0 text-sm font-medium text-gray-900">
        {icon}
        {label}
        {badge && <span className="ml-1">{badge}</span>}
      </div>
    </label>
  );
}
