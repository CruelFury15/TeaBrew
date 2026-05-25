import { cn } from '../../utils/cn';

export function Avatar({ 
  src, 
  alt = 'Avatar', 
  size = 'md',
  className,
  badge,
  ...props 
}) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={alt}
        width={size === 'sm' ? 40 : size === 'md' ? 48 : size === 'lg' ? 64 : 96}
        height={size === 'sm' ? 40 : size === 'md' ? 48 : size === 'lg' ? 64 : 96}
        className={cn(
          sizeClasses[size],
          'rounded-full border-2 border-zinc-700 bg-[#050505]',
          className
        )}
        {...props}
      />
      {badge && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#B24BF3] border-2 border-[#050505] flex items-center justify-center shadow-lg">
          {badge}
        </div>
      )}
    </div>
  );
}



