import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ checked, onCheckedChange, className, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked} // fully controlled
      onCheckedChange={onCheckedChange} // just pass the callback
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full bg-muted p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block h-4 w-4 rounded-full bg-background shadow-md transition-transform duration-200 ease-in-out",
          "data-[state=checked]:translate-x-5"
        )}
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";

export { Switch };
