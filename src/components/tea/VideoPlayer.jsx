import { Play } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';

export function VideoPlayer({ 
  thumbnail, 
  duration, 
  title,
  type = 'short',
  className 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-3xl cursor-pointer group',
        type === 'short' ? 'aspect-[9/16]' : 'aspect-video',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={thumbnail}
        alt={title}
        width={type === 'short' ? 400 : 600}
        height={type === 'short' ? 711 : 338}
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.9 : 0.6 }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      
      {/* Duration badge */}
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
        <Play className="w-3 h-3 fill-white text-white" />
        <span className="text-xs font-black text-white">{duration}</span>
      </div>
      
      {/* Play button for long videos */}
      {type === 'long' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={cn('relative transition-transform duration-300', isHovered && 'scale-110')}>
            <div className="absolute inset-0 bg-[#B24BF3] rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-r from-[#B24BF3] to-[#9d3dd9] rounded-full p-4 shadow-2xl">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
          </div>
        </div>
      )}
      
      {/* Title */}
      {title && (
        <div className="absolute bottom-4 left-4 right-16">
          <p className={cn(
            'text-sm font-bold leading-tight transition-colors',
            isHovered ? 'text-[#B24BF3]' : 'text-white'
          )}>
            {title}
          </p>
        </div>
      )}
    </div>
  );
}



