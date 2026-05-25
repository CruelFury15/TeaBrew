import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../store';
import {
  ArrowLeft, Eye, MessageCircle, Share2, ArrowUp, ArrowDown, Trash2,
  Edit2, Globe, Calendar, Flame, BarChart2,
  X, PlusCircle, Image, Video
} from 'lucide-react';
import { toast } from 'sonner';

function TeaSpread() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts?.allPosts || []);
  const post = allPosts.find(p => p.id === postId);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [editContent, setEditContent] = useState(post?.content || post?.title || '');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [comments, setComments] = useState([
    { id: 1, user: 'user1', text: 'This is an amazing tea! Can\'t believe this happened 🔥' },
    { id: 2, user: 'user2', text: 'This is an amazing tea! Can\'t believe this happened 🔥' },
    { id: 3, user: 'user3', text: 'This is an amazing tea! Can\'t believe this happened 🔥' },
  ]);

  // Generate stable rank based on post ID
  const globalRank = useMemo(() => {
    if (!postId) return 1;
    // Simple hash function to generate consistent rank from ID
    let hash = 0;
    for (let i = 0; i < postId.length; i++) {
      hash = ((hash << 5) - hash) + postId.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash % 1000) + 1;
  }, [postId]);

  if (!post) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#e879f9', fontSize: '1.2rem' }}>Tea not found 🍵</p>
        <button onClick={() => navigate('/profile')} 
          style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', borderRadius: '1rem',
            background: 'linear-gradient(135deg, #e879f9, #a78bfa)', color: 'white',
            border: 'none', cursor: 'pointer', fontWeight: 800 }}>
          Back to Profile
        </button>
      </div>
    );
  }

  const stats = [
    { icon: Eye, label: 'Views', value: post.sips || 0, color: '#e879f9', bg: 'rgba(232,121,249,0.10)', border: 'rgba(232,121,249,0.28)' },
    { icon: MessageCircle, label: 'Comments', value: post.stirs || 0, color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)' },
    { icon: Share2, label: 'Shares', value: Math.floor((post.sips || 0) * 0.1), color: '#38bdf8', bg: 'rgba(56,189,248,0.10)', border: 'rgba(56,189,248,0.28)' },
    { icon: ArrowUp, label: 'Upvotes', value: post.stirs || 0, color: '#4ade80', bg: 'rgba(74,222,128,0.10)', border: 'rgba(74,222,128,0.28)' },
    { icon: ArrowDown, label: 'Devotes', value: post.spills || 0, color: '#f87171', bg: 'rgba(248,113,113,0.10)', border: 'rgba(248,113,113,0.28)' },
  ];

  const handleDelete = () => {
    dispatch(deletePost(postId));
    toast.success('Tea deleted successfully! 🗑️');
    navigate('/profile');
  };

  const handleEdit = () => {
    if (post.type === 'text') {
      dispatch(updatePost({ id: postId, content: editContent }));
    } else {
      dispatch(updatePost({ id: postId, title: editContent }));
    }
    toast.success('Tea updated! ☕');
    setShowEditModal(false);
  };

  const handleDeleteComment = (commentId) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    toast.success('Comment deleted');
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    if (!pollQuestion.trim() || pollOptions.filter(o => o.trim()).length < 2) {
      toast.error('Please add a question and at least 2 options');
      return;
    }
    toast.success('Poll created and sent to Discover page! 📊');
    setPollQuestion('');
    setPollOptions(['', '']);
    setShowPollModal(false);
  };

  return (
    <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', paddingBottom: '5rem' }}>

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
            style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(232,121,249,0.15)', 
              border: '1px solid rgba(232,121,249,0.25)', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,121,249,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(232,121,249,0.15)'}>
            <ArrowLeft size={20} strokeWidth={3} style={{ color: '#e879f9' }} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #e879f9, #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Tea Spread
            </h1>
            <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.10em',
              textTransform: 'uppercase', color: 'rgba(192,132,252,0.45)' }}>Analytics & Management</p>
          </div>
        </div>
      </header>

      <div style={{ padding: '1.5rem 1rem', maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} style={{ 
                  borderRadius: '1.5rem', padding: '1.5rem', 
                  background: stat.bg, border: `1px solid ${stat.border}`,
                  backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden' 
                }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100,
                    background: `radial-gradient(circle, ${stat.bg.replace(/[\d.]+\)$/, '0.35)')}, transparent 70%)`,
                    filter: 'blur(20px)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <Icon size={24} style={{ color: stat.color, marginBottom: '0.75rem' }} strokeWidth={2.5} />
                    <p style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>
                      {stat.value.toLocaleString()}
                    </p>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', fontWeight: 800, 
                      textTransform: 'uppercase', letterSpacing: '0.08em', color: `${stat.color}99` }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tea Details Card */}
          <div style={{ borderRadius: '2rem', padding: '2rem', background: 'rgba(56,189,248,0.08)', 
            border: '1px solid rgba(56,189,248,0.25)', backdropFilter: 'blur(16px)' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.2rem', fontWeight: 900, color: '#38bdf8' }}>
              Tea Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', 
                border: '1px solid rgba(56,189,248,0.15)' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 800, 
                  textTransform: 'uppercase', color: 'rgba(56,189,248,0.60)' }}>Category</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#e9d5ff' }}>{post.category}</p>
              </div>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', 
                border: '1px solid rgba(56,189,248,0.15)' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 800, 
                  textTransform: 'uppercase', color: 'rgba(56,189,248,0.60)' }}>Date Posted</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} style={{ color: '#38bdf8' }} />
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#e9d5ff' }}>{post.publishDate}</p>
                </div>
              </div>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', 
                border: '1px solid rgba(56,189,248,0.15)' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 800, 
                  textTransform: 'uppercase', color: 'rgba(56,189,248,0.60)' }}>Temperature</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Flame size={16} style={{ color: '#fb923c' }} />
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fb923c' }}>{post.temperature}°</p>
                </div>
              </div>
              <div style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', 
                border: '1px solid rgba(56,189,248,0.15)' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: 800, 
                  textTransform: 'uppercase', color: 'rgba(56,189,248,0.60)' }}>Global Rank</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Globe size={16} style={{ color: '#4ade80' }} />
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#4ade80' }}>
                    #{globalRank}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <button onClick={() => setShowEditModal(true)}
              style={{ padding: '1rem', borderRadius: '1.25rem', background: 'rgba(167,139,250,0.10)', 
                border: '1px solid rgba(167,139,250,0.28)', cursor: 'pointer', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.20)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(167,139,250,0.10)'}>
              <Edit2 size={18} style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#a78bfa' }}>Edit Tea</span>
            </button>
            
            <button onClick={() => setShowMediaModal(true)}
              style={{ padding: '1rem', borderRadius: '1.25rem', background: 'rgba(56,189,248,0.10)', 
                border: '1px solid rgba(56,189,248,0.28)', cursor: 'pointer', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.20)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(56,189,248,0.10)'}>
              <PlusCircle size={18} style={{ color: '#38bdf8' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>Add Media</span>
            </button>

            <button onClick={() => setShowPollModal(true)}
              style={{ padding: '1rem', borderRadius: '1.25rem', background: 'rgba(74,222,128,0.10)', 
                border: '1px solid rgba(74,222,128,0.28)', cursor: 'pointer', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,222,128,0.20)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(74,222,128,0.10)'}>
              <BarChart2 size={18} style={{ color: '#4ade80' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4ade80' }}>Create Poll</span>
            </button>

            <button onClick={() => setShowDeleteModal(true)}
              style={{ padding: '1rem', borderRadius: '1.25rem', background: 'rgba(248,113,113,0.10)', 
                border: '1px solid rgba(248,113,113,0.28)', cursor: 'pointer', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.20)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,113,113,0.10)'}>
              <Trash2 size={18} style={{ color: '#f87171' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f87171' }}>Delete Tea</span>
            </button>
          </div>

          {/* Comments Section */}
          <div style={{ borderRadius: '2rem', padding: '2rem', background: 'rgba(232,121,249,0.08)', 
            border: '1px solid rgba(232,121,249,0.25)', backdropFilter: 'blur(16px)' }}>
            <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.2rem', fontWeight: 900, color: '#e879f9' }}>
              Comments Management
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {comments.map((comment) => (
                <div key={comment.id} style={{ padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', 
                  border: '1px solid rgba(232,121,249,0.15)', display: 'flex', justifyContent: 'space-between', 
                  alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: 800, color: '#e879f9' }}>
                      @{comment.user}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#e9d5ff' }}>
                      {comment.text}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteComment(comment.id)}
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(248,113,113,0.10)', 
                      border: '1px solid rgba(248,113,113,0.25)', cursor: 'pointer' }}>
                    <Trash2 size={14} style={{ color: '#f87171' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', 
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowDeleteModal(false)}>
          <div style={{ background: 'linear-gradient(135deg, rgba(30,0,55,0.95), rgba(20,0,40,0.98))', 
            borderRadius: '1.5rem', padding: '2rem', maxWidth: '400px', width: '90%',
            border: '1px solid rgba(248,113,113,0.30)' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', fontWeight: 900, color: '#f87171' }}>
              Delete Tea?
            </h3>
            <p style={{ margin: '0 0 1.5rem', color: '#e9d5ff' }}>
              This action cannot be undone. Your tea will be permanently deleted.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setShowDeleteModal(false)}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.08)', 
                  border: '1px solid rgba(255,255,255,0.15)', color: '#e9d5ff', cursor: 'pointer', fontWeight: 700 }}>
                Cancel
              </button>
              <button onClick={handleDelete}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '1rem', 
                  background: 'linear-gradient(135deg, #f87171, #ef4444)', border: 'none', 
                  color: 'white', cursor: 'pointer', fontWeight: 800 }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', 
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowEditModal(false)}>
          <div style={{ background: 'linear-gradient(135deg, rgba(30,0,55,0.95), rgba(20,0,40,0.98))', 
            borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '90%',
            border: '1px solid rgba(167,139,250,0.30)' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', fontWeight: 900, color: '#a78bfa' }}>
              Edit Tea
            </h3>
            <textarea value={editContent} onChange={e => setEditContent(e.target.value)}
              style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '1rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(167,139,250,0.25)',
                color: '#e9d5ff', fontSize: '0.9rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={() => setShowEditModal(false)}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.08)', 
                  border: '1px solid rgba(255,255,255,0.15)', color: '#e9d5ff', cursor: 'pointer', fontWeight: 700 }}>
                Cancel
              </button>
              <button onClick={handleEdit}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '1rem', 
                  background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', border: 'none', 
                  color: 'white', cursor: 'pointer', fontWeight: 800 }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Poll Modal */}
      {showPollModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', 
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowPollModal(false)}>
          <div style={{ background: 'linear-gradient(135deg, rgba(30,0,55,0.95), rgba(20,0,40,0.98))', 
            borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '90%',
            border: '1px solid rgba(74,222,128,0.30)' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', fontWeight: 900, color: '#4ade80' }}>
              📊 Create Poll
            </h3>
            <form onSubmit={handleCreatePoll}>
              <input 
                value={pollQuestion} 
                onChange={e => setPollQuestion(e.target.value)}
                placeholder="Poll question..."
                style={{ width: '100%', padding: '0.875rem', borderRadius: '1rem', marginBottom: '1rem',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(74,222,128,0.25)',
                  color: '#e9d5ff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} 
              />
              {pollOptions.map((opt, i) => (
                <input 
                  key={i}
                  value={opt} 
                  onChange={e => setPollOptions(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                  placeholder={`Option ${i + 1}`}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '1rem', marginBottom: '0.75rem',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(74,222,128,0.20)',
                    color: '#e9d5ff', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }} 
                />
              ))}
              <button 
                type="button"
                onClick={() => setPollOptions(prev => [...prev, ''])}
                style={{ width: '100%', padding: '0.625rem', borderRadius: '1rem', marginBottom: '1rem',
                  background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)',
                  color: '#4ade80', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                + Add Option
              </button>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setShowPollModal(false)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.08)', 
                    border: '1px solid rgba(255,255,255,0.15)', color: '#e9d5ff', cursor: 'pointer', fontWeight: 700 }}>
                  Cancel
                </button>
                <button type="submit"
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '1rem', 
                    background: 'linear-gradient(135deg, #4ade80, #22c55e)', border: 'none', 
                    color: 'white', cursor: 'pointer', fontWeight: 800 }}>
                  Create Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {showMediaModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', 
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowMediaModal(false)}>
          <div style={{ background: 'linear-gradient(135deg, rgba(30,0,55,0.95), rgba(20,0,40,0.98))', 
            borderRadius: '1.5rem', padding: '2rem', maxWidth: '500px', width: '90%',
            border: '1px solid rgba(56,189,248,0.30)' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.2rem', fontWeight: 900, color: '#38bdf8' }}>
              📎 Add Media
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={() => { toast.info('Image upload coming soon!'); setShowMediaModal(false); }}
                style={{ padding: '1.5rem', borderRadius: '1.25rem', 
                  background: 'rgba(56,189,248,0.10)', border: '1px solid rgba(56,189,248,0.28)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.20)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(56,189,248,0.10)'}>
                <Image size={24} style={{ color: '#38bdf8' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>Upload Image</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'rgba(56,189,248,0.60)' }}>
                    Add photos to your tea
                  </p>
                </div>
              </button>
              <button 
                onClick={() => { toast.info('Video upload coming soon!'); setShowMediaModal(false); }}
                style={{ padding: '1.5rem', borderRadius: '1.25rem', 
                  background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.28)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(167,139,250,0.20)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(167,139,250,0.10)'}>
                <Video size={24} style={{ color: '#a78bfa' }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#a78bfa' }}>Upload Video</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'rgba(167,139,250,0.60)' }}>
                    Add short or long videos
                  </p>
                </div>
              </button>
            </div>
            <button onClick={() => setShowMediaModal(false)}
              style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', borderRadius: '1rem', 
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', 
                color: '#e9d5ff', cursor: 'pointer', fontWeight: 700 }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default TeaSpread;
