import { MessageCircle, UserPlus, Award, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Avatar } from '../ui/Avatar';

// Color palette per notification type — mirrors Games card style
const TYPE_COLORS = {
  sip:     { color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)', glow: 'rgba(232,121,249,0.15)', hoverBorder: 'rgba(232,121,249,0.55)', badgeBg: 'bg-[#e879f9]' },
  comment: { color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)', glow: 'rgba(167,139,250,0.15)', hoverBorder: 'rgba(167,139,250,0.55)', badgeBg: 'bg-[#a78bfa]' },
  follow:  { color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)',  glow: 'rgba(56,189,248,0.15)',  hoverBorder: 'rgba(56,189,248,0.55)',  badgeBg: 'bg-[#38bdf8]' },
  badge:   { color: '#facc15', bg: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.28)',  glow: 'rgba(250,204,21,0.15)',  hoverBorder: 'rgba(250,204,21,0.55)',  badgeBg: 'bg-[#facc15]' },
};

export function NotificationItem({ notification, onMarkAsRead }) {
  const palette = TYPE_COLORS[notification.type] || TYPE_COLORS.sip;

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'sip':     return <Zap className="h-3 w-3 text-black" strokeWidth={3} />;
      case 'comment': return <MessageCircle className="h-3 w-3 text-white" strokeWidth={3} />;
      case 'follow':  return <UserPlus className="h-3 w-3 text-white" strokeWidth={3} />;
      default:        return null;
    }
  };

  return (
    <button
      onClick={() => onMarkAsRead(notification.id)}
      style={{
        width: '100%',
        borderRadius: '1.5rem',
        padding: '1.25rem 1.5rem',
        textAlign: 'left',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.22s ease',
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = palette.hoverBorder;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 12px 32px ${palette.border}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = palette.border;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Ambient glow top-right */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80,
        background: `radial-gradient(circle, ${palette.glow.replace('0.15', '0.35')}, transparent 70%)`,
        filter: 'blur(16px)', pointerEvents: 'none' }} />

      {/* Unread dot */}
      {notification.unread && (
        <div style={{ position: 'absolute', top: 14, right: 14, width: 10, height: 10,
          borderRadius: '50%', background: palette.color,
          boxShadow: `0 0 10px ${palette.color}`, zIndex: 20 }} />
      )}

      <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 10, alignItems: 'flex-start' }}>
        {/* Avatar / badge icon */}
        <div style={{ flexShrink: 0, marginLeft: '0.25rem' }}>
          {notification.type === 'badge' ? (
            <div style={{ width: 56, height: 56, borderRadius: '50%',
              background: `linear-gradient(135deg, rgba(250,204,21,0.20), rgba(250,204,21,0.40))`,
              border: `2px solid ${palette.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 15px ${palette.glow}` }}>
              <Award style={{ width: 28, height: 28, color: palette.color }} strokeWidth={2.5} />
            </div>
          ) : (
            <Avatar src={notification.avatar} alt={notification.user} size="lg" />
          )}
        </div>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div style={{ flex: 1 }}>
              {notification.type === 'badge' ? (
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'rgba(220,200,255,0.80)' }}>
                  {notification.action}
                  <span style={{ display: 'block', marginTop: 4, fontSize: '1.05rem', fontWeight: 900,
                    color: palette.color, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                    {notification.badge}
                  </span>
                </p>
              ) : (
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(220,200,255,0.75)', fontWeight: 500 }}>
                  <span style={{ fontWeight: 900, color: '#f3e8ff' }}>{notification.user}</span>
                  {' '}
                  {notification.action}
                  {notification.post && (
                    <span style={{ display: 'block', marginTop: 4, fontSize: '0.78rem', fontWeight: 700,
                      color: `${palette.color}99` }}>
                      "{notification.post}"
                    </span>
                  )}
                </p>
              )}
            </div>

            <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.08em',
              color: `${palette.color}99`, textTransform: 'uppercase', flexShrink: 0, marginTop: 2 }}>
              {notification.time}
            </span>
          </div>
        </div>
      </div>

      {/* Type badge — pinned top-left */}
      {notification.type !== 'badge' && (
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 20 }}>
          <div className={cn('w-5 h-5 rounded-full border-2 border-[#050505] flex items-center justify-center shadow-lg', palette.badgeBg)}>
            {getBadgeIcon(notification.type)}
          </div>
        </div>
      )}
    </button>
  );
}
