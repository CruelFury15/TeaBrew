import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

export const FormInput = ({ id, label, type = 'text', placeholder, icon: Icon, error, disabled, register, ...props }) => {
  const hasError = !!error;
  const errorId = `${id}-error`;

  return (
    <div style={{ position: 'relative', marginBottom: hasError ? '0.25rem' : 0 }}>
      <label htmlFor={id} style={{
        display: 'block', marginBottom: '0.25rem',
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.07em',
        textTransform: 'uppercase', color: 'rgba(220,180,255,0.85)',
      }}>
        {label}
      </label>

      {/* Wrapper so icon and input are positioned relative to each other */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 2,
            color: hasError ? '#f43f5e' : 'rgba(255,255,255,0.85)',
          }}>
            <Icon style={{ height: '1rem', width: '1rem' }} />
          </div>
        )}

        <input
          id={id}
          type={type}
          disabled={disabled}
          readOnly={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(Icon && 'pl-10')}
          style={{
            width: '100%',
            borderRadius: '0.75rem',
            paddingTop: '0.55rem',
            paddingBottom: '0.55rem',
            paddingLeft: Icon ? '2.4rem' : '0.875rem',
            paddingRight: '0.875rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            /* Light semi-transparent background so icons are visible */
            background: 'rgba(255,255,255,0.12)',
            border: hasError
              ? '1px solid rgba(244,63,94,0.60)'
              : '1px solid rgba(168,85,247,0.35)',
            color: '#ffffff',
            outline: 'none',
            transition: 'all 0.2s ease',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'text',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: hasError
              ? '0 0 0 3px rgba(244,63,94,0.15)'
              : 'inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
          onFocus={(e) => {
            if (!hasError) {
              e.target.style.background = 'rgba(255,255,255,0.18)';
              e.target.style.borderColor = 'rgba(232,121,249,0.65)';
              e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.18)';
            }
          }}
          onBlur={(e) => {
            if (!hasError) {
              e.target.style.background = 'rgba(255,255,255,0.12)';
              e.target.style.borderColor = 'rgba(168,85,247,0.35)';
              e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.10)';
            }
          }}
          placeholder={placeholder}
          {...register}
          {...props}
        />
      </div>

      {hasError && (
        <p id={errorId} role="alert" style={{
          marginTop: '0.3rem', fontSize: '0.72rem',
          fontWeight: 600, color: '#f87171',
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.object.isRequired,
};
