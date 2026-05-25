import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flame, Play, Hash, X, Heart, Bookmark, Share2, MessageCircle, ArrowUp, ArrowDown, Users } from 'lucide-react';
import { toast } from 'sonner';

const filterCategories = [
  { id: 'viral',     label: 'VIRAL',     icon: '🔥' },
  { id: 'receipts',  label: 'RECEIPTS',  icon: '📸' },
  { id: 'drama',     label: 'DRAMA',     icon: '🎭' },
  { id: 'cringe',    label: 'CRINGE',    icon: '😬' },
  { id: 'exposed',   label: 'EXPOSED',   icon: '🚨' },
  { id: 'tea',       label: 'HOT TEA',   icon: '☕' },
  { id: 'sus',       label: 'SUS',       icon: '👀' },
  { id: 'no-cap',    label: 'NO CAP',    icon: '🧢' },
  { id: 'slay',      label: 'SLAY',      icon: '💅' },
  { id: 'beef',      label: 'BEEF',      icon: '🤼' },
  { id: 'glow-up',   label: 'GLOW UP',   icon: '✨' },
  { id: 'cancelled', label: 'CANCELLED', icon: '❌' },
];

const mockPosts = [
  { id: '1',  type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1610070835787-e209e94b56e2?w=400', duration: '0:59',  title: "POV: You found the group chat where they talk about YOU 💀",                          temperature: 98,  sips: 2543,  spills: 456,  stirs: 892,  author: 'spillqueen99',     publishDate: 'Apr 3, 2026',  category: 'VIRAL'     },
  { id: '2',  type: 'text',        content: "My manager literally scheduled a 1-on-1 at 4:55 PM on a Friday. I'm shaking. If I get fired I'm exposing the ENTIRE slack history. 🤡",                                    temperature: 95,  sips: 5432,  spills: 1234, stirs: 2341, author: 'officedrama_',     publishDate: 'Apr 4, 2026',  category: 'RECEIPTS'  },
  { id: '3',  type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1701933810995-3331d9ff463b?w=600', duration: '10:24', title: "STORYTIME: How my bestie dated my brother and hid it for 2 YEARS 🐍",                temperature: 88,  sips: 3211,  spills: 678,  stirs: 1456, author: 'teateller22',      publishDate: 'Apr 2, 2026',  category: 'DRAMA'     },
  { id: '4',  type: 'text',        content: "Not the brand apologizing in the notes app with font size 10 😭😭 PLS be so serious right now.",                                                                          temperature: 75,  sips: 1120,  spills: 200,  stirs: 150,  author: 'brandwatch_',      publishDate: 'Apr 5, 2026',  category: 'CRINGE'    },
  { id: '5',  type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400', duration: '0:15',  title: "Caught in 4K 📸 Screenshot before this gets deleted!!",                             temperature: 99,  sips: 8900,  spills: 4000, stirs: 5600, author: 'caught4k',         publishDate: 'Apr 5, 2026',  category: 'EXPOSED'   },
  { id: '6',  type: 'text',        content: "The way my ex just posted 'healing era' after what THEY did to ME??? The audacity is astronomical 🤯",                                                                   temperature: 92,  sips: 4200,  spills: 890,  stirs: 1670, author: 'exfiles_',         publishDate: 'Apr 1, 2026',  category: 'DRAMA'     },
  { id: '7',  type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',   duration: '8:45',  title: "Exposing my toxic workplace: They made us work UNPAID overtime 😤",                  temperature: 94,  sips: 6700,  spills: 2100, stirs: 3400, author: 'worktea_anon',     publishDate: 'Mar 30, 2026', category: 'EXPOSED'   },
  { id: '8',  type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400', duration: '0:42', title: "When your friend's story doesn't match what they told you last week 👀",              temperature: 87,  sips: 3890,  spills: 920,  stirs: 1560, author: 'receipts_only',    publishDate: 'Apr 3, 2026',  category: 'SUS'       },
  { id: '9',  type: 'text',        content: "Just found out my roommate has been using my Netflix account to watch their shows... and they've been complaining about MY recommendations 💀",                           temperature: 79,  sips: 2340,  spills: 450,  stirs: 890,  author: 'roomie_drama',     publishDate: 'Apr 4, 2026',  category: 'CRINGE'    },
  { id: '10', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',   duration: '0:38',  title: "The receipts are RECEIPTING 📱 She said she was at home but...",                     temperature: 96,  sips: 7200,  spills: 3100, stirs: 4200, author: 'spillmaster_',     publishDate: 'Apr 5, 2026',  category: 'RECEIPTS'  },
  { id: '11', type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',   duration: '12:15', title: "FULL BREAKDOWN: Why I cut off my entire friend group (with screenshots)",             temperature: 91,  sips: 5600,  spills: 1800, stirs: 2900, author: 'friendshipover',   publishDate: 'Mar 28, 2026', category: 'DRAMA'     },
  { id: '12', type: 'text',        content: "Someone explain why my coworker just cc'd the ENTIRE company on an email calling out my 'attitude' ??? I'm about to reply all 🔥",                                      temperature: 93,  sips: 4900,  spills: 1500, stirs: 2200, author: 'workplacetea',     publishDate: 'Apr 4, 2026',  category: 'EXPOSED'   },
  { id: '13', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400', duration: '0:51', title: "My sister borrowed my dress and RUINED it... wait for the end 😱",                    temperature: 85,  sips: 3400,  spills: 780,  stirs: 1340, author: 'sisterspill_',     publishDate: 'Apr 2, 2026',  category: 'VIRAL'     },
  { id: '14', type: 'text',        content: "The influencer who scammed me just blocked me after I asked for a refund. Time to make a thread 🧵",                                                                     temperature: 89,  sips: 4100,  spills: 1100, stirs: 1900, author: 'scamwatch_',       publishDate: 'Apr 3, 2026',  category: 'CANCELLED' },
  { id: '15', type: 'long-video',  thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600', duration: '9:30', title: "I catfished my catfish and you won't BELIEVE what happened 🎣",                       temperature: 97,  sips: 9100,  spills: 4500, stirs: 6200, author: 'catfishstories',   publishDate: 'Mar 31, 2026', category: 'VIRAL'     },
  { id: '16', type: 'short-video', thumbnail: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',   duration: '0:29',  title: "POV: You accidentally sent the screenshot TO the person 💀💀💀",                    temperature: 100, sips: 12000, spills: 5600, stirs: 8900, author: 'accidentalspill',  publishDate: 'Apr 5, 2026',  category: 'RECEIPTS'  },
];

/* ── Helpers ── */
function formatCount(num) {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

/* ── Interactive metric button ── */
function InteractiveMetric({ icon, initialCount, actionName, activeColor }) {
  const [count, setCount] = useState(initialCount);
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!active) { setCount(c => c + 1); setActive(true); toast.success(`${actionName} added!`, { icon }); }
    else          { setCount(c => c - 1); setActive(false); }
  };

  return (
    <button onClick={handleClick} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'transform 0.15s' }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: active ? '1px solid rgba(232,121,249,0.60)' : '1px solid rgba(255,255,255,0.18)',
        background: active ? 'rgba(178,75,243,0.35)' : 'rgba(15,0,30,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: active ? 'scale(1.12)' : 'scale(1)',
        transition: 'all 0.18s ease',
        boxShadow: active ? '0 0 10px rgba(232,121,249,0.45)' : 'none',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '1rem' }}>{icon}</span>
      </div>
      <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.03em', color: active ? activeColor : 'rgba(220,200,255,0.75)' }}>
        {formatCount(count)}
      </span>
    </button>
  );
}

/* ── Heat gauge ── */
function HeatGauge({ temperature }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: 8, height: 72, background: 'rgba(15,0,30,0.80)', borderRadius: 99, border: '1px solid rgba(168,85,247,0.25)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: `${temperature}%`,
          background: 'linear-gradient(to top, #e879f9, #a78bfa, #f472b6)',
          borderRadius: 99,
          boxShadow: '0 0 8px rgba(232,121,249,0.60)',
          transition: 'height 1s ease-out',
        }} />
        <Flame size={10} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'white', filter: 'drop-shadow(0 0 3px rgba(232,121,249,0.8))' }} />
      </div>
      <span style={{ fontSize: '0.55rem', fontWeight: 800, color: 'rgba(232,121,249,0.70)', letterSpacing: '0.04em' }}>{temperature}°</span>
    </div>
  );
}

/* ── Actions + gauge overlay — pinned to very bottom of card ── */
function CardOverlay({ post }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '28px 12px 10px',
      background: 'linear-gradient(to top, rgba(13,0,21,0.95) 0%, rgba(13,0,21,0.60) 60%, transparent 100%)',
      zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <InteractiveMetric icon="👀" initialCount={post.sips}  actionName="View"    activeColor="#e879f9" />
        <InteractiveMetric icon="💬" initialCount={post.stirs} actionName="Comment" activeColor="#a78bfa" />
      </div>
      <HeatGauge temperature={post.temperature} />
    </div>
  );
}

