import { Search, TrendingUp, Hash, Flame, Star, UserPlus, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const trendingTopics = [
  { tag: 'TechLayoffs',        posts: '4.5k', heat: 98, color: '#f87171' },
  { tag: 'CelebrityDrama',     posts: '2.3k', heat: 95, color: '#e879f9' },
  { tag: 'OfficeTea',          posts: '1.8k', heat: 87, color: '#a78bfa' },
  { tag: 'RelationshipGossip', posts: '1.5k', heat: 82, color: '#38bdf8' },
  { tag: 'WorkplaceDrama',     posts: '1.2k', heat: 78, color: '#fb923c' },
  { tag: 'SchoolSpills',       posts: '980',  heat: 72, color: '#e879f9' },
  { tag: 'CancelledAgain',     posts: '3.1k', heat: 96, color: '#f472b6' },
  { tag: 'ExposedThread',      posts: '2.7k', heat: 93, color: '#facc15' },
  { tag: 'ViralReceipts',      posts: '2.0k', heat: 89, color: '#4ade80' },
  { tag: 'NightmareDate',      posts: '1.6k', heat: 84, color: '#c084fc' },
  { tag: 'BossFromHell',       posts: '1.4k', heat: 80, color: '#fb923c' },
  { tag: 'FriendshipOver',     posts: '1.1k', heat: 76, color: '#38bdf8' },
];

const POLLS = [
  {
    id: 1,
    badge: 'Hot Poll',
    question: 'Is it acceptable to text your boss on a weekend?',
    options: [
      { label: 'Yes, always online 💼', votes: 120 },
      { label: 'Only emergencies 🚨',   votes: 450 },
      { label: 'NEVER. 🛑',             votes: 430 },
    ],
  },
  {
    id: 2,
    badge: 'Drama Poll',
    question: 'Would you expose a friend who cheated on their partner?',
    options: [
      { label: 'Yes, truth always wins 🔥', votes: 680 },
      { label: 'No, not my business 🤐',    votes: 310 },
      { label: 'Depends on the situation',  votes: 210 },
    ],
  },
  {
    id: 3,
    badge: 'Weekly Poll',
    question: 'What\'s the worst type of tea to spill?',
    options: [
      { label: 'Workplace drama 💼',    votes: 340 },
      { label: 'Celebrity gossip 🌟',   votes: 520 },
      { label: 'Friend group chaos 👥', votes: 290 },
    ],
  },
];

const CREATORS = [
  { username: 'spillqueen99',   bio: 'Serving receipts daily ☕ No cap, all facts.',       teas: 156, followers: '45.2k', badge: '🔥 Viral' },
  { username: 'teateller22',    bio: 'Storytime queen 🐍 Every tea has a twist.',           teas: 89,  followers: '28.1k', badge: '⭐ Rising' },
  { username: 'caught4k',       bio: 'Screenshots don\'t lie 📸 Exposing since 2022.',      teas: 203, followers: '61.4k', badge: '👑 Top Spiller' },
  { username: 'officedrama_',   bio: 'Your 9-5 is my content 💼 Workplace tea only.',       teas: 74,  followers: '19.8k', badge: '🆕 Emerging' },
  { username: 'exfiles_',       bio: 'Healing era? Not yet 💔 All the drama, all the time.', teas: 112, followers: '33.5k', badge: '🔥 Viral' },
  { username: 'scamwatch_',     bio: 'Exposing scammers one thread at a time 🧵',            teas: 67,  followers: '15.2k', badge: '🆕 Emerging' },
];

function PollCard({ poll }) {
  const [voted, setVoted] = useState(null);
  const total = poll.options.reduce((s, o) => s + o.votes, 0);

  const handleVote = (i) => {
    if (voted !== null) return;
    setVoted(i);
    toast.success(`Voted: ${poll.options[i].label}`);
  };

  return (
    <div style={{ borderRadius: '1.5rem', padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(30,0,55,0.75), rgba(20,0,40,0.85))',
      border: '1px solid rgba(168,85,247,0.22)', backdropFilter: 'blur(16px)',
      marginBottom: '1rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120,
        background: 'radial-gradient(circle, rgba(232,121,249,0.15), transparent 70%)',
        filter: 'blur(20px)', pointerEvents: 'none' }} />
      <div style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 99,
        background: 'linear-gradient(135deg, #e879f9, #a78bfa)', color: 'white',
        fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.10em',
        textTransform: 'uppercase', marginBottom: '0.75rem' }}>{poll.badge}</div>
      <h3 style={{ margin: '0 0 1rem', fontWeight: 800, fontSize: '0.95rem',
        lineHeight: 1.45, color: '#e9d5ff' }}>{poll.question}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {poll.options.map((opt, i) => {
          const pct = total ? Math.round((opt.votes / total) * 100) : 0;
          const isVoted = voted === i;
          const showResult = voted !== null;
          return (
            <button key={i} onClick={() => handleVote(i)} disabled={voted !== null}
              style={{
                width: '100%', borderRadius: '0.75rem', padding: '0.65rem 1rem',
                border: `1px solid ${isVoted ? 'rgba(232,121,249,0.60)' : 'rgba(168,85,247,0.22)'}`,
                background: showResult
                  ? `linear-gradient(to right, rgba(232,121,249,${isVoted ? 0.22 : 0.08}) ${pct}%, rgba(30,0,55,0.50) ${pct}%)`
                  : 'rgba(30,0,55,0.50)',
                cursor: voted !== null ? 'default' : 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.3s ease',
              }}>
              <span style={{ fontSize: '0.82rem', fontWeight: isVoted ? 800 : 500,
                color: isVoted ? '#f3e8ff' : '#e9d5ff' }}>{opt.label}</span>
              {showResult && (
                <span style={{ fontSize: '0.75rem', fontWeight: 900,
                  color: isVoted ? '#e879f9' : 'rgba(192,132,252,0.55)' }}>{pct}%</span>
              )}
            </button>
          );
        })}
      </div>
      {voted !== null && (
        <p style={{ margin: '0.625rem 0 0', fontSize: '0.65rem', color: 'rgba(192,132,252,0.45)',
          fontWeight: 700 }}>{total} votes total</p>
      )}
    </div>
  );
}

