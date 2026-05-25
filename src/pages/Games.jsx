import { Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';

const GAMES = [
  { emoji: '🎯', name: 'Tea Trivia',    desc: 'Test your drama knowledge. Guess the gossip, earn points.',  color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)', tag: 'QUIZ' },
  { emoji: '🃏', name: 'Spill Cards',   desc: 'A card battle where the hottest tea wins the round.',        color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)', tag: 'CARDS' },
  { emoji: '🔮', name: 'Tea Oracle',    desc: 'Predict who will get cancelled next. Earn if you\'re right.', color: '#38bdf8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)',  tag: 'PREDICT' },
  { emoji: '🎲', name: 'Drama Dice',    desc: 'Roll the dice and react to random drama scenarios.',          color: '#4ade80', bg: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.28)',  tag: 'RANDOM' },
  { emoji: '🧩', name: 'Tea Puzzle',    desc: 'Unscramble the tea. Fastest solver gets the crown.',          color: '#facc15', bg: 'rgba(250,204,21,0.10)',  border: 'rgba(250,204,21,0.28)',  tag: 'PUZZLE' },
  { emoji: '🏆', name: 'Spill Race',    desc: 'Race to spill the most tea before time runs out.',            color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.28)',  tag: 'RACE' },
  { emoji: '🎭', name: 'Drama King',    desc: 'Vote on the most dramatic tea. Community decides the winner.', color: '#f472b6', bg: 'rgba(244,114,182,0.10)', border: 'rgba(244,114,182,0.28)', tag: 'VOTE' },
  { emoji: '🕵️', name: 'Tea Detective', desc: 'Find the leak. Deduce who spilled the tea first.',            color: '#34d399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.28)',  tag: 'MYSTERY' },
  { emoji: '💬', name: 'Hot Takes',     desc: 'Submit your hottest take. The crowd votes. You debate.',      color: '#c084fc', bg: 'rgba(192,132,252,0.10)', border: 'rgba(192,132,252,0.28)', tag: 'DEBATE' },
];

function Games() {
  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>

      {/* Header — Explore style */}
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
        <div style={{ display: 'flex', alignItems: 'center', padding: '1.25rem 1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.75rem',
              background: 'rgba(232,121,249,0.15)', border: '1px solid rgba(232,121,249,0.25)' }}>
              <Gamepad2 size={20} strokeWidth={3} style={{ color: '#e879f9' }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Tea Games
              </h1>
              <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em',
                textTransform: 'uppercase', color: 'rgba(192,132,252,0.45)' }}>Play, Compete and Spill</p>
            </div>
          </div>
        </div>
      </header>

      {/* Game cards grid */}
      <div style={{ padding: '1.5rem 1.25rem 5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {GAMES.map((game) => (
          <div key={game.name}
            style={{
              borderRadius: '1.25rem', padding: '1.5rem',
              background: game.bg,
              border: `1px solid ${game.border}`,
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              cursor: 'pointer', transition: 'all 0.22s ease',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
              position: 'relative', overflow: 'hidden',
            }}
            onClick={() => toast.info(`${game.name} coming soon! 🎮`)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 32px ${game.border}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80,
              background: `radial-gradient(circle, ${game.bg.replace('0.10', '0.35')}, transparent 70%)`,
              filter: 'blur(16px)', pointerEvents: 'none' }} />

            {/* Tag */}
            <div style={{ position: 'absolute', top: 12, right: 12,
              background: game.bg, border: `1px solid ${game.border}`,
              borderRadius: 99, padding: '2px 8px' }}>
              <span style={{ fontSize: '0.58rem', fontWeight: 900, color: game.color,
                letterSpacing: '0.10em' }}>{game.tag}</span>
            </div>

            {/* Emoji */}
            <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{game.emoji}</div>

            {/* Name + desc */}
            <div>
              <p style={{ margin: '0 0 0.375rem', fontWeight: 900, fontSize: '1.05rem',
                color: game.color, letterSpacing: '-0.01em' }}>{game.name}</p>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(220,200,255,0.65)',
                lineHeight: 1.55, fontWeight: 500 }}>{game.desc}</p>
            </div>

            {/* Play button */}
            <button
              onClick={e => { e.stopPropagation(); toast.info(`${game.name} coming soon! 🎮`); }}
              style={{
                marginTop: 'auto', padding: '0.55rem 1.25rem', borderRadius: 99,
                background: `linear-gradient(135deg, ${game.color}33, ${game.color}22)`,
                border: `1px solid ${game.border}`,
                color: game.color, fontWeight: 800, fontSize: '0.78rem',
                cursor: 'pointer', letterSpacing: '0.04em', alignSelf: 'flex-start',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${game.color}44`}
              onMouseLeave={e => e.currentTarget.style.background = `linear-gradient(135deg, ${game.color}33, ${game.color}22)`}
            >
              ▶ Play Now
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Games;
