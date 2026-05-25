import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Clock, MessageSquare, AlertTriangle, Flame } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { PodiumPlace } from '../components/leaderboard/PodiumPlace';
import { WeakTeaPost } from '../components/leaderboard/WeakTeaPost';

const topBrewers = [
  {
    rank: 1,
    username: "ZennialSpill",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top1&backgroundColor=8b5cf6",
    points: 15420,
    badge: "MAIN CHARACTER",
    kettles: 342,
  },
  {
    rank: 2,
    username: "DramaLlama",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top2&backgroundColor=7c3aed",
    points: 12890,
    badge: "VIRAL",
    kettles: 289,
  },
  {
    rank: 3,
    username: "SpillMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top3&backgroundColor=a855f7",
    points: 11234,
    badge: "MESSY",
    kettles: 256,
  },
];

const topShelfUsers = [
  {
    rank: 4,
    username: "HotTakeHaven",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top4",
    points: 9876,
    trend: "up",
  },
  {
    rank: 5,
    username: "AnonCEO",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top5",
    points: 8765,
    trend: "up",
  },
  {
    rank: 6,
    username: "SecretSipper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top6",
    points: 7654,
    trend: "down",
  },
  {
    rank: 7,
    username: "WhisperWave",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=top7",
    points: 6543,
    trend: "up",
  },
];

const initialWeakTeaPosts = [
  {
    id: "1",
    title: "Apparently someone sneezed at work...",
    author: "BoringBrew",
    votes: 234,
    debates: 89,
    timeLeft: "2h 15m",
    voted: false
  },
  {
    id: "2",
    title: "My coworker wore the same shirt twice this week",
    author: "MildTea",
    votes: 456,
    debates: 123,
    timeLeft: "5h 42m",
    voted: false
  },
  {
    id: "3",
    title: "Someone left dishes in the sink again",
    author: "LukewarmLeaks",
    votes: 189,
    debates: 67,
    timeLeft: "8h 30m",
    voted: false
  }
];

function Leaderboard() {
  const [activeTab, setActiveTab] = useState("top");
  const [weakPosts, setWeakPosts] = useState(initialWeakTeaPosts);

  const handleVote = (id) => {
    setWeakPosts(posts => posts.map(p => {
      if (p.id === id) {
        const isVoting = !p.voted;
        toast(isVoting ? "Downvoted to oblivion 📉" : "Vote removed", {
          icon: isVoting ? '🗑️' : '↩️',
          style: { background: isVoting ? '#ef4444' : '#120e1f', color: '#fff', border: 'none' }
        });
        return { ...p, voted: isVoting, votes: p.votes + (isVoting ? 1 : -1) };
      }
      return p;
    }));
  };

  return (
    <div className="h-full flex flex-col pb-20 md:pb-0 relative z-10">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3 drop-shadow-[0_0_10px_rgba(178, 75, 243,0.2)] uppercase">
              <ZapIcon className="h-8 w-8 text-[#B24BF3]" />
              Hype Board
            </h1>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1 ml-11">
              The Best & The Rest
            </p>
          </div>

          {/* Mobile Tabs */}
          <div className="flex gap-2 lg:hidden w-full sm:w-auto mt-2">
            <button
              onClick={() => setActiveTab("top")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl transition-all font-black text-sm uppercase tracking-widest ${
                activeTab === "top"
                  ? "bg-[#B24BF3] text-black shadow-[0_0_15px_rgba(178, 75, 243,0.4)]"
                  : "bg-zinc-900 text-zinc-500 border border-zinc-800"
              }`}
            >
              Top Tier
            </button>
            <button
              onClick={() => setActiveTab("weak")}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl transition-all font-black text-sm uppercase tracking-widest ${
                activeTab === "weak"
                  ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "bg-zinc-900 text-zinc-500 border border-zinc-800"
              }`}
            >
              Cringe
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* LEFT COLUMN: Top Shelf */}
            <div className={`space-y-8 ${activeTab !== "top" ? "hidden lg:block" : ""}`}>
              <div className="flex items-center gap-3 pb-4 border-b-2 border-white/5">
                <div className="p-2 bg-[#B24BF3] text-black rounded-lg">
                  <Flame className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  Hall of Fame
                </h2>
              </div>

              {/* Podium */}
              <div className="relative pt-12 pb-4 bg-gradient-to-br from-[#11001C]/40 via-[#11001C]/40 to-[#2E111A]/40 rounded-3xl border-2 border-[#B24BF3]/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#B24BF3]/10 to-transparent opacity-50 blur-2xl" />
                <div className="relative flex items-end justify-center gap-4 sm:gap-6 px-2">
                  <PodiumPlace user={topBrewers[1]} color="#2E111A" />
                  <PodiumPlace user={topBrewers[0]} color="#B24BF3" isFirst />
                  <PodiumPlace user={topBrewers[2]} color="#11001C" />
                </div>
              </div>

              {/* Top shelf list */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest px-2 mb-4">
                  Trending Up
                </h3>
                {topShelfUsers.map((user) => (
                  <div
                    key={user.rank}
                    className="bg-gradient-to-r from-[#11001C]/40 via-[#11001C]/40 to-[#11001C]/40 border border-[#B24BF3]/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-zinc-800 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-8 text-center shrink-0">
                      <span className="text-xl font-black text-zinc-600 group-hover:text-[#B24BF3] transition-colors">
                        #{user.rank}
                      </span>
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.username}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full border-2 border-zinc-700 group-hover:border-[#B24BF3] transition-colors"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-black text-zinc-200 group-hover:text-white transition-colors tracking-tight">
                          {user.username}
                        </p>
                        {user.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-[#B24BF3]" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-xs font-bold text-zinc-500 tracking-widest mt-0.5">
                        {user.points.toLocaleString()} PTS
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Weak Tea Arena */}
            <div className={`space-y-6 ${activeTab !== "weak" ? "hidden lg:block" : ""}`}>
              <div className="flex items-center gap-3 pb-4 border-b-2 border-white/5">
                <div className="p-2 bg-red-500 text-white rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  Cringe Bin
                </h2>
              </div>

              <div className="bg-gradient-to-br from-red-950/40 via-[#11001C]/30 to-red-900/40 border-2 border-red-500/20 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-2xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🗑️</span>
                    <h3 className="text-xl font-black text-red-400 uppercase tracking-tight">
                      Call It Out
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 font-medium">
                    Vote to delete trash posts. If a post hits 1,000 downvotes, it's purged forever.
                  </p>
                </div>
              </div>

              {/* Weak tea list */}
              <div className="space-y-4">
                {weakPosts.map((post) => (
                  <WeakTeaPost key={post.id} post={post} onVote={handleVote} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export default Leaderboard;





