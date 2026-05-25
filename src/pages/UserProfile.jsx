import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Settings, Share, Grid, Play, Hash, X, Send, Award } from 'lucide-react';
import { toast } from 'sonner';
import { TeaPanel } from './Home';

/* ── Custom unfollow confirm alert ── */
function UnfollowAlert({ username, onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.70)',
      backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem' }} onClick={onCancel}>
      <div style={{ width: '100%', maxWidth: '22rem', borderRadius: '1.5rem', overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(20,0,40,0.98), rgba(12,0,28,0.99))',
        border: '1px solid rgba(168,85,247,0.30)',
        boxShadow: '0 8px 48px rgba(109,40,217,0.40)' }}
        onClick={e => e.stopPropagation()}>
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.75rem 1.5rem 1rem' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', marginBottom: '0.875rem',
            background: 'linear-gradient(135deg, #3b0764, #7e22ce)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 900, color: 'white',
            border: '3px solid rgba(232,121,249,0.35)',
            boxShadow: '0 0 20px rgba(232,121,249,0.25)' }}>
            {username[0].toUpperCase()}
          </div>
          <p style={{ margin: '0 0 0.375rem', fontWeight: 900, fontSize: '1rem', color: '#f3e8ff' }}>
            Unfollow @{username}?
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(192,132,252,0.55)', textAlign: 'center', lineHeight: 1.5 }}>
            Their teas will no longer appear in your feed.
          </p>
        </div>
        {/* Buttons */}
        <div style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}>
          <button onClick={onConfirm} style={{ width: '100%', padding: '0.875rem', background: 'none',
            border: 'none', borderBottom: '1px solid rgba(168,85,247,0.15)',
            color: '#f87171', fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer',
            letterSpacing: '0.02em' }}>
            Unfollow
          </button>
          <button onClick={onCancel} style={{ width: '100%', padding: '0.875rem', background: 'none',
            border: 'none', color: '#e9d5ff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const USER_TEAS = {
  spillqueen99: [
    { id: 'u1', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1610070835787-e209e94b56e2?w=400', title: 'POV: You found the group chat 💀', duration: '0:59' },
    { id: 'u2', type: 'text', content: 'The way they smiled to my face and then... 🐍' },
    { id: 'u3', type: 'long-video', thumbnail: 'https://images.unsplash.com/photo-1701933810995-3331d9ff463b?w=400', title: 'Full storytime: the betrayal arc', duration: '8:12' },
  ],
  officedrama_: [
    { id: 'u4', type: 'text', content: "My manager literally scheduled a 1-on-1 at 4:55 PM on a Friday. I'm shaking. 🤡" },
    { id: 'u5', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400', title: 'Office drama caught on camera 📸', duration: '0:45' },
  ],
};
const DEFAULT_TEAS = [
  { id: 'd1', type: 'text', content: 'This user has been spilling tea since day one ☕' },
  { id: 'd2', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400', title: 'Latest tea drop 🔥', duration: '0:30' },
];

const MOCK_STATS = {
  spillqueen99: { followers: 45200, upvotes: 89400 },
  officedrama_: { followers: 12800, upvotes: 23100 },
  teateller22:  { followers: 8900,  upvotes: 14200 },
  caught4k:     { followers: 31000, upvotes: 67800 },
  exfiles_:     { followers: 5600,  upvotes: 9300  },
};

const ALL_BADGES = [
  { id: 'viral',    emoji: '🔥', label: 'Viral Spiller',   desc: 'Tea reached 10k+ views',       color: '#f87171' },
  { id: 'daily',    emoji: '📅', label: 'Daily Active',    desc: '7-day login streak',            color: '#facc15' },
  { id: 'comments', emoji: '💬', label: 'Chatterbox',      desc: '100+ comments posted',          color: '#a78bfa' },
  { id: 'games',    emoji: '🎮', label: 'Game Master',     desc: 'Won 5 tea games',               color: '#4ade80' },
  { id: 'spill',    emoji: '☕', label: 'Tea Connoisseur', desc: 'Shared 50+ teas',               color: '#e879f9' },
  { id: 'upvote',   emoji: '⬆️', label: 'Crowd Favourite', desc: '1000+ total upvotes',           color: '#38bdf8' },
  { id: 'receipts', emoji: '📸', label: 'Receipt King',    desc: 'Shared 10+ receipt posts',      color: '#fb923c' },
  { id: 'drama',    emoji: '🎭', label: 'Drama Queen',     desc: 'Top drama category poster',     color: '#f472b6' },
];

/* Bitmoji-style SVG avatar */
function BitmojiAvatar({ username, size = 80, rotating = false }) {
  const colors = ['#e879f9','#a78bfa','#38bdf8','#4ade80','#facc15','#fb923c','#f472b6'];
  const color = colors[username.charCodeAt(0) % colors.length];
  const letter = username[0].toUpperCase();
  const style = rotating ? {
    animation: 'avatarSpin 6s linear infinite',
  } : {};
  return (
    <>
      <style>{`@keyframes avatarSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: size, height: size, borderRadius: '50%', position: 'relative', ...style }}>
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" fill={`${color}22`} stroke={color} strokeWidth="2"/>
          {/* Body */}
          <ellipse cx="40" cy="58" rx="18" ry="12" fill={`${color}44`}/>
          {/* Head */}
          <circle cx="40" cy="32" r="16" fill={`${color}66`} stroke={color} strokeWidth="1.5"/>
          {/* Eyes */}
          <circle cx="34" cy="30" r="2.5" fill="white"/>
          <circle cx="46" cy="30" r="2.5" fill="white"/>
          <circle cx="35" cy="31" r="1.2" fill="#1a0030"/>
          <circle cx="47" cy="31" r="1.2" fill="#1a0030"/>
          {/* Smile */}
          <path d="M34 37 Q40 42 46 37" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          {/* Hair */}
          <path d="M24 28 Q28 18 40 16 Q52 18 56 28" fill={color} opacity="0.8"/>
          {/* Letter initial */}
          <text x="40" y="70" textAnchor="middle" fontSize="9" fontWeight="900" fill={color} fontFamily="Inter,sans-serif">{letter}</text>
        </svg>
      </div>
    </>
  );
}

/* Message panel */
function MessagePanel({ username, onClose }) {
  const [msgs, setMsgs] = useState([
    { id: 1, from: username, text: 'Hey! Loved your latest tea ☕', time: '2m' },
    { id: 2, from: 'you', text: 'Thanks! More coming soon 🔥', time: '1m' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { id: Date.now(), from: 'you', text: input, time: 'now' }]);
    setInput('');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.80)',
      backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '44rem', height: '70vh', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(18,0,38,0.99), rgba(10,0,22,1))',
        borderRadius: '1.5rem 1.5rem 0 0', border: '1px solid rgba(168,85,247,0.28)',
        borderBottom: 'none', boxShadow: '0 -6px 40px rgba(109,40,217,0.30)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem',
          borderBottom: '1px solid rgba(168,85,247,0.15)', background: 'rgba(168,85,247,0.06)', flexShrink: 0 }}>
          <BitmojiAvatar username={username} size={36} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem', color: '#f3e8ff' }}>@{username}</p>
            <p style={{ margin: 0, fontSize: '0.62rem', color: 'rgba(192,132,252,0.50)', fontWeight: 600 }}>Direct Message</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)',
            borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: 'rgba(192,132,252,0.80)' }}>
            <X size={14} />
          </button>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '1rem 1.25rem',
          display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {msgs.map(m => {
            const isMe = m.from === 'you';
            return (
              <div key={m.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                {!isMe && <BitmojiAvatar username={m.from} size={28} />}
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ padding: '0.5rem 0.875rem', borderRadius: isMe ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                    background: isMe ? 'linear-gradient(135deg, #3b0764, #7e22ce)' : 'rgba(30,0,55,0.70)',
                    border: `1px solid ${isMe ? 'rgba(167,139,250,0.28)' : 'rgba(168,85,247,0.15)'}`,
                    fontSize: '0.85rem', color: '#e9d5ff', lineHeight: 1.45 }}>
                    {m.text}
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: '0.58rem', color: 'rgba(192,132,252,0.35)',
                    textAlign: isMe ? 'right' : 'left' }}>{m.time}</p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        {/* Input */}
        <form onSubmit={send} style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem',
          borderTop: '1px solid rgba(168,85,247,0.15)', background: 'rgba(13,0,25,0.95)', flexShrink: 0 }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Message @${username}...`}
            style={{ flex: 1, borderRadius: '0.875rem', padding: '0.55rem 1rem',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(168,85,247,0.25)',
              color: '#f3e8ff', fontSize: '0.85rem', outline: 'none' }} />
          <button type="submit" style={{ padding: '0.55rem 1rem', borderRadius: '0.875rem',
            background: 'linear-gradient(135deg, #3b0764, #7e22ce)', border: 'none',
            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

/* Badges panel */
function BadgesPanel({ username, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.80)',
      backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '36rem', maxHeight: '80vh', overflowY: 'auto',
        background: 'linear-gradient(180deg, rgba(18,0,38,0.99), rgba(10,0,22,1))',
        borderRadius: '1.5rem', border: '1px solid rgba(168,85,247,0.28)',
        boxShadow: '0 8px 48px rgba(109,40,217,0.35)', padding: '1.5rem' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem', color: '#f3e8ff' }}>
            🏆 @{username}'s Badges
          </h2>
          <button onClick={onClose} style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)',
            borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: 'rgba(192,132,252,0.80)' }}>
            <X size={14} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {ALL_BADGES.map(b => (
            <div key={b.id} style={{ borderRadius: '1rem', padding: '1rem',
              background: `rgba(${b.color === '#f87171' ? '248,113,113' : b.color === '#facc15' ? '250,204,21' : b.color === '#a78bfa' ? '167,139,250' : b.color === '#4ade80' ? '74,222,128' : b.color === '#e879f9' ? '232,121,249' : b.color === '#38bdf8' ? '56,189,248' : b.color === '#fb923c' ? '251,146,60' : '244,114,182'},0.10)`,
              border: `1px solid ${b.color}33`, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: '1.75rem' }}>{b.emoji}</span>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.82rem', color: b.color }}>{b.label}</p>
              <p style={{ margin: 0, fontSize: '0.68rem', color: 'rgba(192,132,252,0.55)' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Minimal tea panel for profile teas - REPLACED WITH FULL TEAPANEL FROM HOME ── */

function TeaThumb({ tea, onOpen }) {
  if (tea.type === 'text') {
    return (
      <div onClick={() => onOpen(tea)} style={{ aspectRatio: '1/1', borderRadius: '0.75rem', background: 'linear-gradient(135deg, rgba(30,0,55,0.90), rgba(20,0,40,0.95))',
        border: '1px solid rgba(168,85,247,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0.75rem', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
        <Hash size={16} style={{ position: 'absolute', top: 8, left: 8, color: '#e879f9', opacity: 0.7 }} />
        <p style={{ margin: 0, fontSize: '0.72rem', color: '#e9d5ff', lineHeight: 1.4, textAlign: 'center',
          display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {tea.content}
        </p>
      </div>
    );
  }
  return (
    <div onClick={() => onOpen(tea)} style={{ aspectRatio: '1/1', borderRadius: '0.75rem', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
      <img src={tea.thumbnail} alt={tea.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,0,21,0.80) 0%, transparent 60%)' }} />
      {tea.type === 'long-video' && (
        <div style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(167,139,250,0.85)',
          borderRadius: 99, padding: '2px 7px', fontSize: '0.6rem', fontWeight: 900, color: 'white' }}>
          {tea.duration}
        </div>
      )}
      {tea.type === 'short-video' && (
        <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(232,121,249,0.85)',
          borderRadius: 99, padding: '2px 7px', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Play size={8} style={{ fill: 'white', color: 'white' }} />
          <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'white' }}>{tea.duration}</span>
        </div>
      )}
    </div>
  );
}

function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const allPosts = useSelector((state) => state.posts?.allPosts || []);
  
  // Get user's teas from allPosts or use mock data
  const userTeas = allPosts.filter(post => post.author === username);
  const teas = userTeas.length > 0 ? userTeas : (USER_TEAS[username] || DEFAULT_TEAS);
  
  const isOwnProfile = username === 'you' || username === 'ZennialSpill';
  const [following, setFollowing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [selectedTea, setSelectedTea] = useState(null);

  const s = MOCK_STATS[username] || { followers: 3200, upvotes: 7100 };
  const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  const handleFollow = () => {
    if (following) {
      setShowUnfollow(true);
    } else {
      setFollowing(true);
      toast.success(`Following @${username}! ☕`);
    }
  };

  const confirmUnfollow = () => {
    setFollowing(false);
    setShowUnfollow(false);
    toast.success(`Unfollowed @${username}`);
  };

  const handleViewProfile = (author) => {
    setSelectedTea(null);
    navigate(`/user/${author}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: 'white', position: 'relative', zIndex: 10 }}>

      {/* ── Sticky top navbar — rounded, margin top ── */}
      <div style={{
        position: 'sticky', top: '0.75rem', zIndex: 20,
        margin: '0.75rem 1rem 0',
        borderRadius: '1.25rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1.25rem',
        background: 'rgba(18,0,38,0.88)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(168,85,247,0.25)',
        boxShadow: '0 4px 24px rgba(109,40,217,0.22), inset 0 1px 0 rgba(232,121,249,0.10)',
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'rgba(168,85,247,0.12)',
          border: '1px solid rgba(168,85,247,0.22)', borderRadius: '50%', width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#e9d5ff' }}>
          <ArrowLeft size={16} />
        </button>
        <p style={{ margin: 0, fontWeight: 900, fontSize: '0.95rem', color: '#f3e8ff' }}>@{username}</p>
        <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied!'); }}
          style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)',
            borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#e9d5ff' }}>
          <Share size={15} />
        </button>
      </div>

      {/* ── Profile header ── */}
      <div style={{ padding: '1.5rem 1.25rem 0' }}>

        {/* Avatar row — bitmoji with slow rotation ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          {/* Rotating avatar */}
          <div style={{ position: 'relative', flexShrink: 0, width: 90, height: 90 }}>
            {/* Rotating gradient ring */}
            <div style={{
              position: 'absolute', inset: -4, borderRadius: '50%',
              background: 'conic-gradient(#e879f9, #a78bfa, #38bdf8, #4ade80, #e879f9)',
              animation: 'ringRotate 6s linear infinite',
            }} />
            <style>{`@keyframes ringRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            {/* White gap ring */}
            <div style={{ position: 'absolute', inset: -1, borderRadius: '50%', background: 'rgba(13,0,21,1)' }} />
            {/* Bitmoji avatar */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <BitmojiAvatar username={username} size={90} />
            </div>
          </div>

          {/* Stats — only Teas + Followers (no Following) */}
          <div style={{ display: 'flex', gap: '2rem', flex: 1 }}>
            {[
              { label: 'Teas',      value: fmt(teas.length) },
              { label: 'Followers', value: fmt(s.followers) },
              { label: 'Upvotes',   value: fmt(s.upvotes)   },
            ].map(st => (
              <div key={st.label} style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontWeight: 900, fontSize: '1.2rem', color: '#f3e8ff' }}>{st.value}</p>
                <p style={{ margin: 0, fontSize: '0.62rem', fontWeight: 700, color: 'rgba(192,132,252,0.50)',
                  textTransform: 'uppercase', letterSpacing: '0.06em' }}>{st.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ margin: '0 0 2px', fontWeight: 800, fontSize: '0.95rem', color: '#f3e8ff' }}>{username}</p>
          <p style={{ margin: '0 0 4px', fontSize: '0.72rem', color: 'rgba(192,132,252,0.55)',
            fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>☕ Tea Spiller</p>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(220,200,255,0.70)', lineHeight: 1.5 }}>
            Spilling the hottest tea since forever 🔥 No cap, all receipts 📸
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {isOwnProfile ? (
            <>
              <button onClick={() => toast.info('Edit profile coming soon')} style={{
                flex: 1, padding: '0.5rem', borderRadius: '0.625rem', fontWeight: 800,
                fontSize: '0.8rem', background: 'rgba(168,85,247,0.15)',
                border: '1px solid rgba(168,85,247,0.30)', color: '#e9d5ff', cursor: 'pointer' }}>
                Edit Profile
              </button>
              <button onClick={() => setShowBadges(true)} style={{
                flex: 1, padding: '0.5rem', borderRadius: '0.625rem', fontWeight: 800,
                fontSize: '0.8rem', background: 'rgba(250,204,21,0.10)',
                border: '1px solid rgba(250,204,21,0.28)', color: '#facc15', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <Award size={14} /> Badges
              </button>
              <button onClick={() => toast.info('Settings coming soon')} style={{
                padding: '0.5rem 0.875rem', borderRadius: '0.625rem', fontWeight: 800,
                fontSize: '0.8rem', background: 'rgba(168,85,247,0.10)',
                border: '1px solid rgba(168,85,247,0.22)', color: '#e9d5ff', cursor: 'pointer' }}>
                <Settings size={15} />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleFollow} style={{
                padding: '0.4rem 0.875rem', borderRadius: '0.625rem', fontWeight: 800,
                fontSize: '0.72rem',
                background: following ? 'rgba(168,85,247,0.15)' : 'linear-gradient(135deg, #3b0764, #7e22ce)',
                border: following ? '1px solid rgba(168,85,247,0.30)' : 'none',
                color: following ? 'rgba(192,132,252,0.80)' : 'white', cursor: 'pointer',
                transition: 'all 0.18s', whiteSpace: 'nowrap' }}>
                {following ? 'Following ✓' : 'Follow'}
              </button>
              <button onClick={() => setShowMessage(true)} style={{
                flex: 1, padding: '0.55rem', borderRadius: '0.625rem', fontWeight: 800,
                fontSize: '0.85rem', background: 'rgba(168,85,247,0.12)',
                border: '1px solid rgba(168,85,247,0.28)', color: '#e9d5ff', cursor: 'pointer',
                whiteSpace: 'nowrap' }}>
                💬 Message
              </button>
              <button onClick={() => setShowBadges(true)} style={{
                flex: 1, padding: '0.55rem', borderRadius: '0.625rem', fontWeight: 800,
                fontSize: '0.85rem', background: 'rgba(250,204,21,0.10)',
                border: '1px solid rgba(250,204,21,0.28)', color: '#facc15', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, whiteSpace: 'nowrap' }}>
                <Award size={15} /> Badges
              </button>
            </>
          )}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(168,85,247,0.18)', marginBottom: '1rem' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, padding: '0.625rem 0', borderBottom: '2px solid #e879f9' }}>
            <Grid size={15} style={{ color: '#e879f9' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#e879f9',
              letterSpacing: '0.06em', textTransform: 'uppercase' }}>Teas</span>
          </div>
        </div>
      </div>

      {/* Tea grid */}
      <div style={{ padding: '0 1.25rem 5rem' }}>
        {teas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👻</p>
            <p style={{ color: 'rgba(192,132,252,0.50)', fontWeight: 700 }}>No teas spilled yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem' }}>
            {teas.map(tea => <TeaThumb key={tea.id} tea={tea} onOpen={setSelectedTea} />)}
          </div>
        )}
      </div>

      {showMessage  && <MessagePanel username={username} onClose={() => setShowMessage(false)} />}
      {showBadges   && <BadgesPanel  username={username} onClose={() => setShowBadges(false)} />}
      {showUnfollow && <UnfollowAlert username={username} onConfirm={confirmUnfollow} onCancel={() => setShowUnfollow(false)} />}
      {selectedTea  && <TeaPanel post={selectedTea} onClose={() => setSelectedTea(null)} onViewProfile={handleViewProfile} />}
    </div>
  );
}

export default UserProfile;
