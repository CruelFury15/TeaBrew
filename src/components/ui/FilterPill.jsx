import { cn } from '../../utils/cn';

export function FilterPill({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap',
        active
          ? 'btn-liquid text-white'
          : 'btn-liquid-ghost text-orchid'
      )}
    >
      <span className="text-sm">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
