import { Lock, Globe, Hash, Users } from 'lucide-react';

export function ChatroomCard({ room, onJoin, trending = false }) {
  return (
    <div
      className="glass-card"
      style={{
        borderRadius: '1.25rem', padding: '1.25rem', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        border: trending
          ? '1px solid rgba(217,70,239,0.35)'
          : '1px solid rgba(168,85,247,0.20)',
      }}
      onClick={() => onJoin(room)}
    >
      {trending && (
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120,
          background: 'radial-gradient(circle, rgba(232,121,249,0.22), transparent 70%)',
          filter: 'blur(20px)', pointerEvents: 'none' }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
        <div style={{ padding: '0.5rem', borderRadius: '0.625rem',
          background: trending
            ? 'linear-gradient(135deg, rgba(232,121,249,0.20), rgba(167,139,250,0.20))'
            : 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(255,255,255,0.65)',
          boxShadow: '0 2px 8px rgba(192,132,252,0.12)' }}>
          {room.isPrivate
            ? <Lock size={18} strokeWidth={2.5} style={{ color: '#d946ef' }} />
            : <Globe size={18} strokeWidth={2.5} style={{ color: '#9333ea' }} />
          }
        </div>
        {trending && (
          <span style={{ padding: '0.2rem 0.625rem', borderRadius: 9999, fontSize: '0.65rem',
            fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #e879f9, #a78bfa)', color: 'white',
            boxShadow: '0 4px 12px rgba(232,121,249,0.35)' }}>
            🔥 Trending
          </span>
        )}
      </div>

      <h3 style={{ margin: '0 0 0.375rem', fontWeight: 800, fontSize: '1rem',
        letterSpacing: '-0.01em', color: '#e9d5ff' }}>{room.name}</h3>
      <p style={{ margin: '0 0 0.875rem', fontSize: '0.8rem', color: 'rgba(192,132,252,0.60)',
        lineHeight: 1.5, fontWeight: 500 }}>{room.description}</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
        {[
          { icon: Hash, label: room.category },
          { icon: Users, label: room.members },
        ].map(({ icon: Icon, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem',
            padding: '0.2rem 0.625rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            background: 'rgba(30,0,55,0.60)', border: '1px solid rgba(168,85,247,0.25)',
            color: 'rgba(192,132,252,0.70)' }}>
            <Icon size={12} />
            {label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(168,85,247,0.40)' }}>
          Active {room.lastActive}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onJoin(room); }}
          className="btn-liquid btn-liquid-sm"
          style={{ fontSize: '0.72rem' }}
        >
          {room.isPrivate ? 'Request Access' : 'Join Chat'}
        </button>
      </div>
    </div>
  );
}
