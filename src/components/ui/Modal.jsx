import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/uiSlice';

export function Modal({ children, title, onClose }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (onClose) onClose();
    dispatch(closeModal());
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '1rem',
        background: 'rgba(124,58,237,0.12)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      onClick={handleClose}
    >
      <div
        className="glass-deep"
        style={{ borderRadius: '1.5rem', maxWidth: 520, width: '100%', overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(192,132,252,0.25), 0 8px 24px rgba(232,121,249,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(192,132,252,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.25)' }}>
            <h2 style={{ margin: 0, fontWeight: 900, fontSize: '1.25rem',
              letterSpacing: '-0.02em' }} className="text-gradient">{title}</h2>
            <button onClick={handleClose}
              style={{ padding: '0.375rem', borderRadius: '50%', border: 'none',
                background: 'rgba(255,255,255,0.45)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,121,249,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.45)'; }}
            >
              <X size={20} strokeWidth={2.5} style={{ color: '#7c3aed' }} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
