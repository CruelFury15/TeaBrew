import { Trophy, Award } from 'lucide-react';
import { cn } from '../../utils/cn';

export function PodiumPlace({ user, color, isFirst = false }) {
  const heightClass = isFirst ? "h-40" : "h-28";
  const avatarSize = isFirst ? "w-24 h-24" : "w-16 h-16";

  return (
    <div className={cn('flex flex-col items-center gap-3', isFirst && '-mt-8')}>
      <div className="relative group cursor-pointer">
        {isFirst && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 drop-shadow-lg">
            <Trophy className="h-8 w-8" style={{ color }} />
          </div>
        )}
        <img
          src={user.avatar}
          alt={user.username}
          width={isFirst ? 96 : 64}
          height={isFirst ? 96 : 64}
          className={cn(
            avatarSize,
            'rounded-full border-4 relative z-10 shadow-2xl group-hover:scale-105 transition-transform '
          )}
          style={{ borderColor: color }}
        />
        {isFirst && (
          <div className="absolute -bottom-2 -right-2 bg-[#B24BF3] text-black rounded-full p-1.5 shadow-[0_0_10px_rgba(178,75,243,0.8)] z-20">
            <span className="text-[14px] font-black leading-none">👑</span>
          </div>
        )}
      </div>

      <div className="text-center w-full max-w-[100px]">
        <p
          className={cn(
            'font-black truncate',
            isFirst ? 'text-lg' : 'text-sm text-zinc-300'
          )}
          style={{ color: isFirst ? color : undefined }}
        >
          {user.username}
        </p>
        {isFirst && (
          <p className="text-[10px] text-white font-black uppercase tracking-widest mt-1 bg-[#B24BF3] rounded px-1">
            {user.badge}
          </p>
        )}
      </div>

      {/* Podium Block */}
      <div
        className={cn(
          heightClass,
          'w-24 sm:w-28 rounded-t-2xl relative border-t-4 border-l-2 border-r-2 flex items-start justify-center pt-4 overflow-hidden'
        )}
        style={{ borderColor: color, background: `${color}15` }}
      >
        <span className="text-5xl font-black opacity-20" style={{ color }}>
          {user.rank}
        </span>
      </div>
    </div>
  );
}
