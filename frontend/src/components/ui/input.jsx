import * as React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex w-full rounded-lg border border-ahara-line bg-white px-3 py-2 text-sm text-ahara-ink placeholder:text-ahara-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ahara-sage disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
