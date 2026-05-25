import { useState } from 'react';
import { Hash } from 'lucide-react';
import { cn } from '../../utils/cn';
import { VideoPlayer } from './VideoPlayer';
import { HeatGauge } from './HeatGauge';
import { ActionButtons } from './ActionButtons';

export function TeaCard({ post }) {
  const [isHovered, setIsHovered] = useState(false);

  if (post.type === 'short-video' || post.type === 'long-video') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl transition-all duration-300',
          post.type === 'short-video' ? 'aspect-[9/16]' : 'aspect-video',
        )}
        style={{
          border: isHovered
            ? '1px solid rgba(232,121,249,0.60)'
            : '1px solid rgba(255,255,255,0.55)',
          boxShadow: isHovered
            ? '0 20px 48px rgba(192,132,252,0.30), inset 0 1px 0 rgba(255,255,255,0.70)'
            : '0 4px 20px rgba(192,132,252,0.12), inset 0 1px 0 rgba(255,255,255,0.60)',
          transform: isHovered ? 'translateY(-4px)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <VideoPlayer 
          thumbnail={post.thumbnail}
          duration={post.duration}
          title={post.title}
          type={post.type === 'short-video' ? 'short' : 'long'}
        />
        
        <div className="absolute right-3 bottom-3 flex items-end gap-3 z-20">
          <ActionButtons sips={post.sips} stirs={post.stirs} />
          <HeatGauge temperature={post.temperature} />
        </div>
      </div>
    );
  }

  if (post.type === 'text') {
    return (
      <div
        className={cn(
          'glass-card relative rounded-3xl p-6 transition-all duration-300 overflow-hidden',
          isHovered ? 'shadow-[0_16px_40px_rgba(192,132,252,0.28)]' : ''
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft color bleed */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 120, height: 120,
          background: 'radial-gradient(circle, rgba(232,121,249,0.25), transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: 100, height: 100,
          background: 'radial-gradient(circle, rgba(167,139,250,0.20), transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }} />

        <div className="relative z-10 pr-12">
          <Hash className="w-5 h-5 mb-3" style={{ color: '#e879f9' }} />
          <p style={{
            fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.65,
            color: '#e9d5ff', margin: 0,
          }}>
            {post.content}
          </p>
        </div>

        <div className="absolute right-3 bottom-3 flex items-end gap-3 z-20">
          <ActionButtons sips={post.sips} stirs={post.stirs} />
          <HeatGauge temperature={post.temperature} />
        </div>
      </div>
    );
  }

  return null;
}



