import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { X, Image, Video, Type, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { addPost } from "../store/slices/postsSlice";

export function Spill() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);
  
  const [contentType, setContentType] = useState("text");
  const [teaContent, setTeaContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("VIRAL");

  const handlePost = () => {
    if (contentType === 'text' && !teaContent.trim()) return;
    
    // Create new post
    const newPost = {
      type: contentType,
      content: contentType === 'text' ? teaContent : undefined,
      title: contentType !== 'text' ? teaContent || 'Untitled' : undefined,
      thumbnail: contentType !== 'text' ? 'https://images.unsplash.com/photo-1610070835787-e209e94b56e2?w=400' : undefined,
      duration: contentType === 'short-video' ? '0:45' : contentType === 'long-video' ? '5:30' : undefined,
      author: currentUser?.username || 'you',
      category: selectedCategory,
    };
    
    dispatch(addPost(newPost));
    toast.success("Post successfully blasted to the world! 🚀");
    setTimeout(() => navigate("/"), 1000);
  };

  const formats = [
    {
      key: 'text',
      label: 'Text',
      Icon: Type,
      activeColor: '#c084fc',
      activeBg: 'rgba(167,139,250,0.14)',
      activeBorder: '#a78bfa',
      activeGrad: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
      glow: 'rgba(167,139,250,0.45)',
    },
    {
      key: 'short-video',
      label: 'TikTok Style',
      Icon: Video,
      activeColor: '#f472b6',
      activeBg: 'rgba(244,114,182,0.14)',
      activeBorder: '#f472b6',
      activeGrad: 'linear-gradient(135deg, #f472b6, #e879f9)',
      glow: 'rgba(244,114,182,0.45)',
    },
    {
      key: 'long-video',
      label: 'YouTube Style',
      Icon: Video,
      activeColor: '#e879f9',
      activeBg: 'rgba(232,121,249,0.14)',
      activeBorder: '#e879f9',
      activeGrad: 'linear-gradient(135deg, #e879f9, #a78bfa)',
      glow: 'rgba(232,121,249,0.45)',
    },
  ];

  return (
    <div className="h-full flex flex-col pb-20 md:pb-0 relative z-10 text-white font-sans"
      >

      {/* Header */}
      <div className="sticky z-20 shrink-0"
        style={{ position: 'sticky', top: '0.75rem', zIndex: 20, margin: '0.75rem 0.3rem 0', borderRadius: '1.25rem', background: 'rgba(20,0,40,0.78)', backdropFilter: 'blur(36px) saturate(200%)', WebkitBackdropFilter: 'blur(36px) saturate(200%)', border: '1px solid rgba(168,85,247,0.22)', boxShadow: '0 4px 28px rgba(109,40,217,0.22), inset 0 1px 0 rgba(232,121,249,0.10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.75rem' }}>
          {/* Left: icon + POST title + subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(232,121,249,0.15)', border: '1px solid rgba(232,121,249,0.25)' }}>
              <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                <X size={20} strokeWidth={3} style={{ color: '#e879f9' }} />
              </button>
            </div>
            <div>
              <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Post
              </h1>
              <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em',
                textTransform: 'uppercase', color: 'rgba(192,132,252,0.45)' }}>Just Post What You Want.</p>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Send It button */}
          <button onClick={handlePost}
            disabled={!teaContent.trim() && contentType === 'text'}
            style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', borderRadius: '1.5rem', marginRight: '0.25rem', background: 'linear-gradient(135deg, #e879f9, #a78bfa)', color: 'white', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 22px rgba(232,121,249,0.40)', border: 'none', opacity: (!teaContent.trim() && contentType === 'text') ? 0.4 : 1, transition: 'all 0.18s' }}>
            Send It
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-8"
          style={{ paddingTop: '2.5rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>

          {/* Title */}
          <div className="text-center">
            <h2 className="font-black tracking-tighter uppercase"
              style={{ fontSize: '3.25rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #e879f9, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Spill it.
            </h2>
            <p className="font-bold tracking-wide" style={{ fontSize: '1.05rem', color: 'rgba(192,132,252,0.60)' }}>
              Nobody will know it was you. Probably.
            </p>
          </div>

          {/* Format selector */}
          <div>
            <p className="font-black uppercase tracking-widest mb-4 px-1"
              style={{ fontSize: '0.8rem', color: 'rgba(192,132,252,0.50)' }}>Format</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {formats.map((fmt) => {
                const isActive = contentType === fmt.key;
                const FormatIcon = fmt.Icon;
                return (
                  <button key={fmt.key} onClick={() => setContentType(fmt.key)}
                    className="flex flex-col items-center gap-4 transition-all"
                    style={{
                      padding: '2rem 1.25rem',
                      borderRadius: '1.5rem',
                      border: isActive ? `2px solid ${fmt.activeBorder}` : '1.5px solid rgba(168,85,247,0.18)',
                      background: isActive ? fmt.activeBg : 'transparent',
                      boxShadow: isActive ? `0 0 28px ${fmt.glow}30` : 'none',
                      minHeight: 160,
                    }}>
                    <div style={{
                      padding: '1rem', borderRadius: '1rem',
                      background: isActive ? fmt.activeGrad : 'rgba(168,85,247,0.10)',
                      color: isActive ? 'white' : 'rgba(192,132,252,0.45)',
                      boxShadow: isActive ? `0 0 22px ${fmt.glow}` : 'none',
                    }}>
                      <FormatIcon style={{ width: 28, height: 28 }} strokeWidth={2.5} />
                    </div>
                    <span className="font-black uppercase tracking-widest"
                      style={{ fontSize: '0.8rem', color: isActive ? fmt.activeColor : 'rgba(192,132,252,0.45)', marginTop: '0.5rem' }}>
                      {fmt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category selector */}
          <div>
            <p className="font-black uppercase tracking-widest mb-4 px-1"
              style={{ fontSize: '0.8rem', color: 'rgba(192,132,252,0.50)' }}>Category</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
              {['VIRAL', 'RECEIPTS', 'DRAMA', 'CRINGE', 'EXPOSED', 'HOT TEA', 'SUS', 'CANCELLED'].map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      border: isActive ? '2px solid rgba(232,121,249,0.70)' : '1.5px solid rgba(168,85,247,0.18)',
                      background: isActive ? 'linear-gradient(135deg, rgba(232,121,249,0.28), rgba(167,139,250,0.22))' : 'transparent',
                      boxShadow: isActive ? '0 0 14px rgba(232,121,249,0.30)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}>
                    <span className="font-black uppercase tracking-widest"
                      style={{ fontSize: '0.7rem', color: isActive ? '#f3e8ff' : 'rgba(192,132,252,0.60)' }}>
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content box */}
          {contentType === "text" ? (
            (() => {
              const currentFormat = formats.find(f => f.key === contentType);
              return (
                <div className="relative overflow-hidden transition-all"
                  style={{ borderRadius: '1.75rem', padding: '2rem', border: `1.5px solid ${currentFormat.activeBorder}`, background: currentFormat.activeBg }}
                  onFocus={e => e.currentTarget.style.borderColor = currentFormat.activeColor}
                  onBlur={e => e.currentTarget.style.borderColor = currentFormat.activeBorder}>
                  <textarea value={teaContent} onChange={e => setTeaContent(e.target.value)}
                    placeholder="What's the drama? Start typing..."
                    className="w-full bg-transparent focus:outline-none resize-none relative z-10"
                    style={{ color: '#f3e8ff', caretColor: '#e879f9', minHeight: 240, fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.6 }}
                    maxLength={500} />
                  <div className="flex items-center justify-between mt-5 pt-5 relative z-10"
                    style={{ borderTop: `1px solid ${currentFormat.activeBorder}40` }}>
                    <span className="font-black tracking-widest"
                      style={{ fontSize: '0.85rem', color: teaContent.length > 450 ? '#f87171' : 'rgba(192,132,252,0.50)' }}>
                      {teaContent.length}/500
                    </span>
                    <button className="rounded-xl transition-colors"
                      style={{ padding: '0.75rem', background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.22)', color: 'rgba(192,132,252,0.75)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(168,85,247,0.20)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(168,85,247,0.10)'}>
                      <Image style={{ width: 22, height: 22 }} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            (() => {
              const currentFormat = formats.find(f => f.key === contentType);
              return (
                <div className="cursor-pointer transition-all"
                  style={{ borderRadius: '1.75rem', padding: '4rem 2rem', border: `2px dashed ${currentFormat.activeBorder}`, background: currentFormat.activeBg }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = currentFormat.activeColor}
                  onMouseLeave={e => e.currentTarget.style.borderColor = currentFormat.activeBorder}>
                  <div className="flex flex-col items-center gap-7 text-center">
                    <div style={{ width: 96, height: 96, borderRadius: '1.25rem', background: currentFormat.activeGrad, border: `1.5px solid ${currentFormat.activeBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 22px ${currentFormat.glow}` }}>
                      <Video style={{ width: 40, height: 40, color: 'white' }} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-tight" style={{ fontSize: '1.35rem', color: '#f3e8ff', marginBottom: '0.5rem' }}>Select a file</h3>
                      <p className="font-bold" style={{ fontSize: '1rem', color: 'rgba(192,132,252,0.60)' }}>
                        {contentType === "short-video" ? "MP4 or WebM (Under 60s)" : "MP4 or WebM (Under 15m)"}
                      </p>
                    </div>
                    <button className="font-black rounded-full uppercase tracking-widest transition-all"
                      style={{ padding: '0.875rem 2.5rem', fontSize: '0.9rem', background: currentFormat.activeGrad, color: 'white', boxShadow: `0 4px 20px ${currentFormat.glow}` }}>
                      Browse Files
                    </button>
                  </div>
                </div>
              );
            })()
          )}

          {/* Ground Rules */}
          <div style={{ borderRadius: '1.75rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(220,38,38,0.15))', border: '1.5px solid rgba(248,113,113,0.50)' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: '1.25rem',
                background: 'rgba(239,68,68,0.30)', border: '1.5px solid rgba(248,113,113,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle style={{ width: 32, height: 32, color: '#f87171' }} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest" style={{ fontSize: '1rem', color: '#f87171', marginBottom: '0.4rem' }}>
                  Ground Rules
                </h4>
                <p className="font-medium leading-relaxed" style={{ fontSize: '0.95rem', color: 'rgba(254,202,202,0.82)' }}>
                  No doxxing. No real names. Keep it to the drama, not personal attacks. Breaking this rule = INSTANT PERMABAN. Stay toxic, stay legal.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Spill;
