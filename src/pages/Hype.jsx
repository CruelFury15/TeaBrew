import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Trophy, TrendingUp, TrendingDown, Star, Flame, Crown } from 'lucide-react';

const FILTERS = [
  { id: 'top',    label: 'TOP TIER', icon: '🔥' },
  { id: 'rising', label: 'RISING',   icon: '📈' },
  { id: 'viral',  label: 'VIRAL',    icon: '⚡' },
];

const PODIUM = [
  { rank: 1, username: 'ZennialSpill', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top1', points: 15420, badge: 'MAIN CHARACTER', color: '#facc15', bg: 'rgba(250,204,21,0.12)',  border: 'rgba(250,204,21,0.35)'  },
  { rank: 2, username: 'DramaLlama',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top2', points: 12890, badge: 'VIRAL',           color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.30)' },
  { rank: 3, username: 'SpillMaster',  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top3', points: 11234, badge: 'MESSY',            color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.30)'  },
];

// Each trending entry gets a unique accent color like Games cards
const TRENDING = [
  { rank: 4,  username: 'HotTakeHaven', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top4',  points: 9876, trend: 'up',   teas: 89,  color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)', tag: 'VIRAL'   },
  { rank: 5,  username: 'AnonCEO',      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top5',  points: 8765, trend: 'up',   teas: 74,  color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)', tag: 'RISING'  },
  { rank: 6,  username: 'SecretSipper', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top6',  points: 7654, trend: 'down', teas: 61,  color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)',  tag: 'PREDICT' },
  { rank: 7,  username: 'WhisperWave',  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top7',  points: 6543, trend: 'up',   teas: 55,  color: '#4ade80', bg: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.28)',  tag: 'HOT'     },
  { rank: 8,  username: 'TeaOracle',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top8',  points: 5890, trend: 'up',   teas: 48,  color: '#facc15', bg: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.28)',  tag: 'ORACLE'  },
  { rank: 9,  username: 'ViralVault',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top9',  points: 4321, trend: 'down', teas: 39,  color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.28)',  tag: 'SPICY'   },
  { rank: 10, username: 'ChaosAgent',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top10', points: 3210, trend: 'up',   teas: 31,  color: '#f472b6', bg: 'rgba(244,114,182,0.10)', border: 'rgba(244,114,182,0.28)', tag: 'CHAOS'   },
  { rank: 11, username: 'SpillQueen',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top11', points: 2980, trend: 'up',   teas: 27,  color: '#34d399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.28)',  tag: 'QUEEN'   },
  { rank: 12, username: 'DramaBot',     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top12', points: 2750, trend: 'down', teas: 24,  color: '#c084fc', bg: 'rgba(192,132,252,0.10)', border: 'rgba(192,132,252,0.28)', tag: 'BOT'     },
  { rank: 13, username: 'TeaLeaker',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top13', points: 2540, trend: 'up',   teas: 21,  color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)', tag: 'LEAK'    },
  { rank: 14, username: 'GossipGuru',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top14', points: 2310, trend: 'up',   teas: 19,  color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)',  tag: 'GURU'    },
  { rank: 15, username: 'ShadyTea',     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top15', points: 2100, trend: 'down', teas: 17,  color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.28)',  tag: 'SHADY'   },
  { rank: 16, username: 'NightSpill',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top16', points: 1890, trend: 'up',   teas: 15,  color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)', tag: 'NIGHT'   },
  { rank: 17, username: 'BrewMaster',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top17', points: 1670, trend: 'up',   teas: 13,  color: '#4ade80', bg: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.28)',  tag: 'BREW'    },
  { rank: 18, username: 'CancelCrew',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=top18', points: 1450, trend: 'down', teas: 11,  color: '#f472b6', bg: 'rgba(244,114,182,0.10)', border: 'rgba(244,114,182,0.28)', tag: 'CANCEL'  },
];

const RISING_STARS = [
  { username: 'FreshSpill',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=r1', teas: 12, growth: '+340%', joined: '3d ago', color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)' },
  { username: 'NewDrama_',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=r2', teas: 8,  growth: '+210%', joined: '5d ago', color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)' },
  { username: 'TeaNewbie',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=r3', teas: 15, growth: '+180%', joined: '1w ago', color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)'  },
  { username: 'SpillDebut',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=r4', teas: 6,  growth: '+155%', joined: '4d ago', color: '#4ade80', bg: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.28)'  },
  { username: 'QuickBrew',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=r5', teas: 9,  growth: '+130%', joined: '6d ago', color: '#facc15', bg: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.28)'  },
  { username: 'ViralRookie',  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=r6', teas: 11, growth: '+120%', joined: '2d ago', color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.28)'  },
];

const VIRAL_LIST = [
  { rank: 1,  username: 'ZennialSpill',  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v1',  shares: 4820, teas: 89,  color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)', tag: 'MEGA'   },
  { rank: 2,  username: 'DramaLlama',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v2',  shares: 3910, teas: 74,  color: '#facc15', bg: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.28)',  tag: 'FIRE'   },
  { rank: 3,  username: 'HotTakeHaven',  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v3',  shares: 3450, teas: 61,  color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)',  tag: 'VIRAL'  },
  { rank: 4,  username: 'TeaOracle',     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v4',  shares: 2980, teas: 55,  color: '#4ade80', bg: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.28)',  tag: 'HOT'    },
  { rank: 5,  username: 'SpillMaster',   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v5',  shares: 2540, teas: 48,  color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.28)',  tag: 'SPICY'  },
  { rank: 6,  username: 'ChaosAgent',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v6',  shares: 2210, teas: 39,  color: '#f472b6', bg: 'rgba(244,114,182,0.10)', border: 'rgba(244,114,182,0.28)', tag: 'CHAOS'  },
  { rank: 7,  username: 'AnonCEO',       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v7',  shares: 1890, teas: 31,  color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)', tag: 'ANON'   },
  { rank: 8,  username: 'GossipGuru',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v8',  shares: 1670, teas: 27,  color: '#34d399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.28)',  tag: 'GURU'   },
  { rank: 9,  username: 'NightSpill',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v9',  shares: 1450, teas: 24,  color: '#c084fc', bg: 'rgba(192,132,252,0.10)', border: 'rgba(192,132,252,0.28)', tag: 'NIGHT'  },
  { rank: 10, username: 'BrewMaster',    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v10', shares: 1230, teas: 19,  color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)',  tag: 'BREW'   },
];

/* ── Podium card — Games-style colored bg + border ── */
function PodiumCard({ user, isFirst, onNavigate }) {
  return (
    <div
      onClick={() => onNavigate(`/user/${user.username}`)}
      style={{
        flex: 1,
        borderRadius: '1.5rem',
        padding: isFirst ? '1.75rem 1rem 1.25rem' : '1.25rem 0.875rem 1rem',
        background: user.bg,
        border: `1px solid ${user.border}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem',
        position: 'relative', overflow: 'hidden',
        transform: isFirst ? 'translateY(-16px)' : 'none',
        transition: 'all 0.22s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = user.color;
        e.currentTarget.style.boxShadow = `0 12px 32px ${user.border}`;
        e.currentTarget.style.transform = isFirst ? 'translateY(-20px)' : 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = user.border;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = isFirst ? 'translateY(-16px)' : 'none';
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 80, height: 80,
        background: `radial-gradient(circle, ${user.bg.replace('0.12', '0.40').replace('0.10', '0.35')}, transparent 70%)`,
        filter: 'blur(16px)', pointerEvents: 'none',
      }} />

      {/* Rank badge top-right */}
      <div style={{
        position: 'absolute', top: 10, right: 12,
        background: user.bg, border: `1px solid ${user.border}`,
        borderRadius: 99, padding: '2px 8px',
      }}>
        <span style={{ fontSize: '0.58rem', fontWeight: 900, color: user.color, letterSpacing: '0.10em' }}>
          #{user.rank}
        </span>
      </div>

      {/* Crown for #1 */}
      {isFirst && <Crown style={{ width: 22, height: 22, color: user.color }} />}

      {/* Avatar */}
      <img src={user.avatar} alt={user.username}
        style={{
          width: isFirst ? 76 : 56, height: isFirst ? 76 : 56,
          borderRadius: '50%',
          border: `2px solid ${user.border}`,
          objectFit: 'cover',
        }} />

      {/* Name */}
      <p style={{
        margin: 0, fontWeight: 900,
        fontSize: isFirst ? '0.88rem' : '0.72rem',
        color: user.color,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 100,
        textAlign: 'center',
      }}>
        {user.username}
      </p>

      {/* Badge pill */}
      <span style={{
        fontSize: '0.50rem', fontWeight: 900, letterSpacing: '0.07em',
        border: `1px solid ${user.border}`,
        color: user.color,
        borderRadius: 99, padding: '1px 8px',
        textTransform: 'uppercase',
        background: user.bg,
      }}>
        {user.badge}
      </span>

      {/* Points */}
      <p style={{ margin: 0, fontSize: '0.80rem', fontWeight: 900, color: user.color }}>
        {user.points.toLocaleString()}
        <span style={{ fontSize: '0.52rem', fontWeight: 700, color: user.border, marginLeft: 3 }}>PTS</span>
      </p>

      {/* Podium base bar */}
      <div style={{
        width: '100%', height: isFirst ? 10 : 6,
        borderRadius: 99, marginTop: 4,
        background: `linear-gradient(90deg, ${user.bg.replace('0.12', '0.40').replace('0.10', '0.35')}, transparent)`,
        border: `1px solid ${user.border}`,
      }} />
    </div>
  );
}

export default function Hype() {
  const [activeFilter, setActiveFilter] = useState('top');
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: '0.75rem', zIndex: 20,
        margin: '0.75rem 0.3rem 0',
        borderRadius: '1.25rem',
        background: 'rgba(20,0,40,0.78)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        backdropFilter: 'blur(36px) saturate(200%)',
        border: '1px solid rgba(168,85,247,0.22)',
        boxShadow: '0 4px 28px rgba(109,40,217,0.22), inset 0 1px 0 rgba(232,121,249,0.10)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.75rem' }}>
          {/* Left: icon + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <div style={{
              padding: '0.5rem', borderRadius: '0.75rem',
              background: 'rgba(232,121,249,0.15)', border: '1px solid rgba(232,121,249,0.25)',
            }}>
              <Zap size={20} strokeWidth={3} style={{ color: '#e879f9' }} />
            </div>
            <div>
              <h1 style={{
                margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Hype Board
              </h1>
              <p style={{
                margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em',
                textTransform: 'uppercase', color: 'rgba(192,132,252,0.55)',
              }}>Who's Running The Tea</p>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.4rem 0.875rem', borderRadius: 99, cursor: 'pointer',
                  transition: 'all 0.18s ease', whiteSpace: 'nowrap',
                  border: activeFilter === f.id ? '2px solid rgba(232,121,249,0.60)' : '2px solid rgba(255,255,255,0.15)',
                  background: activeFilter === f.id ? 'rgba(232,121,249,0.18)' : 'transparent',
                  boxShadow: activeFilter === f.id ? '0 0 14px rgba(232,121,249,0.20)' : 'none',
                }}>
                <span style={{ fontSize: '0.85rem' }}>{f.icon}</span>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.08em',
                  color: activeFilter === f.id ? '#e879f9' : 'rgba(255,255,255,0.45)',
                }}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{
        padding: '1.5rem 1rem 5rem', maxWidth: '72rem', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr', gap: '2rem',
      }}>

        {/* ══ TOP TIER VIEW ══ */}
        {activeFilter === 'top' && (
          <>
            {/* ── HALL OF FAME ── */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <Trophy size={18} strokeWidth={2.5} style={{ color: '#facc15' }} />
                <h2 style={{
                  margin: 0, fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #facc15, #fb923c)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Hall of Fame
                </h2>
                <div style={{ flex: 1, height: 1, background: 'rgba(250,204,21,0.18)', marginLeft: '0.5rem' }} />
              </div>

              {/* Podium — 2nd | 1st | 3rd */}
              <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-end' }}>
                <PodiumCard user={PODIUM[1]} isFirst={false} onNavigate={navigate} />
                <PodiumCard user={PODIUM[0]} isFirst={true}  onNavigate={navigate} />
                <PodiumCard user={PODIUM[2]} isFirst={false} onNavigate={navigate} />
              </div>
            </section>

            {/* ── TRENDING UP ── */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <Flame size={18} strokeWidth={2.5} style={{ color: '#fb923c' }} />
                <h2 style={{
                  margin: 0, fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #fb923c, #e879f9)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Trending Up
                </h2>
                <div style={{ flex: 1, height: 1, background: 'rgba(251,146,60,0.18)', marginLeft: '0.5rem' }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '0.75rem',
              }}>
                {TRENDING.map(user => (
                  <div key={user.rank}
                    onClick={() => navigate(`/user/${user.username}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      padding: '0.875rem 1.125rem', borderRadius: '1.25rem',
                      background: user.bg,
                      border: `1px solid ${user.border}`,
                      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                      cursor: 'pointer', transition: 'all 0.22s ease',
                      position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = `0 10px 28px ${user.border}`;
                      e.currentTarget.style.borderColor = user.color;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = user.border;
                    }}
                  >
                    {/* Ambient glow */}
                    <div style={{
                      position: 'absolute', top: -16, right: -16, width: 60, height: 60,
                      background: `radial-gradient(circle, ${user.bg.replace('0.10', '0.35')}, transparent 70%)`,
                      filter: 'blur(12px)', pointerEvents: 'none',
                    }} />

                    {/* Tag badge */}
                    <div style={{
                      position: 'absolute', top: 8, right: 10,
                      background: user.bg, border: `1px solid ${user.border}`,
                      borderRadius: 99, padding: '1px 7px',
                    }}>
                      <span style={{ fontSize: '0.52rem', fontWeight: 900, color: user.color, letterSpacing: '0.10em' }}>
                        {user.tag}
                      </span>
                    </div>

                    {/* Rank */}
                    <span style={{
                      width: 28, fontSize: '0.82rem', fontWeight: 900, flexShrink: 0,
                      color: user.color, textAlign: 'center',
                    }}>
                      #{user.rank}
                    </span>

                    {/* Avatar */}
                    <img src={user.avatar} alt={user.username}
                      style={{
                        width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                        border: `1.5px solid ${user.border}`, objectFit: 'cover',
                      }} />

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        margin: 0, fontWeight: 900, fontSize: '0.88rem',
                        color: user.color,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {user.username}
                      </p>
                      <p style={{
                        margin: '2px 0 0', fontSize: '0.62rem', fontWeight: 700,
                        color: 'rgba(220,200,255,0.55)', letterSpacing: '0.06em',
                      }}>
                        {user.points.toLocaleString()} PTS · {user.teas} teas
                      </p>
                    </div>

                    {/* Trend icon */}
                    {user.trend === 'up'
                      ? <TrendingUp size={16} style={{ color: user.color, flexShrink: 0 }} />
                      : <TrendingDown size={16} style={{ color: 'rgba(244,114,182,0.60)', flexShrink: 0 }} />}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ══ RISING VIEW ══ */}
        {activeFilter === 'rising' && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <Star size={18} strokeWidth={2.5} style={{ color: '#a78bfa' }} />
              <h2 style={{
                margin: 0, fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Rising Stars
              </h2>
              <div style={{ flex: 1, height: 1, background: 'rgba(167,139,250,0.18)', marginLeft: '0.5rem' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {RISING_STARS.map(user => (
                <div key={user.username}
                  onClick={() => navigate(`/user/${user.username}`)}
                  style={{
                    borderRadius: '1.25rem', padding: '1.25rem',
                    background: user.bg,
                    border: `1px solid ${user.border}`,
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem',
                    cursor: 'pointer', transition: 'all 0.22s ease', textAlign: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = user.color;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 32px ${user.border}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = user.border;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                    background: `radial-gradient(circle, ${user.bg.replace('0.10', '0.35')}, transparent 70%)`,
                    filter: 'blur(16px)', pointerEvents: 'none',
                  }} />
                  <img src={user.avatar} alt={user.username}
                    style={{ width: 52, height: 52, borderRadius: '50%', border: `1.5px solid ${user.border}`, objectFit: 'cover' }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 900, fontSize: '0.85rem', color: user.color }}>{user.username}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.62rem', color: 'rgba(220,200,255,0.55)', fontWeight: 600 }}>
                      {user.teas} teas · {user.joined}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.04em',
                    color: user.color, background: user.bg, border: `1px solid ${user.border}`,
                    borderRadius: 99, padding: '2px 10px',
                  }}>
                    {user.growth}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══ VIRAL VIEW ══ */}
        {activeFilter === 'viral' && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <Zap size={18} strokeWidth={2.5} style={{ color: '#e879f9' }} />
              <h2 style={{
                margin: 0, fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #e879f9, #38bdf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Going Viral
              </h2>
              <div style={{ flex: 1, height: 1, background: 'rgba(232,121,249,0.18)', marginLeft: '0.5rem' }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0.75rem',
            }}>
              {VIRAL_LIST.map(user => (
                <div key={user.rank}
                  onClick={() => navigate(`/user/${user.username}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '0.875rem 1.125rem', borderRadius: '1.25rem',
                    background: user.bg,
                    border: `1px solid ${user.border}`,
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    cursor: 'pointer', transition: 'all 0.22s ease',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 10px 28px ${user.border}`;
                    e.currentTarget.style.borderColor = user.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = user.border;
                  }}
                >
                  <div style={{
                    position: 'absolute', top: -16, right: -16, width: 60, height: 60,
                    background: `radial-gradient(circle, ${user.bg.replace('0.10', '0.35')}, transparent 70%)`,
                    filter: 'blur(12px)', pointerEvents: 'none',
                  }} />

                  <div style={{
                    position: 'absolute', top: 8, right: 10,
                    background: user.bg, border: `1px solid ${user.border}`,
                    borderRadius: 99, padding: '1px 7px',
                  }}>
                    <span style={{ fontSize: '0.52rem', fontWeight: 900, color: user.color, letterSpacing: '0.10em' }}>
                      {user.tag}
                    </span>
                  </div>

                  <span style={{ width: 28, fontSize: '0.82rem', fontWeight: 900, flexShrink: 0, color: user.color, textAlign: 'center' }}>
                    #{user.rank}
                  </span>

                  <img src={user.avatar} alt={user.username}
                    style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0, border: `1.5px solid ${user.border}`, objectFit: 'cover' }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 900, fontSize: '0.88rem', color: user.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.username}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.62rem', fontWeight: 700, color: 'rgba(220,200,255,0.55)', letterSpacing: '0.06em' }}>
                      {user.shares.toLocaleString()} shares · {user.teas} teas
                    </p>
                  </div>

                  <Zap size={16} style={{ color: user.color, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