/* ── Mock comments ── */
const MOCK_COMMENTS = [
  { id: 1, user: 'teaaddict_', text: 'NO WAY this actually happened 💀', likes: 234, time: '2h' },
  { id: 2, user: 'spillwatcher', text: 'The audacity... I cannot 😭', likes: 189, time: '3h' },
  { id: 3, user: 'dramaqueenx', text: 'We need a part 2 IMMEDIATELY', likes: 445, time: '4h' },
  { id: 4, user: 'receipts4ever', text: "Screenshots or it didn't happen 📸", likes: 312, time: '5h' },
  { id: 5, user: 'notmybusiness_', text: 'But also... totally my business 👀', likes: 567, time: '6h' },
];

const STICKERS = ['☕','🍵','💀','🔥','👀','😭','🤡','💅','🐍','🎭','📸','🚨','💜','✨','🧢'];
const REACTIONS = ['❤️','😂','😮','😢','🔥','👏'];

/* ── ChatRoom component ── */
function ChatRoom({ post, isAuthor, onClose }) {
  const CURRENT_USER = 'you';
  const [messages, setMessages] = useState([
    { id: 1, user: post.author, text: 'Welcome to the chatroom! ☕ Spill it here.', time: '2m', reactions: {}, replyTo: null },
    { id: 2, user: 'teaaddict_', text: 'OMG I cannot believe this happened 💀', time: '1m', reactions: { '❤️': ['spillwatcher'] }, replyTo: null },
    { id: 3, user: 'spillwatcher', text: 'We need receipts ASAP 📸', time: '30s', reactions: {}, replyTo: null },
  ]);
  const [members, setMembers] = useState([post.author, 'teaaddict_', 'spillwatcher', 'dramaqueenx', CURRENT_USER]);
  const [msgText, setMsgText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [showStickers, setShowStickers] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [pollQ, setPollQ] = useState('');
  const [pollOpts, setPollOpts] = useState(['', '']);
  const [polls, setPolls] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [reactingTo, setReactingTo] = useState(null);
  const [voiceActive, setVoiceActive] = useState(false);

  // Auto-delete after 2 days (shown as countdown)
  const expiresIn = '1d 23h 42m';

  const sendMsg = (e) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), user: CURRENT_USER, text: msgText, time: 'now', reactions: {}, replyTo }]);
    setMsgText(''); setReplyTo(null);
  };
  const sendSticker = (s) => {
    setMessages(prev => [...prev, { id: Date.now(), user: CURRENT_USER, text: s, time: 'now', reactions: {}, replyTo: null, isSticker: true }]);
    setShowStickers(false);
  };
  const addReaction = (msgId, emoji) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== msgId) return m;
      const r = { ...m.reactions };
      if (!r[emoji]) r[emoji] = [];
      if (r[emoji].includes(CURRENT_USER)) r[emoji] = r[emoji].filter(u => u !== CURRENT_USER);
      else r[emoji] = [...r[emoji], CURRENT_USER];
      if (r[emoji].length === 0) delete r[emoji];
      return { ...m, reactions: r };
    }));
    setReactingTo(null);
  };
  const removeMember = (user) => {
    if (!isAuthor || user === post.author) return;
    setMembers(prev => prev.filter(m => m !== user));
    toast.success(`@${user} removed from chatroom`);
  };
  const submitPoll = (e) => {
    e.preventDefault();
    if (!pollQ.trim() || pollOpts.filter(o => o.trim()).length < 2) return;
    setPolls(prev => [...prev, { id: Date.now(), q: pollQ, opts: pollOpts.filter(o => o.trim()).map(o => ({ text: o, votes: [] })) }]);
    setMessages(prev => [...prev, { id: Date.now(), user: CURRENT_USER, text: `📊 Poll: ${pollQ}`, time: 'now', reactions: {}, replyTo: null, isPoll: true, pollId: Date.now() - 1 }]);
    setPollQ(''); setPollOpts(['', '']); setShowPoll(false);
    toast.success('Poll created!');
  };
  const votePoll = (pollId, optIdx) => {
    setPolls(prev => prev.map(p => {
      if (p.id !== pollId) return p;
      return { ...p, opts: p.opts.map((o, i) => ({
        ...o, votes: i === optIdx
          ? (o.votes.includes(CURRENT_USER) ? o.votes : [...o.votes, CURRENT_USER])
          : o.votes.filter(v => v !== CURRENT_USER)
      }))};
    }));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200,
      top: 0, bottom: 0, left: 280, right: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '72rem', height: '88vh', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(15,0,35,0.99) 0%, rgba(8,0,20,1) 100%)',
        borderRadius: '1.75rem 1.75rem 0 0', border: '1px solid rgba(56,189,248,0.30)',
        borderBottom: 'none', boxShadow: '0 -8px 48px rgba(56,189,248,0.20)', overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.25rem', borderBottom: '1px solid rgba(56,189,248,0.15)',
          background: 'rgba(56,189,248,0.06)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80',
              boxShadow: '0 0 8px rgba(74,222,128,0.80)' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 900, fontSize: '0.9rem', color: '#e0f2fe' }}>
                ☕ {post.title?.slice(0, 30) || 'Tea'} — Chatroom
              </p>
              <p style={{ margin: 0, fontSize: '0.65rem', color: 'rgba(56,189,248,0.60)', fontWeight: 700 }}>
                {members.length} members · expires in {expiresIn}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={() => setShowMembers(v => !v)} style={{ background: 'rgba(56,189,248,0.12)',
              border: '1px solid rgba(56,189,248,0.25)', borderRadius: '0.625rem', padding: '0.35rem 0.75rem',
              color: '#38bdf8', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}>
              👥 {members.length}
            </button>
            {isAuthor && <button onClick={() => { onClose(); toast.success('Chatroom deleted'); }}
              style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)',
                borderRadius: '0.625rem', padding: '0.35rem 0.75rem', color: '#f87171',
                fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}>
              🗑 Delete
            </button>}
            <button onClick={onClose} style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(192,132,252,0.80)' }}>
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Members panel */}
        {showMembers && (
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(56,189,248,0.12)',
            background: 'rgba(56,189,248,0.04)', flexShrink: 0 }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.68rem', fontWeight: 800, color: 'rgba(56,189,248,0.60)',
              textTransform: 'uppercase', letterSpacing: '0.08em' }}>Members</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {members.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.20)',
                  borderRadius: 99, padding: '3px 10px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: m === post.author ? '#38bdf8' : '#e9d5ff' }}>
                    @{m}{m === post.author ? ' 👑' : ''}
                  </span>
                  {isAuthor && m !== post.author && m !== CURRENT_USER && (
                    <button onClick={() => removeMember(m)} style={{ background: 'none', border: 'none',
                      cursor: 'pointer', color: '#f87171', fontSize: '0.65rem', padding: 0, lineHeight: 1 }}>✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Polls */}
        {polls.length > 0 && (
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(56,189,248,0.12)', flexShrink: 0 }}>
            {polls.map(poll => {
              const total = poll.opts.reduce((s, o) => s + o.votes.length, 0);
              return (
                <div key={poll.id} style={{ background: 'rgba(56,189,248,0.06)', borderRadius: '0.875rem',
                  border: '1px solid rgba(56,189,248,0.18)', padding: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: '0.82rem', color: '#e0f2fe' }}>📊 {poll.q}</p>
                    {isAuthor && (
                      <button onClick={() => setPolls(prev => prev.filter(p => p.id !== poll.id))}
                        style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)',
                          borderRadius: '0.5rem', padding: '2px 8px', color: '#f87171',
                          fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer' }}>
                        🗑 Delete
                      </button>
                    )}
                  </div>
                  {poll.opts.map((opt, i) => {
                    const pct = total ? Math.round((opt.votes.length / total) * 100) : 0;
                    const voted = opt.votes.includes(CURRENT_USER);
                    return (
                      <button key={i} onClick={() => votePoll(poll.id, i)} style={{
                        width: '100%', marginBottom: 4, padding: '0.4rem 0.75rem', borderRadius: '0.5rem',
                        border: `1px solid ${voted ? 'rgba(56,189,248,0.55)' : 'rgba(56,189,248,0.20)'}`,
                        background: `linear-gradient(to right, rgba(56,189,248,${voted ? 0.20 : 0.06}) ${pct}%, transparent ${pct}%)`,
                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      }}>
                        <span style={{ fontSize: '0.78rem', color: '#e0f2fe', fontWeight: voted ? 800 : 500 }}>{opt.text}</span>
                        <span style={{ fontSize: '0.68rem', color: 'rgba(56,189,248,0.70)', fontWeight: 700 }}>{pct}%</span>
                      </button>
                    );
                  })}
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.62rem', color: 'rgba(56,189,248,0.45)' }}>{total} votes</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {messages.map(msg => {
            const isMe = msg.user === CURRENT_USER;
            const replyMsg = msg.replyTo ? messages.find(m => m.id === msg.replyTo) : null;
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                {replyMsg && (
                  <div style={{ fontSize: '0.65rem', color: 'rgba(56,189,248,0.55)', background: 'rgba(56,189,248,0.08)',
                    borderLeft: '2px solid rgba(56,189,248,0.40)', padding: '2px 8px', borderRadius: '0 4px 4px 0',
                    marginBottom: 2, maxWidth: '80%' }}>
                    ↩ @{replyMsg.user}: {replyMsg.text.slice(0, 40)}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, flexDirection: isMe ? 'row-reverse' : 'row' }}>
                  {!isMe && (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 900, color: 'white' }}>
                      {msg.user[0].toUpperCase()}
                    </div>
                  )}
                  <div style={{ maxWidth: '72%' }}>
                    {!isMe && <p style={{ margin: '0 0 2px 4px', fontSize: '0.65rem', fontWeight: 800,
                      color: msg.user === post.author ? '#38bdf8' : 'rgba(192,132,252,0.65)' }}>
                      @{msg.user}{msg.user === post.author ? ' 👑' : ''}
                    </p>}
                    <div style={{ position: 'relative' }}>
                      <div style={{ padding: msg.isSticker ? '0.25rem' : '0.5rem 0.875rem',
                        borderRadius: isMe ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                        background: isMe ? 'linear-gradient(135deg, #3b0764, #7e22ce)' : 'rgba(30,0,55,0.70)',
                        border: `1px solid ${isMe ? 'rgba(167,139,250,0.30)' : 'rgba(56,189,248,0.15)'}`,
                        fontSize: msg.isSticker ? '2rem' : '0.85rem', color: '#e9d5ff', lineHeight: 1.4,
                        cursor: 'pointer',
                      }}
                      onDoubleClick={() => setReactingTo(msg.id)}>
                        {msg.text}
                      </div>
                      {/* Reactions */}
                      {Object.keys(msg.reactions).length > 0 && (
                        <div style={{ display: 'flex', gap: 3, marginTop: 3, flexWrap: 'wrap' }}>
                          {Object.entries(msg.reactions).map(([emoji, users]) => (
                            <button key={emoji} onClick={() => addReaction(msg.id, emoji)} style={{
                              background: users.includes(CURRENT_USER) ? 'rgba(232,121,249,0.20)' : 'rgba(30,0,55,0.60)',
                              border: `1px solid ${users.includes(CURRENT_USER) ? 'rgba(232,121,249,0.40)' : 'rgba(168,85,247,0.20)'}`,
                              borderRadius: 99, padding: '1px 6px', fontSize: '0.72rem', cursor: 'pointer',
                              color: '#e9d5ff', fontWeight: 700,
                            }}>{emoji} {users.length}</button>
                          ))}
                        </div>
                      )}
                      {/* Reaction picker */}
                      {reactingTo === msg.id && (
                        <div style={{ position: 'absolute', bottom: '100%', left: isMe ? 'auto' : 0, right: isMe ? 0 : 'auto',
                          background: 'rgba(20,0,40,0.95)', border: '1px solid rgba(168,85,247,0.30)',
                          borderRadius: '0.875rem', padding: '0.4rem 0.6rem', display: 'flex', gap: 4,
                          boxShadow: '0 4px 20px rgba(109,40,217,0.40)', zIndex: 10 }}>
                          {REACTIONS.map(r => (
                            <button key={r} onClick={() => addReaction(msg.id, r)} style={{
                              background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                              transition: 'transform 0.15s',
                            }} onMouseEnter={e => e.target.style.transform = 'scale(1.3)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}>{r}</button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 3, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                      <button onClick={() => setReplyTo(msg.id)} style={{ background: 'none', border: 'none',
                        cursor: 'pointer', fontSize: '0.6rem', color: 'rgba(192,132,252,0.45)', fontWeight: 700 }}>
                        ↩ Reply
                      </button>
                      <span style={{ fontSize: '0.6rem', color: 'rgba(192,132,252,0.35)' }}>{msg.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply indicator */}
        {replyTo && (
          <div style={{ padding: '0.4rem 1.25rem', background: 'rgba(56,189,248,0.06)',
            borderTop: '1px solid rgba(56,189,248,0.12)', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexShrink: 0 }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(56,189,248,0.70)' }}>
              ↩ Replying to @{messages.find(m => m.id === replyTo)?.user}
            </span>
            <button onClick={() => setReplyTo(null)} style={{ background: 'none', border: 'none',
              cursor: 'pointer', color: '#f87171', fontSize: '0.7rem' }}>✕</button>
          </div>
        )}

        {/* Sticker picker */}
        {showStickers && (
          <div style={{ padding: '0.5rem 1.25rem', borderTop: '1px solid rgba(168,85,247,0.15)',
            background: 'rgba(20,0,40,0.90)', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
            {STICKERS.map(s => (
              <button key={s} onClick={() => sendSticker(s)} style={{ background: 'rgba(168,85,247,0.10)',
                border: '1px solid rgba(168,85,247,0.20)', borderRadius: '0.5rem', padding: '0.3rem 0.5rem',
                fontSize: '1.3rem', cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
        )}

        {/* Poll creator */}
        {showPoll && isAuthor && (
          <form onSubmit={submitPoll} style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(56,189,248,0.15)',
            background: 'rgba(56,189,248,0.04)', flexShrink: 0 }}>
            <input value={pollQ} onChange={e => setPollQ(e.target.value)} placeholder="Poll question..."
              style={{ width: '100%', marginBottom: 6, borderRadius: '0.625rem', padding: '0.4rem 0.75rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(56,189,248,0.25)',
                color: '#e0f2fe', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' }} />
            {pollOpts.map((opt, i) => (
              <input key={i} value={opt} onChange={e => setPollOpts(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                placeholder={`Option ${i + 1}`}
                style={{ width: '100%', marginBottom: 4, borderRadius: '0.625rem', padding: '0.35rem 0.75rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(56,189,248,0.18)',
                  color: '#e0f2fe', fontSize: '0.78rem', outline: 'none', boxSizing: 'border-box' }} />
            ))}
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <button type="button" onClick={() => setPollOpts(prev => [...prev, ''])} style={{
                flex: 1, padding: '0.35rem', borderRadius: '0.5rem', background: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.20)', color: '#38bdf8', fontSize: '0.72rem',
                fontWeight: 700, cursor: 'pointer' }}>+ Option</button>
              <button type="submit" style={{ flex: 1, padding: '0.35rem', borderRadius: '0.5rem',
                background: 'rgba(56,189,248,0.18)', border: '1px solid rgba(56,189,248,0.35)',
                color: '#38bdf8', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer' }}>Post Poll</button>
            </div>
          </form>
        )}

        {/* Voice chat bar */}
        {voiceActive && (
          <div style={{ padding: '0.5rem 1.25rem', borderTop: '1px solid rgba(74,222,128,0.20)',
            background: 'rgba(74,222,128,0.06)', display: 'flex', alignItems: 'center',
            gap: '0.75rem', flexShrink: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80',
              boxShadow: '0 0 8px rgba(74,222,128,0.80)', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4ade80' }}>🎙 Voice Chat Active</span>
            <div style={{ display: 'flex', gap: 4, flex: 1 }}>
              {['spillqueen99', 'teaaddict_', 'you'].map(u => (
                <div key={u} style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.30)',
                  borderRadius: 99, padding: '2px 8px', fontSize: '0.62rem', fontWeight: 700, color: '#4ade80' }}>
                  🎙 @{u}
                </div>
              ))}
            </div>
            <button onClick={() => { setVoiceActive(false); toast.success('Left voice chat'); }}
              style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.30)',
                borderRadius: '0.5rem', padding: '3px 10px', color: '#f87171',
                fontSize: '0.68rem', fontWeight: 800, cursor: 'pointer' }}>
              Leave
            </button>
          </div>
        )}

        {/* Input bar */}
        <form onSubmit={sendMsg} style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem',
          borderTop: '1px solid rgba(168,85,247,0.15)', background: 'rgba(15,0,35,0.95)', flexShrink: 0 }}>
          <button type="button" onClick={() => { setShowStickers(v => !v); setShowPoll(false); }}
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.22)',
              borderRadius: '0.625rem', padding: '0 0.6rem', cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }}>
            😊
          </button>
          {isAuthor && (
            <button type="button" onClick={() => { setShowPoll(v => !v); setShowStickers(false); }}
              style={{ background: 'rgba(56,189,248,0.10)', border: '1px solid rgba(56,189,248,0.22)',
                borderRadius: '0.625rem', padding: '0 0.6rem', cursor: 'pointer', fontSize: '0.75rem',
                fontWeight: 800, color: '#38bdf8', flexShrink: 0 }}>
              📊
            </button>
          )}
          {/* Voice chat toggle */}
          <button type="button"
            onClick={() => { setVoiceActive(v => !v); toast.success(voiceActive ? 'Left voice chat' : 'Joined voice chat 🎙'); }}
            style={{
              background: voiceActive ? 'rgba(74,222,128,0.20)' : 'rgba(74,222,128,0.08)',
              border: `1px solid ${voiceActive ? 'rgba(74,222,128,0.55)' : 'rgba(74,222,128,0.22)'}`,
              borderRadius: '0.625rem', padding: '0 0.6rem', cursor: 'pointer',
              fontSize: '0.85rem', flexShrink: 0, color: '#4ade80',
              boxShadow: voiceActive ? '0 0 10px rgba(74,222,128,0.35)' : 'none',
            }}>
            🎙
          </button>
          <input value={msgText} onChange={e => setMsgText(e.target.value)}
            placeholder="Say something... ☕"
            style={{ flex: 1, borderRadius: '0.875rem', padding: '0.55rem 1rem',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(168,85,247,0.25)',
              color: '#f3e8ff', fontSize: '0.85rem', outline: 'none' }} />
          <button type="submit" style={{ padding: '0.55rem 1.1rem', borderRadius: '0.875rem',
            background: 'linear-gradient(135deg, #3b0764, #7e22ce)', border: 'none',
            color: 'white', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', flexShrink: 0 }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Tea panel — full detail view ── */
export function TeaPanel({ post, onClose, onViewProfile }) {
  const [likes, setLikes] = useState(post.sips);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [upvotes, setUpvotes] = useState(post.stirs);
  const [devotes, setDevotes] = useState(post.spills);
  const [upvoted, setUpvoted] = useState(false);
  const [devoted, setDevoted] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);

  const handleLike = () => {
    setLiked(v => !v);
    setLikes(v => liked ? v - 1 : v + 1);
  };
  const handleUpvote = () => {
    if (devoted) { setDevoted(false); setDevotes(v => v - 1); }
    setUpvoted(v => !v);
    setUpvotes(v => upvoted ? v - 1 : v + 1);
  };
  const handleDevote = () => {
    if (upvoted) { setUpvoted(false); setUpvotes(v => v - 1); }
    setDevoted(v => !v);
    setDevotes(v => devoted ? v - 1 : v + 1);
  };
  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments(prev => [{ id: Date.now(), user: 'you', text: commentText, likes: 0, time: 'now' }, ...prev]);
    setCommentText('');
    toast.success('Comment posted!');
  };
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Link copied!');
  };
  const [showChatRoom, setShowChatRoom] = useState(false);
  const CURRENT_USER = 'you'; // mock current user
  const isAuthor = CURRENT_USER === post.author || true; // for demo, allow author actions

  const typeLabel = post.type === 'short-video' ? '📱 Short Video' : post.type === 'long-video' ? '🎬 Long Video' : '📝 Text Tea';

  return (
    <>
    <div className="responsive-panel" style={{
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    }} onClick={onClose}>
      {/* Outer shell — handles border-radius, border, shadow. overflow:hidden clips scrollbar inside corners */}
      <div className="responsive-panel-content" style={{
        border: '1px solid rgba(168,85,247,0.30)',
        borderBottom: 'none',
        boxShadow: '0 -8px 48px rgba(109,40,217,0.35)',
        display: 'flex', flexDirection: 'column',
      }} onClick={e => e.stopPropagation()}>
        {/* Inner scroll container — no border-radius so scrollbar stays inside */}
        <div className="tea-panel-scroll" style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          background: 'linear-gradient(180deg, rgba(20,0,40,0.98) 0%, rgba(10,0,25,0.99) 100%)',
          padding: '0 0 2rem',
        }}>

        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem 0 0.25rem' }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(168,85,247,0.40)' }} />
        </div>
        <style>{`
          .tea-panel-scroll::-webkit-scrollbar { width: 4px; }
          .tea-panel-scroll::-webkit-scrollbar-track { background: transparent; }
          .tea-panel-scroll::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.35); border-radius: 99px; }
          .tea-panel-scroll::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.55); }
        `}</style>

        {/* Header */}
        <div className="responsive-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 0.3rem + 0.5vw, 0.6rem)', flexWrap: 'wrap' }}>
            <span className="text-responsive-xs" style={{ fontWeight: 800, letterSpacing: '0.1em', color: '#e879f9',
              background: 'rgba(232,121,249,0.12)', border: '1px solid rgba(232,121,249,0.25)',
              borderRadius: 99, padding: '2px clamp(8px, 6px + 1vw, 12px)' }}>{typeLabel}</span>
            <span className="text-responsive-xs" style={{ fontWeight: 700, color: 'rgba(192,132,252,0.55)',
              background: 'rgba(168,85,247,0.10)', borderRadius: 99, padding: '2px clamp(6px, 4px + 1vw, 10px)',
              border: '1px solid rgba(168,85,247,0.20)' }}>{post.category}</span>
          </div>
          <button onClick={onClose} className="tap-target" style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: '50%', width: 'clamp(28px, 26px + 1vw, 34px)', height: 'clamp(28px, 26px + 1vw, 34px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(192,132,252,0.80)', flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>

        {/* Tea meta */}
        <div className="responsive-container" style={{ paddingBottom: '1rem' }}>
          <h2 className="text-responsive-lg" style={{ margin: '0 0 0.5rem', fontWeight: 900, lineHeight: 1.3,
            color: '#f3e8ff', letterSpacing: '-0.02em' }}>
            {post.title || post.content?.slice(0, 80) + '...'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem)', flexWrap: 'wrap' }}>
            <button onClick={() => onViewProfile(post.author)} style={{
              fontSize: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)', fontWeight: 700, color: '#e879f9',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              textDecoration: 'underline', textDecorationColor: 'rgba(232,121,249,0.40)',
            }}>
              👤 @{post.author}
            </button>
            <span className="text-responsive-xs" style={{ color: 'rgba(192,132,252,0.50)' }}>📅 {post.publishDate}</span>
            <span className="text-responsive-xs" style={{ color: 'rgba(232,121,249,0.60)', fontWeight: 700 }}>
              🌡️ {post.temperature}° heat
            </span>
          </div>
        </div>

        {/* Content box */}
        <div className="responsive-container" style={{ marginBottom: '1.25rem' }}>
          <div style={{ borderRadius: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)', overflow: 'hidden',
            border: '1px solid rgba(168,85,247,0.25)', background: 'rgba(30,0,55,0.60)' }}>
            {post.type === 'text' && (
              <div className="spacing-responsive-lg">
                <Hash size={20} style={{ color: '#e879f9', marginBottom: 12 }} />
                <p className="text-responsive-base" style={{ margin: 0, fontWeight: 600, lineHeight: 1.75, color: '#e9d5ff' }}>
                  {post.content}
                </p>
              </div>
            )}
            {post.type === 'short-video' && (
              <div style={{ display: 'flex', justifyContent: 'center', background: '#000', padding: 'clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem) 0' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 'min(280px, 90vw)', aspectRatio: '9/16', background: '#000', borderRadius: '1rem', overflow: 'hidden' }}>
                  <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,0,21,0.80) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(232,121,249,0.90)', borderRadius: '50%', width: 'clamp(48px, 44px + 2vw, 60px)', height: 'clamp(48px, 44px + 2vw, 60px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 28px rgba(232,121,249,0.70)' }}>
                      <Play size={24} style={{ fill: 'white', color: 'white', marginLeft: 3 }} />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(232,121,249,0.85)',
                    borderRadius: 99, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Play size={10} style={{ fill: 'white', color: 'white' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white' }}>{post.duration}</span>
                  </div>
                </div>
              </div>
            )}
            {post.type === 'long-video' && (
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
                <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,0,21,0.70) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: -8, background: 'rgba(167,139,250,0.35)', borderRadius: '50%', filter: 'blur(12px)' }} />
                    <div style={{ position: 'relative', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', borderRadius: '50%', width: 'clamp(56px, 52px + 2vw, 68px)', height: 'clamp(56px, 52px + 2vw, 68px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(232,121,249,0.60)' }}>
                      <Play size={28} style={{ fill: 'white', color: 'white', marginLeft: 3 }} />
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(167,139,250,0.85)',
                  borderRadius: 99, padding: '3px 10px' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white' }}>{post.duration}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Engagement row — likes, comments, save, share */}
        <div className="responsive-container" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 0.4rem + 0.5vw, 0.875rem)', paddingBottom: '1.25rem', flexWrap: 'wrap' }}>
          {/* Like */}
          <button onClick={handleLike} className="tap-target" style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(4px, 3px + 0.5vw, 7px)', padding: 'clamp(0.4rem, 0.35rem + 0.25vw, 0.6rem) clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem)',
            borderRadius: 99, border: `1px solid ${liked ? 'rgba(232,121,249,0.60)' : 'rgba(168,85,247,0.25)'}`,
            background: liked ? 'rgba(232,121,249,0.18)' : 'rgba(30,0,55,0.50)',
            cursor: 'pointer', transition: 'all 0.18s ease',
          }}>
            <Heart size={16} style={{ fill: liked ? '#e879f9' : 'none', color: liked ? '#e879f9' : 'rgba(192,132,252,0.70)', transition: 'all 0.18s' }} />
            <span className="text-responsive-xs" style={{ fontWeight: 800, color: liked ? '#e879f9' : 'rgba(192,132,252,0.70)' }}>{formatCount(likes)}</span>
          </button>
          {/* Comments */}
          <button className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 3px + 0.5vw, 7px)', padding: 'clamp(0.4rem, 0.35rem + 0.25vw, 0.6rem) clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem)',
            borderRadius: 99, border: '1px solid rgba(168,85,247,0.25)', background: 'rgba(30,0,55,0.50)', cursor: 'pointer' }}>
            <MessageCircle size={16} style={{ color: 'rgba(192,132,252,0.70)' }} />
            <span className="text-responsive-xs" style={{ fontWeight: 800, color: 'rgba(192,132,252,0.70)' }}>{formatCount(comments.length)}</span>
          </button>
          {/* Save */}
          <button onClick={() => { setSaved(v => !v); toast.success(saved ? 'Removed from saved' : 'Saved! ☕'); }}
            className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 3px + 0.5vw, 7px)', padding: 'clamp(0.4rem, 0.35rem + 0.25vw, 0.6rem) clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem)',
              borderRadius: 99, border: `1px solid ${saved ? 'rgba(167,139,250,0.60)' : 'rgba(168,85,247,0.25)'}`,
              background: saved ? 'rgba(167,139,250,0.18)' : 'rgba(30,0,55,0.50)', cursor: 'pointer', transition: 'all 0.18s' }}>
            <Bookmark size={16} style={{ fill: saved ? '#a78bfa' : 'none', color: saved ? '#a78bfa' : 'rgba(192,132,252,0.70)' }} />
            <span className="text-responsive-xs" style={{ fontWeight: 800, color: saved ? '#a78bfa' : 'rgba(192,132,252,0.70)' }}>Save</span>
          </button>
          {/* Share */}
          <button onClick={handleShare} className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 3px + 0.5vw, 7px)', padding: 'clamp(0.4rem, 0.35rem + 0.25vw, 0.6rem) clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem)',
            borderRadius: 99, border: '1px solid rgba(168,85,247,0.25)', background: 'rgba(30,0,55,0.50)', cursor: 'pointer',
            marginLeft: 'auto' }}>
            <Share2 size={16} style={{ color: 'rgba(192,132,252,0.70)' }} />
            <span className="text-responsive-xs" style={{ fontWeight: 800, color: 'rgba(192,132,252,0.70)' }}>Share</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(168,85,247,0.15)', margin: '0 1.25rem 1.25rem' }} />

        {/* Action buttons row — Chatroom, Upvote, Devote */}
        <div style={{ display: 'flex', gap: '0.75rem', padding: '0 1.25rem 1.25rem' }}>
          {/* Chatroom */}
          <button onClick={() => setShowChatRoom(true)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '0.75rem 0.5rem', borderRadius: '1rem',
            border: '1px solid rgba(56,189,248,0.35)', background: 'rgba(56,189,248,0.08)',
            cursor: 'pointer', transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(56,189,248,0.08)'}>
            <Users size={20} style={{ color: '#38bdf8' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.04em' }}>Chatroom</span>
          </button>

          {/* Upvote */}
          <button onClick={handleUpvote} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '0.75rem 0.5rem',
            borderRadius: '1rem',
            border: `1px solid ${upvoted ? 'rgba(74,222,128,0.55)' : 'rgba(74,222,128,0.25)'}`,
            background: upvoted ? 'rgba(74,222,128,0.15)' : 'rgba(74,222,128,0.06)',
            cursor: 'pointer', transition: 'all 0.18s ease',
          }}>
            <ArrowUp size={20} style={{ color: upvoted ? '#4ade80' : 'rgba(74,222,128,0.65)' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: upvoted ? '#4ade80' : 'rgba(74,222,128,0.65)', letterSpacing: '0.04em' }}>
              Upvote
            </span>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: upvoted ? '#4ade80' : 'rgba(74,222,128,0.55)' }}>
              {formatCount(upvotes)}
            </span>
          </button>

          {/* Devote */}
          <button onClick={handleDevote} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '0.75rem 0.5rem',
            borderRadius: '1rem',
            border: `1px solid ${devoted ? 'rgba(248,113,113,0.55)' : 'rgba(248,113,113,0.25)'}`,
            background: devoted ? 'rgba(248,113,113,0.15)' : 'rgba(248,113,113,0.06)',
            cursor: 'pointer', transition: 'all 0.18s ease',
          }}>
            <ArrowDown size={20} style={{ color: devoted ? '#f87171' : 'rgba(248,113,113,0.65)' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: devoted ? '#f87171' : 'rgba(248,113,113,0.65)', letterSpacing: '0.04em' }}>
              Devote
            </span>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: devoted ? '#f87171' : 'rgba(248,113,113,0.55)' }}>
              {formatCount(devotes)}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(168,85,247,0.15)', margin: '0 1.25rem 1.25rem' }} />

        {/* Comments section */}
        <div style={{ padding: '0 1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'rgba(192,132,252,0.65)' }}>
            💬 Comments ({comments.length})
          </h3>

          {/* Comment input */}
          <form onSubmit={handleComment} style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <input
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add your take... ☕"
              maxLength={280}
              style={{
                flex: 1, borderRadius: '0.875rem', padding: '0.6rem 1rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(168,85,247,0.30)',
                color: '#f3e8ff', fontSize: '0.85rem', outline: 'none',
                backdropFilter: 'blur(8px)',
              }}
            />
            <button type="submit" style={{
              padding: '0.6rem 1.1rem', borderRadius: '0.875rem',
              background: 'linear-gradient(135deg, #3b0764, #7e22ce)',
              border: 'none', color: 'white', fontWeight: 800, fontSize: '0.8rem',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>Post</button>
          </form>

          {/* Comment list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {comments.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 900, color: 'white' }}>
                  {c.user[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, background: 'rgba(30,0,55,0.50)', borderRadius: '0.875rem',
                  padding: '0.625rem 0.875rem', border: '1px solid rgba(168,85,247,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#e879f9' }}>@{c.user}</span>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(192,132,252,0.40)' }}>{c.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#e9d5ff', lineHeight: 1.5 }}>{c.text}</p>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Heart size={11} style={{ color: 'rgba(232,121,249,0.55)' }} />
                    <span style={{ fontSize: '0.65rem', color: 'rgba(192,132,252,0.50)', fontWeight: 700 }}>{formatCount(c.likes)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>{/* end inner scroll */}
      </div>{/* end outer shell */}
    </div>
    {showChatRoom && <ChatRoom post={post} isAuthor={isAuthor} onClose={() => setShowChatRoom(false)} />}
    </>
  );
}

/* ── Content cards ── */
function ContentCard({ post, onOpen }) {
  const go = () => onOpen(post);

  /* Short video — 9:16 */
  if (post.type === 'short-video') {
    return (
      <div onClick={go} style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', cursor: 'pointer', aspectRatio: '9/16', border: '1.5px solid rgba(255,255,255,0.08)', transition: 'all 0.3s ease' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,121,249,0.55)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(232,121,249,0.28)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
        <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, transition: 'opacity 0.4s' }}
          onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.75} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,0,21,0.98) 0%, rgba(13,0,21,0.45) 45%, transparent 100%)' }} />
        {/* duration badge */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(232,121,249,0.85)', backdropFilter: 'blur(8px)', borderRadius: 99, padding: '3px 10px', boxShadow: '0 0 12px rgba(232,121,249,0.60)' }}>
          <Play size={10} style={{ fill: 'white', color: 'white' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white', letterSpacing: '0.06em' }}>{post.duration}</span>
        </div>
        {/* title — 78px above bottom so it clears the overlay */}
        <div style={{ position: 'absolute', bottom: 78, left: 12, right: 12 }}>
          <p style={{ margin: 0, fontWeight: 900, fontSize: '0.9rem', lineHeight: 1.35, color: 'white', letterSpacing: '-0.01em' }}>{post.title}</p>
        </div>
        <CardOverlay post={post} />
      </div>
    );
  }

  /* Text post */
  if (post.type === 'text') {
    return (
      <div onClick={go} style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', cursor: 'pointer', padding: '1.25rem 1rem 0 1.25rem', paddingBottom: 62, background: 'linear-gradient(135deg, rgba(30,0,55,0.80), rgba(20,0,40,0.90))', border: '1.5px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', transition: 'all 0.3s ease' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,121,249,0.55)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(178,75,243,0.22)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
        {/* ambient orb */}
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(232,121,249,0.22), transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />
        <Hash size={18} style={{ color: '#e879f9', marginBottom: 10 }} />
        <p style={{ margin: '0 0 8px 0', fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.65, color: '#e9d5ff' }}>{post.content}</p>
        <CardOverlay post={post} />
      </div>
    );
  }

  /* Long video — 16:9 + 100px extra height */
  if (post.type === 'long-video') {
    return (
      <div style={{ position: 'relative', width: '100%', paddingTop: 'calc(56.25% + 100px)', borderRadius: '1.5rem', overflow: 'hidden', cursor: 'pointer', border: '1.5px solid rgba(255,255,255,0.08)', transition: 'all 0.3s ease' }}
        onClick={go}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.55)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(167,139,250,0.28)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
        {/* inner absolute container fills the padded height */}
        <div style={{ position: 'absolute', inset: 0 }}>
        <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.70, transition: 'opacity 0.4s' }}
          onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.70} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,0,21,0.98) 0%, rgba(13,0,21,0.50) 45%, rgba(0,0,0,0.10) 100%)' }} />
        {/* play button — centered in upper 60% of card */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(167,139,250,0.40)', borderRadius: '50%', filter: 'blur(14px)' }} />
            <div style={{ position: 'relative', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(232,121,249,0.55)' }}>
              <Play size={20} style={{ fill: 'white', color: 'white', marginLeft: 2 }} />
            </div>
          </div>
        </div>
        {/* duration badge */}
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(167,139,250,0.85)', backdropFilter: 'blur(8px)', borderRadius: 99, padding: '3px 10px', boxShadow: '0 0 10px rgba(167,139,250,0.60)' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white', letterSpacing: '0.06em' }}>{post.duration}</span>
        </div>
        {/* title — 78px above bottom */}
        <div style={{ position: 'absolute', bottom: 78, left: 12, right: 12 }}>
          <p style={{ margin: 0, fontWeight: 900, fontSize: '0.9rem', lineHeight: 1.35, color: 'white', letterSpacing: '-0.01em' }}>{post.title}</p>
        </div>
        <CardOverlay post={post} />
        </div>{/* end inner absolute container */}
      </div>
    );
  }

  return null;
}

