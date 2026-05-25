import { cn } from '../../utils/cn';

export function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[#2E111A] via-[#11001C]/80 to-[#2E111A] border-2 border-[#B24BF3]/20 rounded-3xl p-6',
        hover && 'hover:border-[#B24BF3]/50 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}



