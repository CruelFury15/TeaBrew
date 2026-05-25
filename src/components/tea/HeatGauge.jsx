import { Flame } from 'lucide-react';
import { cn } from '../../utils/cn';

export function HeatGauge({ temperature, className }) {
  const getColor = () => {
    if (temperature >= 90) return 'from-red-600 to-orange-500';
    if (temperature >= 70) return 'from-[#B24BF3] to-purple-600';
    return 'from-blue-500 to-cyan-500';
  };

  return (
    <div className={cn('relative w-12 h-32 bg-black/80 backdrop-blur-sm rounded-full border-2 border-white/10 overflow-hidden', className)}>
      <div 
        className={cn('absolute bottom-0 left-0 right-0 bg-gradient-to-t transition-all duration-500', getColor())}
        style={{ height: `${temperature}%` }}
      />
      <Flame 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white z-10"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }}
      />
    </div>
  );
}