/* ── Home page ── */
function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const allPosts = useSelector((state) => state.posts?.allPosts || mockPosts);
  
  // Get active filter from URL or default to 'viral'
  const activeFilter = searchParams.get('category')?.toLowerCase() || 'viral';
  const [selectedPost, setSelectedPost] = useState(null);

  const handleViewProfile = (username) => {
    setSelectedPost(null);
    navigate(`/user/${username}`);
  };

  const setActiveFilter = (filter) => {
    navigate(`?category=${filter}`, { replace: true });
  };

  // Filter posts by active category
  const filteredPosts = allPosts.filter(post => {
    if (activeFilter === 'viral') return true; // Show all for viral
    // Match category with filter - handle both exact match and normalized match
    const postCategory = post.category.toLowerCase().replace(/\s+/g, '-');
    const filterCategory = activeFilter.toLowerCase();
    return postCategory === filterCategory || 
           post.category.toLowerCase() === filterCategory ||
           post.category.toLowerCase().replace(/\s+/g, '') === filterCategory.replace(/-/g, '');
  });

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }} className="pb-mobile-nav">
      {selectedPost && <TeaPanel post={selectedPost} onClose={() => setSelectedPost(null)} onViewProfile={handleViewProfile} />}

      {/* ── Sticky header — filter pills only ── */}
      <header className="responsive-header" style={{
        background: 'rgba(20,0,40,0.78)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        backdropFilter: 'blur(36px) saturate(200%)',
        border: '1px solid rgba(168,85,247,0.22)',
        boxShadow: '0 4px 28px rgba(109,40,217,0.22), inset 0 1px 0 rgba(232,121,249,0.10)',
      }}>

        {/* Filter pills row */}
        <div className="responsive-overflow-x" style={{ padding: '0.25rem 0' }}>
          <div style={{ display: 'flex', gap: 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)', minWidth: 'max-content', paddingRight: '1rem' }}>
            {filterCategories.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button key={filter.id} onClick={() => setActiveFilter(filter.id)}
                  className="no-select tap-target"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'clamp(0.3rem, 0.25rem + 0.25vw, 0.5rem)',
                    padding: 'clamp(0.4rem, 0.35rem + 0.25vw, 0.5rem) clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem)',
                    borderRadius: 9999,
                    border: isActive ? '2px solid rgba(232,121,249,0.70)' : '2px solid rgba(168,85,247,0.22)',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(232,121,249,0.28), rgba(167,139,250,0.22))'
                      : 'rgba(30,0,55,0.45)',
                    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: isActive ? '0 0 14px rgba(232,121,249,0.30)' : 'none',
                    cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                  }}>
                  <span className="text-responsive-base">{filter.icon}</span>
                  <span className="text-responsive-sm" style={{ fontWeight: 900, letterSpacing: '0.08em', color: isActive ? '#f3e8ff' : 'rgba(192,132,252,0.60)' }}>
                    {filter.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── Masonry feed ── */}
      <div className="responsive-container" style={{ paddingTop: 'clamp(1rem, 0.8rem + 1vw, 1.5rem)', paddingBottom: 'clamp(3rem, 2.5rem + 2.5vw, 5rem)' }}>
        <div className="responsive-masonry">
          {filteredPosts.map((post) => (
            <div key={post.id} className="responsive-masonry-item">
              <ContentCard post={post} onOpen={setSelectedPost} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
