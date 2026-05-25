import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Droplet, Bell, User, Zap, Gamepad2 } from 'lucide-react';
import TeaFavicon from '../assets/Tea_Favicon.png';

const navItems = [
  { icon: Home,      label: 'Home',     path: '/home' },
  { icon: Compass,   label: 'Discover', path: '/discover' },
  { icon: Zap,       label: 'Hype',     path: '/leaderboard' },
  { icon: Droplet,   label: 'SPILL',    path: '/spill', isCenter: true },
  { icon: Bell,      label: 'Alerts',   path: '/alerts' },
  { icon: Gamepad2,  label: 'Games',    path: '/games' },
  { icon: User,      label: 'Profile',  path: '/profile' },
];

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', overflow: 'hidden' }}>
      {/* Animated mesh background */}
      <div className="mesh-bg" />

      {/* Floating decorative orbs */}
      <div className="orb" style={{ width: 500, height: 500, top: '-10%', left: '-5%',
        background: 'radial-gradient(circle, rgba(232,121,249,0.25), transparent 70%)', animationDelay: '0s' }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: '5%', right: '-5%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.25), transparent 70%)', animationDelay: '3s' }} />
      <div className="orb" style={{ width: 300, height: 300, top: '40%', left: '30%',
        background: 'radial-gradient(circle, rgba(244,114,182,0.18), transparent 70%)', animationDelay: '5s' }} />

      {/* ── Desktop Sidebar ── */}
      <style>{`
        .desktop-sidebar { display: none; }
        @media (min-width: 768px) { .desktop-sidebar { display: flex !important; } }
      `}</style>
      <aside className="desktop-sidebar" style={{
        width: 280,
        flexShrink: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 20,
        flexDirection: 'column',
        padding: '1.25rem 1rem',
        background: 'rgba(15,0,30,0.75)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        backdropFilter: 'blur(40px) saturate(200%)',
        borderRight: '1px solid rgba(168,85,247,0.20)',
        boxShadow: '4px 0 32px rgba(109,40,217,0.15), inset -1px 0 0 rgba(168,85,247,0.12)',
        overflowY: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0.5rem 1rem', marginTop: '-10px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              position: 'absolute', inset: -8, borderRadius: '1.25rem',
              background: 'linear-gradient(135deg, rgba(232,121,249,0.5), rgba(167,139,250,0.5))',
              filter: 'blur(12px)',
            }} />
            <img src={TeaFavicon} alt="TeaBrew" width={56} height={56}
              style={{ borderRadius: '0.875rem', position: 'relative', zIndex: 1,
                boxShadow: '0 2px 8px rgba(192,132,252,0.25)' }} />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.03em' }}
              className="text-gradient">TeaBrew</p>
            <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(192,132,252,0.55)' }}>Expose Everything</p>
          </div>
        </div>

        {/* Nav — scrollable middle section */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto', paddingBottom: '0.5rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (item.isCenter) {
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="btn-liquid btn-spill"
                  style={{
                    margin: '0.5rem 0',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    borderRadius: '0.875rem',
                    boxShadow: 'none',
                    transform: 'translateY(0)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'none'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = 'none'; }}
                  onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <Icon size={20} strokeWidth={3} />
                  {item.label}
                </button>
              );
            }

            return (
              <button key={item.path} onClick={() => navigate(item.path)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.6rem 1rem', borderRadius: '0.875rem',
                  border: isActive ? '1px solid rgba(168,85,247,0.35)' : '1px solid transparent',
                  background: isActive ? 'rgba(168,85,247,0.15)' : 'transparent',
                  boxShadow: isActive ? '0 4px 16px rgba(109,40,217,0.25), inset 0 1px 0 rgba(168,85,247,0.20)' : 'none',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = 'rgba(168,85,247,0.10)'; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; } }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#e9d5ff' : 'rgba(192,132,252,0.55)'} />
                  {isActive && (
                    <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'rgba(232,121,249,0.3)', filter: 'blur(6px)' }} />
                  )}
                </div>
                <span style={{ fontWeight: isActive ? 700 : 500, fontSize: '0.91rem',
                  letterSpacing: '0.01em', color: isActive ? '#e9d5ff' : 'rgba(192,132,252,0.55)' }}>
                  {item.label}
                </span>
                {isActive && (
                  <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                    boxShadow: '0 0 8px rgba(232,121,249,0.7)' }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* User chip — always visible at bottom */}
        <button onClick={() => navigate('/profile')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem', borderRadius: '1rem', cursor: 'pointer',
            background: 'rgba(30,0,55,0.60)',
            border: '1px solid rgba(168,85,247,0.25)',
            boxShadow: '0 2px 12px rgba(109,40,217,0.20)',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(50,0,80,0.70)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(30,0,55,0.60)'; }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '1rem', color: 'white',
            boxShadow: '0 4px 12px rgba(232,121,249,0.40)',
          }}>Z</div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '0.875rem', color: '#e9d5ff',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ZennialSpill</p>
            <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(192,132,252,0.55)' }}>Viral Poster</p>
          </div>
        </button>
      </aside>

      {/* ── Main content — offset by sidebar width on desktop ── */}
      <style>{`
        .main-content { 
          margin-left: 0;
          padding-bottom: calc(80px + env(safe-area-inset-bottom));
        }
        @media (min-width: 768px) { 
          .main-content { 
            margin-left: 280px;
            padding-bottom: 0;
          } 
        }
      `}</style>
      <main className="main-content" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden',
        position: 'relative', zIndex: 10, minHeight: '100vh' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          {children}
        </div>
      </main>

      {/* ── Mobile bottom nav ── */}
      <style>{`
        .mobile-bottom-nav { display: flex; }
        @media (min-width: 768px) { .mobile-bottom-nav { display: none !important; } }
      `}</style>
      <nav className="mobile-bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(15,0,30,0.95)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        backdropFilter: 'blur(32px) saturate(200%)',
        borderTop: '1px solid rgba(168,85,247,0.20)',
        boxShadow: '0 -4px 24px rgba(109,40,217,0.20)',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        flexDirection: 'column',
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          alignItems: 'flex-end',
          padding: '0.5rem 0.5rem 0',
          maxWidth: '100%',
          width: '100%',
          gap: '0.25rem',
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (item.isCenter) {
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  style={{
                    position: 'relative',
                    marginTop: '-2.5rem',
                    width: '100%',
                    maxWidth: 64,
                    height: 64,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'linear-gradient(135deg, #3b0764 0%, #6b21a8 35%, #7e22ce 60%, #86198f 100%)',
                    boxShadow: '0 8px 28px rgba(134,25,143,0.60), inset 0 1px 0 rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    outline: '4px solid rgba(13,0,21,1)',
                    outlineOffset: '-2px',
                    margin: '0 auto',
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Icon size={28} strokeWidth={3} color="white" />
                </button>
              );
            }

            return (
              <button key={item.path} onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  padding: '0.5rem 0.25rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isActive ? '#e9d5ff' : 'rgba(168,85,247,0.45)',
                  transition: 'color 0.2s ease',
                  minHeight: 60,
                  position: 'relative',
                }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <div style={{ 
                      position: 'absolute', 
                      inset: -4, 
                      borderRadius: '50%',
                      background: 'rgba(232,121,249,0.25)', 
                      filter: 'blur(4px)',
                      zIndex: -1,
                    }} />
                  )}
                </div>
                <span style={{ 
                  fontSize: '0.55rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase', 
                  color: isActive ? '#e9d5ff' : 'rgba(168,85,247,0.45)',
                  lineHeight: 1,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Layout;
