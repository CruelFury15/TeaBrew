import { Eye, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';

function InteractiveMetric({ icon: Icon, count }) {
  const [active, setActive] = useState(false);
  
  const formatCount = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };
  
  return (
    <button 
      className={cn(
        'flex flex-col items-center gap-1 transition-transform active:scale-90'
      )}
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
      }}
    >
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
        active 
          ? 'bg-white/20 border-white/50 scale-110' 
          : 'bg-black/80 border-[#B24BF3]/30 backdrop-blur-sm'
      )}>
        <Icon 
          className={cn('w-4 h-4', active ? 'text-[#B24BF3]' : 'text-purple-300')} 
        />
      </div>
      <span className={cn(
        'text-xs font-black',
        active ? 'text-[#B24BF3]' : 'text-[#B24BF3]/80'
      )}>
        {formatCount(count)}
      </span>
    </button>
  );
}

export function ActionButtons({ sips, stirs, className }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <InteractiveMetric icon={Eye} count={sips} />
      <InteractiveMetric icon={MessageCircle} count={stirs} />
    </div>
  );
}



