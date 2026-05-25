import { Settings, LogOut, Edit2, Award, Share, User } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

// Colors borrowed from Games cards
const FLEX_BADGES = [
  { emoji: '👑', color: '#e879f9', bg: 'rgba(232,121,249,0.12)', border: 'rgba(232,121,249,0.30)' },
  { emoji: '🔥', color: '#fb923c', bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.30)'  },
  { emoji: '🐍', color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.30)'  },
  { emoji: '💅', color: '#f472b6', bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.30)' },
  { emoji: '🤡', color: '#facc15', bg: 'rgba(250,204,21,0.12)',  border: 'rgba(250,204,21,0.30)'  },
  { emoji: '🎯', color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.30)'  },
  { emoji: '💀', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.30)' },
  { emoji: '📸', color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.30)'  },
];

const STATS = [
  { emoji: '🔥', value: '156',  label: 'Viral', color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.28)'  },
  { emoji: '👀', value: '8.9M', label: 'Views', color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)' },
  { emoji: '👑', value: '#12',  label: 'Rank',  color: '#facc15', bg: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.28)'  },
];

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.posts?.userPosts || []);

  const handleAction = (action) => toast(`Action: ${action}`, { icon: '⚡' });
  const handleLogout = () => { dispatch(logout()); toast("Logged out. See ya! 👋"); };

  return (
    <div className="h-full flex flex-col pb-20 md:pb-0 relative z-10 font-sans text-white">

      {/* Header — Discover style, no logout icon */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(232,121,249,0.15)', border: '1px solid rgba(232,121,249,0.25)' }}>
              <User size={20} strokeWidth={3} style={{ color: '#e879f9' }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                My Base
              </h1>
              <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(192,132,252,0.45)' }}>Love Your Profile</p>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={() => handleAction("Share Profile")}
            style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(168,85,247,0.12)'}>
            <Share className="h-5 w-5" style={{ color: '#c084fc' }} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Profile card — Games card color: pink/purple tint, rounder border */}
            <div style={{ borderRadius: '2rem', padding: '2rem', position: 'relative', overflow: 'hidden', marginTop: '0.5rem', background: 'rgba(232,121,249,0.08)', border: '1px solid rgba(232,121,249,0.28)', boxShadow: '0 8px 32px rgba(232,121,249,0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 160, height: 160, background: 'radial-gradient(circle, rgba(232,121,249,0.18), transparent 70%)', filter: 'blur(24px)', pointerEvents: 'none' }} />

              {/* Top row: avatar left, Z+Award right */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>

                {/* Left: user avatar + name + handle + stalkers/following */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {/* Avatar circle */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', filter: 'blur(8px)', opacity: 0.5 }} />
                    <div style={{ position: 'relative', width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #050505', boxShadow: '0 4px 20px rgba(232,121,249,0.40)' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>Z</span>
                    </div>
                  </div>

                  {/* Name + handle + stats */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.2rem' }}>
                      <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#f3e8ff' }}>ZennialSpill</h2>
                      <button onClick={() => handleAction("Edit Profile")}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 10px', borderRadius: '0.5rem', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)', color: '#c084fc', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.22)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(168,85,247,0.12)'}>
                        <Edit2 style={{ width: 10, height: 10 }} /> Edit
                      </button>
                    </div>
                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(192,132,252,0.50)' }}>@viral_z</p>
                    {/* Stalkers / Following */}
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#f3e8ff', lineHeight: 1 }}>45.2k</p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(192,132,252,0.50)' }}>Stalkers</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#f3e8ff', lineHeight: 1 }}>12</p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(192,132,252,0.50)' }}>Following</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Z initial + Award badge in a row, top-right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(232,121,249,0.40)', boxShadow: '0 0 18px rgba(232,121,249,0.35)' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>Z</span>
                  </div>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(232,121,249,0.40)', boxShadow: '0 0 18px rgba(232,121,249,0.35)' }}>
                    <Award style={{ width: 26, height: 26, color: 'white' }} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Stats — smaller, equal gap */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', position: 'relative', zIndex: 10 }}>
                {STATS.map(s => (
                  <div key={s.label} style={{ borderRadius: '1.25rem', padding: '0.875rem 0.5rem', textAlign: 'center', background: s.bg, border: `1px solid ${s.border}`, backdropFilter: 'blur(12px)' }}>
                    <p style={{ fontSize: '1.75rem', marginBottom: '0.25rem', lineHeight: 1 }}>{s.emoji}</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 900, color: s.color, margin: 0 }}>{s.value}</p>
                    <p style={{ fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem', color: `${s.color}99` }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Posts — Games card color: blue tint, rounder border, taller */}
            <div style={{ borderRadius: '2rem', padding: '2rem', marginTop: '0.5rem', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', boxShadow: '0 4px 20px rgba(56,189,248,0.10)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f3e8ff' }}>My Posts</h3>
                <button
                  style={{ padding: '0.5rem 1.25rem', borderRadius: '1.5rem', background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.28)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.18s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(56,189,248,0.22)'; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.55)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(56,189,248,0.12)'; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.28)'; }}>
                  View All
                </button>
              </div>
              {userPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', borderRadius: '1.5rem', border: '2px dashed rgba(56,189,248,0.22)', minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontSize: '5rem', marginBottom: '1rem', opacity: 0.35, lineHeight: 1 }}>👻</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(192,132,252,0.55)', margin: 0 }}>It's a ghost town in here.</p>
                  <button onClick={() => navigate('/spill')}
                    style={{ marginTop: '1.75rem', marginBottom: '0.5rem', padding: '1rem 3rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 4px 18px rgba(232,121,249,0.35)', transition: 'all 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(232,121,249,0.55)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 18px rgba(232,121,249,0.35)'}>
                    Start Spilling
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {userPosts.slice(0, 6).map((post) => (
                    <div key={post.id} style={{ borderRadius: '1rem', overflow: 'hidden', background: 'rgba(30,0,55,0.50)', border: '1px solid rgba(56,189,248,0.15)', transition: 'all 0.2s' }}>
                      <div style={{ cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.parentElement.style.borderColor = 'rgba(56,189,248,0.45)'; e.currentTarget.parentElement.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.parentElement.style.borderColor = 'rgba(56,189,248,0.15)'; e.currentTarget.parentElement.style.transform = 'translateY(0)'; }}>
                        {post.type === 'text' ? (
                          <div style={{ padding: '1rem' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#e9d5ff', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                              {post.content}
                            </p>
                          </div>
                        ) : (
                          <div style={{ position: 'relative', aspectRatio: post.type === 'short-video' ? '9/16' : '16/9' }}>
                            <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,0,21,0.80) 0%, transparent 60%)' }} />
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(56,189,248,0.10)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(56,189,248,0.60)' }}>{post.category}</span>
                          <span style={{ fontSize: '0.65rem', color: 'rgba(192,132,252,0.40)' }}>{post.publishDate}</span>
                        </div>
                        <button onClick={() => navigate(`/tea-spread/${post.id}`)}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.75rem', 
                            background: 'linear-gradient(135deg, #e879f9, #a78bfa)', border: 'none',
                            color: 'white', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer',
                            textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,121,249,0.40)'}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                          Tea Spread
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Flex Case — green tint from Games, each badge its own color */}
            <div style={{ borderRadius: '2rem', padding: '1.25rem', marginTop: '0.5rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', boxShadow: '0 4px 20px rgba(74,222,128,0.10)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
              <h3 style={{ margin: '0 0 0.875rem 0.25rem', fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(74,222,128,0.85)' }}>Flex Case</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {FLEX_BADGES.map((b, i) => (
                  <div key={i}
                    style={{ aspectRatio: '1', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s ease', background: b.bg, border: `1px solid ${b.border}` }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = `0 6px 18px ${b.border}`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{b.emoji}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap + Settings & Logout row */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <button onClick={() => navigate('/settings')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 1rem', borderRadius: '1.25rem', cursor: 'pointer', transition: 'all 0.22s ease', background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.28)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(167,139,250,0.20)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.28)'; }}>
                <Settings style={{ width: 18, height: 18, color: '#a78bfa' }} strokeWidth={2.5} />
                <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a78bfa' }}>Settings</span>
              </button>

              <button onClick={handleLogout}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 1rem', borderRadius: '1.25rem', cursor: 'pointer', transition: 'all 0.22s ease', background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.28)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(248,113,113,0.20)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.28)'; }}>
                <LogOut style={{ width: 18, height: 18, color: '#f87171' }} strokeWidth={2.5} />
                <span style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#f87171' }}>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
