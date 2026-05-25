import { Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { NotificationItem } from '../components/alerts/NotificationItem';

const mockNotifications = [
  {
    id: "1",
    type: "sip",
    user: "TeaLover_92",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif1&backgroundColor=8b5cf6",
    action: "viewed your story",
    post: "POV: You found the group chat...",
    time: "5m ago",
    unread: true,
  },
  {
    id: "2",
    type: "comment",
    user: "DramaQueen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif2&backgroundColor=7c3aed",
    action: "commented on your post",
    post: "literally shaking rn...",
    time: "15m ago",
    unread: true,
  },
  {
    id: "3",
    type: "follow",
    user: "SpicyBrew",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif3&backgroundColor=a855f7",
    action: "started following you",
    time: "1h ago",
    unread: false,
  },
  {
    id: "4",
    type: "badge",
    action: "Achievement Unlocked",
    badge: "VIRAL POSTER 🔥",
    time: "2h ago",
    unread: false,
  },
  {
    id: "5",
    type: "sip",
    user: "MidnightSpiller",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif4&backgroundColor=8b5cf6",
    action: "and 23 others liked your post",
    post: "STORYTIME: How my bestie...",
    time: "3h ago",
    unread: false,
  },
  {
    id: "6",
    type: "comment",
    user: "HotTakeHaven",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif6&backgroundColor=c084fc",
    action: "replied to your comment",
    post: "Not the brand apologizing in notes app...",
    time: "4h ago",
    unread: false,
  },
  {
    id: "7",
    type: "follow",
    user: "AnonCEO",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif7&backgroundColor=7e22ce",
    action: "started following you",
    time: "5h ago",
    unread: false,
  },
  {
    id: "8",
    type: "badge",
    action: "Achievement Unlocked",
    badge: "TEA MASTER ☕",
    time: "6h ago",
    unread: false,
  },
  {
    id: "9",
    type: "sip",
    user: "receipts_only",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif9&backgroundColor=a855f7",
    action: "saved your post",
    post: "Caught in 4K 📸 Screenshot before...",
    time: "8h ago",
    unread: false,
  },
  {
    id: "10",
    type: "comment",
    user: "exfiles_",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif10&backgroundColor=6d28d9",
    action: "mentioned you in a comment",
    post: "The audacity is astronomical 🤯",
    time: "10h ago",
    unread: false,
  },
  {
    id: "11",
    type: "follow",
    user: "spillmaster_",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=notif11&backgroundColor=9333ea",
    action: "started following you",
    time: "12h ago",
    unread: false,
  },
  {
    id: "12",
    type: "badge",
    action: "Achievement Unlocked",
    badge: "DRAMA QUEEN 👑",
    time: "1d ago",
    unread: false,
  },
];

function Alerts() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications([]);
    toast.success("All alerts cleared", { icon: '🧹' });
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <div className="h-full flex flex-col pb-20 md:pb-0 relative z-10 text-white font-sans">
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(178,75,243,0.15)', border: '1px solid rgba(178,75,243,0.25)' }}>
              <Bell size={20} strokeWidth={3} style={{ color: '#B24BF3' }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Alerts
              </h1>
              <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em',
                textTransform: 'uppercase', color: 'rgba(192,132,252,0.45)' }}>Check Your Updates.</p>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={markAllAsRead}
            style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '0.65rem', paddingBottom: '0.65rem', borderRadius: '1.5rem', border: '1px solid rgba(178,75,243,0.25)', background: 'rgba(178,75,243,0.10)', color: '#B24BF3', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(178,75,243,0.22)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(178,75,243,0.10)'; e.currentTarget.style.color = '#B24BF3'; }}
          >
            Clear All
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: '2rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', gap: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', lineHeight: 1, filter: 'grayscale(0.2)' }}>❓</div>
              <p style={{ margin: 0, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.01em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                No New Updates Here,
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'rgba(192,132,252,0.50)', maxWidth: 280 }}>
                I Think You Are Missing Out !
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkAsRead={markAsRead}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;





