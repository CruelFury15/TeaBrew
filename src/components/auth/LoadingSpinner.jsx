export const LoadingSpinner = () => {
  return (
    <div 
      style={{
        display: 'inline-block',
        width: '1rem',
        height: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite'
      }}
      role="status"
      aria-label="Loading"
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
