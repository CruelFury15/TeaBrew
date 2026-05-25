import { TrendingDown, Clock, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export function WeakTeaPost({ post, onVote }) {
  return (
    <div
      className={cn(
        'border-2 rounded-3xl p-5 transition-all duration-300',
        post.voted 
          ? 'bg-red-500/10 border-red-500/50' 
          : 'bg-gradient-to-br from-[#2E111A]/30 via-[#11001C]/30 to-[#2E111A]/30 border-[#B24BF3]/20 hover:border-white/20'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <p className="text-lg font-bold text-zinc-200 mb-3 tracking-tight">
            {post.title}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-zinc-500 mb-4 tracking-wider uppercase">
            <span className="bg-black px-2 py-1 rounded">@{post.author}</span>
            <span className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded',
              post.voted && 'text-red-400 bg-red-400/20'
            )}>
              <TrendingDown className="h-3 w-3" />
              {post.votes}
            </span>
            <span className="flex items-center gap-1.5 bg-black px-2 py-1 rounded">
              <Clock className="h-3 w-3" />
              {post.timeLeft}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVote(post.id)}
              className={cn(
                'flex-1 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all',
                post.voted 
                  ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-red-500/20 hover:text-red-400'
              )}
            >
              {post.voted ? 'Voted Trash' : 'Vote Trash'}
            </button>
            <button className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-black uppercase tracking-widest rounded-xl transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
