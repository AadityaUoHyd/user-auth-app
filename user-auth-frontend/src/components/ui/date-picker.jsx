import React from "react";

export function DatePicker({ value, onChange, label }) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
      />
    </div>
  );
}
