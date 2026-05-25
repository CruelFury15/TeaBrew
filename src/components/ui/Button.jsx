import { cn } from '../../utils/cn';

export function Button({ children, variant = 'primary', className, disabled, ...props }) {
  const base = 'btn-liquid font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed';
  const ghost = 'btn-liquid btn-liquid-ghost';

  return (
    <button
      className={cn(
        variant === 'secondary' || variant === 'ghost' ? ghost : base,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