function CreatorCard({ creator, navigate, followedAll }) {
  const [following, setFollowing] = useState(false);
  
  // Sync with followedAll state
  const isFollowing = followedAll || following;
  
  return (
    <div style={{ borderRadius: '1.25rem', padding: '1.25rem',
      background: 'linear-gradient(135deg, rgba(30,0,55,0.70), rgba(20,0,40,0.80))',
      border: '1px solid rgba(168,85,247,0.20)', backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer',
      transition: 'all 0.2s ease' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,121,249,0.40)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.20)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      {/* Avatar */}
      <div onClick={() => navigate(`/user/${creator.username}`)}
        style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #3b0764, #7e22ce)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', fontWeight: 900, color: 'white',
          border: '2px solid rgba(232,121,249,0.35)' }}>
        {creator.username[0].toUpperCase()}
      </div>
      {/* Info */}
      <div style={{ flex: 1, overflow: 'hidden', minWidth: 0 }} onClick={() => navigate(`/user/${creator.username}`)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: 2, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#f3e8ff' }}>@{creator.username}</span>
          <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#e879f9',
            background: 'rgba(232,121,249,0.12)', border: '1px solid rgba(232,121,249,0.25)',
            borderRadius: 99, padding: '3px 10px', whiteSpace: 'nowrap' }}>{creator.badge}</span>
        </div>
        <p style={{ margin: '0 0 3px', fontSize: '0.72rem', color: 'rgba(220,200,255,0.60)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{creator.bio}</p>
        <p style={{ margin: 0, fontSize: '0.62rem', color: 'rgba(192,132,252,0.45)', fontWeight: 700 }}>
          {creator.followers} followers · {creator.teas} teas
        </p>
      </div>
      {/* Follow */}
      <button onClick={e => { e.stopPropagation(); setFollowing(v => !v); toast.success(isFollowing ? `Unfollowed @${creator.username}` : `Following @${creator.username}! ☕`); }}
        style={{ padding: '0.5rem 1rem', borderRadius: 99, flexShrink: 0,
          background: isFollowing ? 'rgba(168,85,247,0.15)' : 'linear-gradient(135deg, #3b0764, #7e22ce)',
          border: `1px solid ${isFollowing ? 'rgba(168,85,247,0.30)' : 'transparent'}`,
          color: isFollowing ? 'rgba(192,132,252,0.70)' : 'white',
          fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.18s', whiteSpace: 'nowrap' }}>
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

function Discover() {
  const [query, setQuery] = useState('');
  const [followedAll, setFollowedAll] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) toast(`Searching: ${query}`, { icon: '🔍' });
  };

  const handleFollowAll = () => {
    if (followedAll) {
      // Unfollow all
      setFollowedAll(false);
      toast.success('Unfollowed all creators');
    } else {
      // Follow all
      setFollowedAll(true);
      toast.success('Following all featured creators! ☕');
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>

      {/* ── Sticky header ── */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem',
          padding: '1.25rem 1.75rem', maxWidth: '100%' }}>
          {/* Explore title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.75rem',
              background: 'rgba(232,121,249,0.15)', border: '1px solid rgba(232,121,249,0.25)' }}>
              <Search size={20} strokeWidth={3} style={{ color: '#e879f9' }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Explore
              </h1>
              <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em',
                textTransform: 'uppercase', color: 'rgba(192,132,252,0.45)' }}>Discover Tea</p>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Search — right-aligned */}
          <form onSubmit={handleSearch} style={{ position: 'relative', width: '100%', maxWidth: 380 }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              color: 'rgba(168,85,247,0.50)', width: 16, height: 16, pointerEvents: 'none' }} />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search people, tags, drama..."
              style={{ width: '100%', borderRadius: 99, paddingLeft: '2.5rem', paddingRight: '1.25rem',
                paddingTop: '0.65rem', paddingBottom: '0.65rem', fontSize: '0.85rem', fontWeight: 500,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(168,85,247,0.28)',
                color: '#f3e8ff', outline: 'none', backdropFilter: 'blur(8px)',
                boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderColor = 'rgba(232,121,249,0.55)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.15)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(168,85,247,0.28)'; e.target.style.boxShadow = 'none'; }}
            />
          </form>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{ padding: '1.5rem 1.25rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

          {/* ── Trending ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.4rem', borderRadius: '0.625rem',
                background: 'rgba(168,85,247,0.18)', border: '1px solid rgba(168,85,247,0.28)' }}>
                <TrendingUp size={16} strokeWidth={3} style={{ color: '#e879f9' }} />
              </div>
              <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Trending Now
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {trendingTopics.map((topic, i) => (
                <button key={topic.tag}
                  onClick={() => {
                    // Map trending topic tags to filter categories
                    const categoryMap = {
                      'TechLayoffs': 'exposed',
                      'CelebrityDrama': 'drama',
                      'OfficeTea': 'receipts',
                      'RelationshipGossip': 'drama',
                      'WorkplaceDrama': 'drama',
                      'SchoolSpills': 'tea',
                      'CancelledAgain': 'cancelled',
                      'ExposedThread': 'exposed',
                      'ViralReceipts': 'receipts',
                      'NightmareDate': 'cringe',
                      'BossFromHell': 'exposed',
                      'FriendshipOver': 'drama',
                    };
                    const category = categoryMap[topic.tag] || 'viral';
                    navigate(`/?category=${category}`);
                  }}
                  style={{ width: '100%', borderRadius: '0.875rem', padding: '0.75rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    background: 'rgba(30,0,55,0.55)', border: '1px solid rgba(168,85,247,0.18)',
                    backdropFilter: 'blur(12px)', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.18s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${topic.color}55`; e.currentTarget.style.background = 'rgba(40,0,70,0.65)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.18)'; e.currentTarget.style.background = 'rgba(30,0,55,0.55)'; }}>
                  <span style={{ width: 22, fontWeight: 900, fontSize: '0.78rem',
                    color: 'rgba(168,85,247,0.35)', flexShrink: 0, textAlign: 'center' }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 1 }}>
                      <Hash size={13} strokeWidth={3} style={{ color: topic.color }} />
                      <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#e9d5ff' }}>{topic.tag}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em',
                      textTransform: 'uppercase', color: 'rgba(168,85,247,0.45)' }}>{topic.posts} posts</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Flame size={14} style={{ color: topic.color }} />
                    <span style={{ fontWeight: 800, fontSize: '0.8rem', color: topic.color }}>{topic.heat}°</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Polls ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.4rem', borderRadius: '0.625rem',
                background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.25)' }}>
                <Flame size={16} strokeWidth={3} style={{ color: '#f472b6' }} />
              </div>
              <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #f472b6, #e879f9)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Daily Polls
              </h2>
            </div>
            {POLLS.map(poll => <PollCard key={poll.id} poll={poll} />)}
          </div>

          {/* ── Creator Spotlight ── */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ padding: '0.4rem', borderRadius: '0.625rem',
                  background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.22)' }}>
                  <Star size={16} strokeWidth={3} style={{ color: '#facc15' }} />
                </div>
                <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #facc15, #fb923c)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Creator Spotlight
                </h2>
              </div>
              <button onClick={handleFollowAll}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0.4rem 0.875rem',
                  borderRadius: 99, background: followedAll ? 'rgba(168,85,247,0.15)' : 'linear-gradient(135deg, #3b0764, #7e22ce)',
                  border: followedAll ? '1px solid rgba(168,85,247,0.30)' : 'none',
                  color: followedAll ? 'rgba(192,132,252,0.70)' : 'white',
                  fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.18s' }}>
                <UserPlus size={13} />
                {followedAll ? 'Following All' : 'Follow All'}
              </button>
            </div>
            <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: 'rgba(192,132,252,0.50)',
              fontWeight: 600 }}>
              ✨ Weekly featured creators — rising stars in the tea community
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {CREATORS.map(c => <CreatorCard key={c.username} creator={c} navigate={navigate} followedAll={followedAll} />)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Discover;
