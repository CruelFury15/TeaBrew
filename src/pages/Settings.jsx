import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Shield, Eye, Bell, Cpu, Smartphone, Briefcase,
  Lock, Download, Trash2, Key, ToggleLeft, Users, UserX,
  MessageSquare, Tag, Filter, Repeat2, Heart, Volume2,
  Wifi, Camera, Accessibility, CreditCard, BarChart2, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

/* ── Shared toggle ── */
function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 99, border: 'none', cursor: 'pointer',
        background: value ? 'linear-gradient(135deg, #e879f9, #a78bfa)' : 'rgba(255,255,255,0.12)',
        position: 'relative', transition: 'all 0.22s ease', flexShrink: 0,
        boxShadow: value ? '0 0 10px rgba(232,121,249,0.40)' : 'none',
      }}>
      <div style={{
        position: 'absolute', top: 3, left: value ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: 'white',
        transition: 'left 0.22s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.30)',
      }} />
    </button>
  );
}

/* ── Section wrapper ── */
function Section({ title, subtitle, icon, color, bg, border, children }) {
  const SectionIcon = icon;
  return (
    <div style={{ borderRadius: '1.5rem', padding: '1.5rem', background: bg, border: `1px solid ${border}`, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100,
        background: `radial-gradient(circle, ${bg.replace(/[\d.]+\)$/, '0.35)')}, transparent 70%)`,
        filter: 'blur(20px)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
        <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: bg.replace(/[\d.]+\)$/, '0.25)'), border: `1px solid ${border}` }}>
          <SectionIcon size={18} strokeWidth={2.5} style={{ color }} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1rem', color, letterSpacing: '-0.01em' }}>{title}</h2>
          {subtitle && <p style={{ margin: 0, fontSize: '0.62rem', fontWeight: 600, color: `${color}88`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{subtitle}</p>}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* ── Row item ── */
function Row({ icon, label, desc, color, action, toggle, value, onChange, danger }) {
  const RowIcon = icon;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.875rem',
      padding: '0.875rem 1rem', borderRadius: '1rem',
      background: danger ? 'rgba(248,113,113,0.06)' : 'rgba(255,255,255,0.04)',
      border: danger ? '1px solid rgba(248,113,113,0.18)' : '1px solid rgba(255,255,255,0.07)',
      cursor: action ? 'pointer' : 'default', transition: 'all 0.18s ease',
    }}
    onClick={action}
    onMouseEnter={e => { if (action) { e.currentTarget.style.background = danger ? 'rgba(248,113,113,0.12)' : 'rgba(255,255,255,0.08)'; } }}
    onMouseLeave={e => { if (action) { e.currentTarget.style.background = danger ? 'rgba(248,113,113,0.06)' : 'rgba(255,255,255,0.04)'; } }}>
      {RowIcon && <RowIcon size={16} strokeWidth={2.5} style={{ color: danger ? '#f87171' : (color || 'rgba(192,132,252,0.60)'), flexShrink: 0 }} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: danger ? '#f87171' : '#e9d5ff' }}>{label}</p>
        {desc && <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: 'rgba(192,132,252,0.45)', fontWeight: 500 }}>{desc}</p>}
      </div>
      {toggle && <Toggle value={value} onChange={onChange} />}
      {action && !toggle && <ChevronRight size={14} style={{ color: 'rgba(192,132,252,0.35)', flexShrink: 0 }} />}
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [s, setS] = useState({
    twoFA: false, privateAccount: false, closeFriends: false,
    hideActive: false, hideRead: false, dmFollowersOnly: false,
    hideLikes: false, dataSaver: false, autoplay: true,
    hqUpload: false, highContrast: false, altText: false,
    hiddenWords: false, allowRemix: true, allowMentions: true,
    allowTags: true, screenTimeAlerts: false, creatorMode: false,
  });
  const toggle = (key) => setS(p => ({ ...p, [key]: !p[key] }));
  const act = (label) => toast(`${label}`, { icon: '⚡' });

  const SECTIONS = [
    {
      title: 'Identity & Security', subtitle: 'Account Core',
      icon: Shield, color: '#e879f9', bg: 'rgba(232,121,249,0.08)', border: 'rgba(232,121,249,0.25)',
      rows: [
        { icon: Key,        label: 'Change Password',          desc: 'Cryptographic password mutation',                  action: () => act('Change Password') },
        { icon: Lock,       label: 'Two-Factor Authentication', desc: '2FA via authenticator app or SMS',                toggle: true, value: s.twoFA,       onChange: () => toggle('twoFA') },
        { icon: Smartphone, label: 'Active Sessions',           desc: 'View and terminate active login sessions',         action: () => act('Active Sessions') },
        { icon: Download,   label: 'Download Your Data',        desc: 'Export JSON/CSV — GDPR/CCPA compliant',            action: () => act('Download Data') },
        { icon: Trash2,     label: 'Delete Account',            desc: 'Permanently wipe all your records',               action: () => act('Delete Account'), danger: true },
      ],
    },
    {
      title: 'Activity & History', subtitle: 'Behavioral Audit',
      icon: BarChart2, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)',
      rows: [
        { icon: Heart,      label: 'Liked Posts',               desc: 'View your full interaction ledger',               action: () => act('Liked Posts') },
        { icon: MessageSquare, label: 'Commented Posts',        desc: 'All posts you have commented on',                 action: () => act('Commented Posts') },
        { icon: Trash2,     label: 'Recently Deleted',          desc: '30-day TTL soft-delete recovery bin',             action: () => act('Trash') },
        { icon: Bell,       label: 'Screen Time Alerts',        desc: 'Daily usage reminders via push notification',     toggle: true, value: s.screenTimeAlerts, onChange: () => toggle('screenTimeAlerts') },
      ],
    },
    {
      title: 'Privacy Controls', subtitle: 'Visibility Matrix',
      icon: Eye, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.25)',
      rows: [
        { icon: Lock,       label: 'Private Account',           desc: 'Toggle public ↔ private instantly',               toggle: true, value: s.privateAccount, onChange: () => toggle('privateAccount') },
        { icon: Users,      label: 'Close Friends List',        desc: 'Restrict content to a trusted sub-graph',         toggle: true, value: s.closeFriends,   onChange: () => toggle('closeFriends') },
        { icon: UserX,      label: 'Blocked Accounts',          desc: 'Manage your block and restrict ACLs',             action: () => act('Blocked Accounts') },
        { icon: Eye,        label: 'Hide Active Status',        desc: 'Mask your WebSocket presence indicator',          toggle: true, value: s.hideActive,     onChange: () => toggle('hideActive') },
        { icon: Eye,        label: 'Hide Read Receipts',        desc: 'Disable DM read receipt delivery',                toggle: true, value: s.hideRead,       onChange: () => toggle('hideRead') },
      ],
    },
    {
      title: 'Interaction Firewall', subtitle: 'Traffic Shaping',
      icon: Filter, color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)',
      rows: [
        { icon: MessageSquare, label: 'DM Permissions',         desc: 'Followers only or route to message requests',     toggle: true, value: s.dmFollowersOnly, onChange: () => toggle('dmFollowersOnly') },
        { icon: Tag,        label: 'Allow @Mentions',           desc: 'Opt-in/out of mention vectors',                   toggle: true, value: s.allowMentions,  onChange: () => toggle('allowMentions') },
        { icon: Tag,        label: 'Allow Photo Tagging',       desc: 'Control who can tag you in media',                toggle: true, value: s.allowTags,      onChange: () => toggle('allowTags') },
        { icon: Filter,     label: 'Hidden Words',              desc: 'NLP-backed regex filter for abusive content',     toggle: true, value: s.hiddenWords,    onChange: () => toggle('hiddenWords') },
        { icon: Repeat2,    label: 'Allow Remixes',             desc: 'Let others stitch or remix your media',           toggle: true, value: s.allowRemix,     onChange: () => toggle('allowRemix') },
      ],
    },
    {
      title: 'Feed Calibration', subtitle: 'Algorithm Overrides',
      icon: Cpu, color: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.25)',
      rows: [
        { icon: Heart,      label: 'Hide Like Counts',          desc: 'Reduce vanity metric feedback loops',             toggle: true, value: s.hideLikes,      onChange: () => toggle('hideLikes') },
        { icon: Volume2,    label: 'Muted Accounts',            desc: 'Silenced follows — still in your feed ledger',    action: () => act('Muted Accounts') },
        { icon: Filter,     label: 'Not Interested Topics',     desc: 'Update your ML recommendation model',             action: () => act('Not Interested') },
        { icon: Users,      label: 'Favorites List',            desc: 'Force chronological feed for priority nodes',     action: () => act('Favorites') },
      ],
    },
    {
      title: 'Media & Accessibility', subtitle: 'Hardware Pipelines',
      icon: Smartphone, color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)',
      rows: [
        { icon: Wifi,       label: 'Data Saver',                desc: 'Downgrade media resolution on cellular',          toggle: true, value: s.dataSaver,      onChange: () => toggle('dataSaver') },
        { icon: Smartphone, label: 'Autoplay Videos',           desc: 'Auto-play in feed on Wi-Fi',                      toggle: true, value: s.autoplay,       onChange: () => toggle('autoplay') },
        { icon: Camera,     label: 'HQ Uploads',                desc: 'Force max-resolution on high-bandwidth',          toggle: true, value: s.hqUpload,       onChange: () => toggle('hqUpload') },
        { icon: Camera,     label: 'System Permissions',        desc: 'Camera, microphone, location OS settings',        action: () => act('Permissions') },
        { icon: Accessibility, label: 'High Contrast Mode',    desc: 'Forced high-contrast UI override',                toggle: true, value: s.highContrast,   onChange: () => toggle('highContrast') },
        { icon: Accessibility, label: 'Auto Alt-Text',         desc: 'AI-generated image descriptions',                 toggle: true, value: s.altText,        onChange: () => toggle('altText') },
      ],
    },
    {
      title: 'Creator & Monetization', subtitle: 'Professional Tools',
      icon: Briefcase, color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.25)',
      rows: [
        { icon: Briefcase,  label: 'Creator Mode',              desc: 'Unlock analytics, API access, and creator tools', toggle: true, value: s.creatorMode,    onChange: () => toggle('creatorMode') },
        { icon: BarChart2,  label: 'Analytics Dashboard',       desc: 'Telemetry and performance metrics',               action: () => act('Analytics') },
        { icon: CreditCard, label: 'Payout Methods',            desc: 'Revenue pipeline and subscription config',        action: () => act('Payouts') },
        { icon: Tag,        label: 'Branded Content Tools',     desc: 'Ad-revenue splits and partnership tagging',       action: () => act('Branded Content') },
      ],
    },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>

      {/* Header */}
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
          <button onClick={() => navigate('/profile')}
            style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(232,121,249,0.15)', border: '1px solid rgba(232,121,249,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,121,249,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(232,121,249,0.15)'}>
            <ArrowLeft size={20} strokeWidth={3} style={{ color: '#e879f9' }} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Settings
            </h1>
            <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em',
              textTransform: 'uppercase', color: 'rgba(192,132,252,0.45)' }}>Control Everything</p>
          </div>
        </div>
      </header>

      {/* Sections */}
      <div style={{ padding: '1.5rem 1rem 5rem', maxWidth: '52rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {SECTIONS.map(sec => (
          <Section key={sec.title} title={sec.title} subtitle={sec.subtitle} icon={sec.icon} color={sec.color} bg={sec.bg} border={sec.border}>
            {sec.rows.map(row => (
              <Row key={row.label} {...row} />
            ))}
          </Section>
        ))}
      </div>
    </div>
  );
}
