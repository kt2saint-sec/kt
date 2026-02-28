import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from './utils';

interface NeonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface NeonTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-text-muted text-sm font-display uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn('neon-input w-full', className)}
        {...props}
      />
    </div>
  ),
);

NeonInput.displayName = 'NeonInput';

export const NeonTextarea = forwardRef<HTMLTextAreaElement, NeonTextareaProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-text-muted text-sm font-display uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn('neon-input w-full min-h-[120px] resize-y', className)}
        {...props}
      />
    </div>
  ),
);

NeonTextarea.displayName = 'NeonTextarea';
