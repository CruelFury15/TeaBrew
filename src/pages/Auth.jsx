import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Lock, Mail, Phone, KeyRound } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { signInSchema, signUpSchema, otpSchema } from '../schemas/authSchemas';
import { FormInput } from '../components/auth/FormInput';
import { LoadingSpinner } from '../components/auth/LoadingSpinner';
import { toast } from 'sonner';
import TeaBg from '../assets/Tea_bg.png';
import TeaFavicon from '../assets/Tea_Favicon.png';
import '../pages-styles.css';

const btnStyle = (isSubmitting) => ({
  width: '100%',
  background: 'linear-gradient(135deg, #e879f9 0%, #a78bfa 50%, #f472b6 100%)',
  color: 'white',
  fontWeight: '700',
  padding: '0.75rem 1.5rem',
  borderRadius: '9999px',
  boxShadow: isSubmitting
    ? 'none'
    : '0 4px 20px rgba(232,121,249,0.45), inset 0 1px 0 rgba(255,255,255,0.40)',
  transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
  border: 'none',
  cursor: isSubmitting ? 'not-allowed' : 'pointer',
  fontSize: '0.9rem',
  opacity: isSubmitting ? 0.7 : 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  position: 'relative',
  overflow: 'hidden',
});

const oauthBtnStyle = (isSubmitting) => ({
  flex: 1,
  padding: '0.7rem',
  background: 'rgba(30,0,55,0.55)',
  border: '1px solid rgba(168,85,247,0.35)',
  borderRadius: '9999px',
  color: '#c084fc',
  fontSize: '0.85rem',
  fontWeight: '700',
  cursor: isSubmitting ? 'not-allowed' : 'pointer',
  transition: 'all 0.2s ease',
  opacity: isSubmitting ? 0.5 : 1,
  boxShadow: '0 2px 8px rgba(109,40,217,0.20)',
});

const dividerStyle = { flex: 1, height: '1px', background: 'rgba(168,85,247,0.25)' };

const SignInForm = ({ onToggle }) => {
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState('password');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: zodResolver(loginMethod === 'password' ? signInSchema : otpSchema),
    mode: 'onBlur',
  });

  const email = watch('email');

  const onSubmit = async (data) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    dispatch(login({ email: data.email, name: data.email.split('@')[0] }));
    toast.success('Welcome back!');
  };

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async () => {
    if (!email) { toast.error('Enter your email first'); return; }
    await new Promise((r) => setTimeout(r, 600));
    const otp = generateOtp();
    setIsOtpSent(true);
    alert(`Your One Time Password to Login is : ${otp}`);
    toast.success('OTP sent!');
  };

  const handleOAuth = (provider) => {
    toast.info(`${provider} OAuth coming soon`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '28rem', margin: '0 auto' }}
    >
      <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.375rem',
          letterSpacing: '-0.03em' }} className="text-gradient">
          Welcome Back
        </h1>
        <p style={{ color: 'rgba(192,132,252,0.70)', fontSize: '0.875rem', fontWeight: 500 }}>
          Sign in to continue to TeaBrew
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <fieldset disabled={isSubmitting} style={{ border: 'none', padding: 0, margin: 0 }}>
          <FormInput id="signin-email" label="Email" type="email" placeholder="your@email.com"
            icon={Mail} error={errors.email?.message} disabled={isSubmitting} register={register('email')}
            maxLength={254} autoComplete="email" spellCheck={false}
            autoCapitalize="none" autoCorrect="off" inputMode="email" />

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.625rem', marginBottom: '0.625rem',
            background: 'rgba(178,75,243,0.1)', padding: '0.25rem', borderRadius: '0.75rem',
            border: '1px solid rgba(178,75,243,0.2)' }}>
            {['password', 'otp'].map((m) => (
              <button key={m} type="button" onClick={() => setLoginMethod(m)} disabled={isSubmitting}
                style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem', fontWeight: '500',
                  borderRadius: '0.5rem', transition: 'all 0.3s', border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  background: loginMethod === m ? 'linear-gradient(135deg,#2E111A,#B24BF3)' : 'transparent',
                  color: loginMethod === m ? 'white' : 'rgba(255,255,255,0.5)',
                  boxShadow: loginMethod === m ? '0 4px 15px rgba(178,75,243,0.4)' : 'none',
                  opacity: isSubmitting ? 0.6 : 1 }}>
                {m === 'password' ? 'Password' : 'OTP Login'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {loginMethod === 'password' ? (
              <motion.div key="pw" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                <FormInput id="signin-password" label="Password" type="password" placeholder="Enter your password"
                  icon={Lock} error={errors.password?.message} disabled={isSubmitting} register={register('password')}
                  maxLength={128} autoComplete="current-password" spellCheck={false} />
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}>
                {/* OTP row: narrow input + Send OTP button side by side */}
                <div>
                  <label htmlFor="signin-otp" style={{
                    display: 'block', marginBottom: '0.375rem',
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em',
                    textTransform: 'uppercase', color: 'rgba(220,180,255,0.85)',
                  }}>
                    One-Time Password
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {/* OTP input — narrower */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: '0 0 55%' }}>
                      <div style={{
                        position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                        display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 2,
                        color: errors.otp ? '#f43f5e' : 'rgba(168,85,247,0.80)',
                      }}>
                        <KeyRound style={{ height: '1rem', width: '1rem' }} />
                      </div>
                      <input
                        id="signin-otp"
                        type="text"
                        disabled={isSubmitting}
                        readOnly={isSubmitting}
                        aria-invalid={!!errors.otp}
                        aria-describedby={errors.otp ? 'signin-otp-error' : undefined}
                        placeholder="6-digit OTP"
                        maxLength={6}
                        style={{
                          width: '100%', borderRadius: '0.75rem',
                          paddingTop: '0.65rem', paddingBottom: '0.65rem',
                          paddingLeft: '2.4rem', paddingRight: '0.875rem',
                          fontSize: '0.875rem', fontWeight: 500,
                          background: 'rgba(255,255,255,0.12)',
                          border: errors.otp ? '1px solid rgba(244,63,94,0.60)' : '1px solid rgba(168,85,247,0.35)',
                          color: '#f3e8ff', outline: 'none', transition: 'all 0.2s ease',
                          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                          opacity: isSubmitting ? 0.6 : 1,
                          cursor: isSubmitting ? 'not-allowed' : 'text',
                          letterSpacing: '0.15em',
                        }}
                        onFocus={(e) => {
                          e.target.style.background = 'rgba(255,255,255,0.18)';
                          e.target.style.borderColor = 'rgba(232,121,249,0.65)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.18)';
                        }}
                        onBlur={(e) => {
                          e.target.style.background = 'rgba(255,255,255,0.12)';
                          e.target.style.borderColor = 'rgba(168,85,247,0.35)';
                          e.target.style.boxShadow = 'none';
                        }}
                        {...register('otp')}
                      />
                    </div>
                    {/* Send OTP button — fills remaining space */}
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSubmitting}
                      style={{
                        flex: 1,
                        padding: '0.65rem 0.75rem',
                        background: isOtpSent
                          ? 'rgba(168,85,247,0.20)'
                          : 'linear-gradient(135deg, rgba(232,121,249,0.35), rgba(139,92,246,0.35))',
                        color: '#e9d5ff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(168,85,247,0.40)',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap',
                        opacity: isSubmitting ? 0.5 : 1,
                        transition: 'all 0.2s ease',
                        backdropFilter: 'blur(8px)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {isOtpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  </div>
                  {errors.otp && (
                    <p id="signin-otp-error" role="alert" style={{
                      marginTop: '0.3rem', fontSize: '0.72rem', fontWeight: 600, color: '#f87171',
                    }}>
                      {errors.otp.message}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loginMethod === 'password' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
              <label htmlFor="remember-me" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.875rem', color: 'rgba(192,132,252,0.70)', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                <input id="remember-me" type="checkbox" disabled={isSubmitting} {...register('rememberMe')}
                  style={{ width: '1rem', height: '1rem', accentColor: '#B24BF3' }} />
                <span>Remember me</span>
              </label>
              <a href="#" style={{ fontSize: '0.875rem', color: '#B24BF3', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
          )}
        </fieldset>

        <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button type="submit" disabled={isSubmitting} style={btnStyle(isSubmitting)}>
            {isSubmitting ? <><LoadingSpinner /><span>Signing In...</span></> : 'Sign In'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={dividerStyle} />
            <span style={{ color: 'rgba(168,85,247,0.60)', fontSize: '0.875rem' }}>or</span>
            <div style={dividerStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={() => handleOAuth('Google')} disabled={isSubmitting} style={oauthBtnStyle(isSubmitting)}>Google</button>
            <button type="button" onClick={() => handleOAuth('Apple')} disabled={isSubmitting} style={oauthBtnStyle(isSubmitting)}>Apple</button>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(192,132,252,0.65)' }}>
            New here?{' '}
            <button type="button" onClick={onToggle} disabled={isSubmitting}
              style={{ color: '#e879f9', fontWeight: '600', background: 'none', border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '0.875rem' }}>
              Create an account
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

SignInForm.propTypes = { onToggle: PropTypes.func.isRequired };

const SignUpForm = ({ onToggle }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    dispatch(login({ email: data.email, name: data.username }));
    toast.success('Account created!');
  };

  const handleOAuth = (provider) => {
    toast.info(`${provider} OAuth coming soon`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '28rem', margin: '0 auto' }}
    >
      <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.375rem',
          letterSpacing: '-0.03em' }} className="text-gradient">
          Join the Vibe
        </h2>
        <p style={{ color: 'rgba(192,132,252,0.70)', fontSize: '0.875rem', fontWeight: 500 }}>
          Create your TeaBrew account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <fieldset disabled={isSubmitting} style={{ border: 'none', padding: 0, margin: 0,
          display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <FormInput id="signup-username" label="Username" type="text" placeholder="Choose a username"
            icon={User} error={errors.username?.message} disabled={isSubmitting} register={register('username')}
            maxLength={20} autoComplete="username" spellCheck={false}
            autoCapitalize="none" autoCorrect="off" />
          <FormInput id="signup-email" label="Email" type="email" placeholder="your@email.com"
            icon={Mail} error={errors.email?.message} disabled={isSubmitting} register={register('email')}
            maxLength={254} autoComplete="email" spellCheck={false}
            autoCapitalize="none" autoCorrect="off" inputMode="email" />
          <FormInput id="signup-phone" label="Phone Number" type="tel" placeholder="+91 98765 43210"
            icon={Phone} error={errors.phone?.message} disabled={isSubmitting} register={register('phone')}
            maxLength={16} autoComplete="tel" inputMode="tel" spellCheck={false} />
          <FormInput id="signup-password" label="Password" type="password" placeholder="Create a strong password"
            icon={Lock} error={errors.password?.message} disabled={isSubmitting} register={register('password')}
            maxLength={128} autoComplete="new-password" spellCheck={false} />
        </fieldset>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem',
          paddingTop: '0.375rem', borderTop: '1px solid rgba(168,85,247,0.20)' }}>
          <button type="submit" disabled={isSubmitting} style={btnStyle(isSubmitting)}>
            {isSubmitting ? <><LoadingSpinner /><span>Creating Account...</span></> : 'Sign Up'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={dividerStyle} />
            <span style={{ color: 'rgba(168,85,247,0.60)', fontSize: '0.875rem' }}>or</span>
            <div style={dividerStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={() => handleOAuth('Google')} disabled={isSubmitting} style={oauthBtnStyle(isSubmitting)}>Google</button>
            <button type="button" onClick={() => handleOAuth('Apple')} disabled={isSubmitting} style={oauthBtnStyle(isSubmitting)}>Apple</button>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(192,132,252,0.65)' }}>
            Already have an account?{' '}
            <button type="button" onClick={onToggle} disabled={isSubmitting}
              style={{ color: '#e879f9', fontWeight: '600', background: 'none', border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '0.875rem' }}>
              Sign In
            </button>
          </p>
        </div>
      </form>

      <style>{`
        form::-webkit-scrollbar { width: 4px; }
        form::-webkit-scrollbar-track { background: transparent; }
        form::-webkit-scrollbar-thumb { background: rgba(178,75,243,0.3); border-radius: 4px; }
        form::-webkit-scrollbar-thumb:hover { background: rgba(178,75,243,0.5); }
      `}</style>
    </motion.div>
  );
};

SignUpForm.propTypes = { onToggle: PropTypes.func.isRequired };

/* ─────────────────────────────────────────────
   2D MOTION BRANDING SCENE
───────────────────────────────────────────── */
const SLANG = [
  { text: 'SPILL IT',  color: '#e879f9', size: '1.6rem', x: '8%',  y: '12%', rot: -12, delay: 0    },
  { text: 'G.O.A.T.',  color: '#38bdf8', size: '1.3rem', x: '52%', y: '8%',  rot:  6,  delay: 0.3  },
  { text: 'FIRE 🔥',   color: '#fb923c', size: '1.4rem', x: '62%', y: '28%', rot: -5,  delay: 0.6  },
  { text: 'BET',       color: '#4ade80', size: '1.1rem', x: '78%', y: '14%', rot:  10, delay: 0.9  },
  { text: 'SLAY',      color: '#f472b6', size: '1.2rem', x: '72%', y: '42%', rot: -8,  delay: 1.1  },
  { text: 'LIT',       color: '#facc15', size: '1.5rem', x: '5%',  y: '42%', rot:  8,  delay: 0.4  },
  { text: 'BUZZIN',    color: '#c084fc', size: '1.1rem', x: '18%', y: '62%', rot: -14, delay: 0.7  },
  { text: 'FLEX',      color: '#34d399', size: '1.3rem', x: '38%', y: '68%', rot:  5,  delay: 1.0  },
  { text: 'SWAG',      color: '#e879f9', size: '1.4rem', x: '55%', y: '72%', rot: -6,  delay: 1.3  },
  { text: 'VIBE ✨',   color: '#a78bfa', size: '1.0rem', x: '82%', y: '58%', rot:  12, delay: 0.5  },
  { text: 'SUS 👀',    color: '#f87171', size: '1.1rem', x: '68%', y: '80%', rot: -10, delay: 1.5  },
  { text: 'NO CAP',    color: '#38bdf8', size: '1.0rem', x: '10%', y: '80%', rot:  7,  delay: 1.2  },
  { text: 'RECEIPTS',  color: '#fbbf24', size: '0.95rem',x: '30%', y: '18%', rot: -4,  delay: 0.8  },
];

const STARS = [
  { x: '6%',  y: '6%',  size: 18, color: '#f472b6', delay: 0   },
  { x: '88%', y: '10%', size: 14, color: '#facc15', delay: 0.5 },
  { x: '4%',  y: '88%', size: 16, color: '#a78bfa', delay: 1.0 },
  { x: '90%', y: '82%', size: 12, color: '#38bdf8', delay: 0.3 },
  { x: '50%', y: '4%',  size: 10, color: '#e879f9', delay: 0.8 },
];

const BOLTS = [
  { x: '82%', y: '4%',  rot: 20,  color: '#facc15', delay: 0.2 },
  { x: '3%',  y: '55%', rot: -15, color: '#f472b6', delay: 0.9 },
  { x: '88%', y: '65%', rot: 10,  color: '#38bdf8', delay: 0.6 },
];

const SPEED_LINES = [
  { x1: '50%', y1: '50%', x2: '0%',   y2: '20%', color: 'rgba(232,121,249,0.25)' },
  { x1: '50%', y1: '50%', x2: '100%', y2: '15%', color: 'rgba(56,189,248,0.20)'  },
  { x1: '50%', y1: '50%', x2: '0%',   y2: '80%', color: 'rgba(167,139,250,0.22)' },
  { x1: '50%', y1: '50%', x2: '100%', y2: '85%', color: 'rgba(244,114,182,0.20)' },
  { x1: '50%', y1: '50%', x2: '20%',  y2: '0%',  color: 'rgba(250,204,21,0.18)'  },
  { x1: '50%', y1: '50%', x2: '80%',  y2: '0%',  color: 'rgba(52,211,153,0.18)'  },
  { x1: '50%', y1: '50%', x2: '10%',  y2: '100%',color: 'rgba(232,121,249,0.15)' },
  { x1: '50%', y1: '50%', x2: '90%',  y2: '100%',color: 'rgba(56,189,248,0.15)'  },
];

function StarShape({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
    </svg>
  );
}
StarShape.propTypes = { size: PropTypes.number, color: PropTypes.string };

function BoltShape({ size = 22, color }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 14 24" fill={color}>
      <polygon points="8,0 2,13 7,13 6,24 12,11 7,11" />
    </svg>
  );
}
BoltShape.propTypes = { size: PropTypes.number, color: PropTypes.string };

function BrandingScene() {
  return (
    <div style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: 0 }}>

      {/* Speed lines SVG — radiating from center */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {SPEED_LINES.map((l, i) => (
          <motion.line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={l.color} strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0.4] }}
            transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: s.x, top: s.y, zIndex: 4 }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1, 1.2, 1], rotate: [0, 180, 360], opacity: [0, 1, 1, 1, 0.7] }}
          transition={{ duration: 2, delay: s.delay, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
        >
          <StarShape size={s.size} color={s.color} />
        </motion.div>
      ))}

      {/* Lightning bolts */}
      {BOLTS.map((b, i) => (
        <motion.div key={i}
          style={{ position: 'absolute', left: b.x, top: b.y, rotate: b.rot, zIndex: 4 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.8, 0], scale: [0.5, 1.2, 1, 0.8] }}
          transition={{ duration: 1.2, delay: b.delay, repeat: Infinity, repeatDelay: 3, ease: 'easeOut' }}
        >
          <BoltShape color={b.color} />
        </motion.div>
      ))}

      {/* Floating slang words */}
      {SLANG.map((s, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute', left: s.x, top: s.y, zIndex: 5,
            fontSize: s.size, fontWeight: 900, color: s.color,
            letterSpacing: '-0.02em', lineHeight: 1,
            textShadow: `0 0 12px ${s.color}88, 2px 2px 0 rgba(0,0,0,0.6)`,
            fontFamily: "'Inter', sans-serif",
            rotate: s.rot,
            whiteSpace: 'nowrap',
            WebkitTextStroke: '0.5px rgba(0,0,0,0.4)',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 1, 0.9, 1],
            y: [20, 0, -6, 0, -4, 0],
            scale: [0.6, 1.05, 1, 1.03, 1],
          }}
          transition={{
            duration: 3 + i * 0.2,
            delay: s.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          {s.text}
        </motion.div>
      ))}

      {/* Central tea cup — icon style matching reference image */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%', top: '50%',
          translateX: '-50%', translateY: '-50%',
          zIndex: 6,
        }}
        animate={{ y: [0, -14, 0, -9, 0], scale: [1, 1.04, 1, 1.03, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Frosted circle background */}
        <div style={{
          width: 180, height: 180, borderRadius: '50%',
          background: 'rgba(80,20,140,0.52)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: '0 0 48px rgba(178,75,243,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>

          {/* Sparkle top-right */}
          <motion.div style={{ position: 'absolute', top: 28, right: 26 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1.15, 0.85], rotate: [0, 15, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2 L15.8 12.2 L26 14 L15.8 15.8 L14 26 L12.2 15.8 L2 14 L12.2 12.2 Z"
                fill="rgba(244,114,182,0.90)" />
              <path d="M22 6 L22.8 9.2 L26 10 L22.8 10.8 L22 14 L21.2 10.8 L18 10 L21.2 9.2 Z"
                fill="rgba(244,114,182,0.65)" />
            </svg>
          </motion.div>

          {/* Sparkle bottom-left */}
          <motion.div style={{ position: 'absolute', bottom: 30, left: 22 }}
            animate={{ opacity: [0.4, 0.95, 0.4], scale: [0.8, 1.1, 0.8], rotate: [0, -12, 0] }}
            transition={{ duration: 2.8, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                fill="rgba(192,132,252,0.80)" />
              <path d="M19 5 L19.6 7.4 L22 8 L19.6 8.6 L19 11 L18.4 8.6 L16 8 L18.4 7.4 Z"
                fill="rgba(192,132,252,0.55)" />
            </svg>
          </motion.div>

          {/* Cup icon SVG — clean white stroke, rounded, matching reference */}
          <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* Steam dots — three rounded rectangles */}
            <motion.g
              animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <rect x="30" y="8" width="5" height="10" rx="2.5" fill="white" opacity="0.90"/>
            </motion.g>
            <motion.g
              animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -5, 0] }}
              transition={{ duration: 2.1, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}>
              <rect x="41" y="5" width="5" height="12" rx="2.5" fill="white" opacity="0.85"/>
            </motion.g>
            <motion.g
              animate={{ opacity: [0.3, 0.85, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 1.9, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
              <rect x="52" y="8" width="5" height="10" rx="2.5" fill="white" opacity="0.80"/>
            </motion.g>

            {/* Cup body — rounded rectangle, white stroke, purple fill */}
            <rect x="16" y="26" width="52" height="46" rx="10" ry="10"
              fill="rgba(60,10,100,0.55)" stroke="white" strokeWidth="4.5" strokeLinejoin="round"/>

            {/* Handle — D-shape on right */}
            <path d="M68 38 Q82 38 82 49 Q82 60 68 60"
              stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none"/>

          </svg>

        </div>
      </motion.div>

      {/* Splash ring around cup */}
      <motion.div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          translateX: '-50%', translateY: '-50%',
          width: 160, height: 160, borderRadius: '50%', zIndex: 3,
          border: '2px solid rgba(232,121,249,0.35)',
          boxShadow: '0 0 30px rgba(232,121,249,0.20)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          translateX: '-50%', translateY: '-50%',
          width: 200, height: 200, borderRadius: '50%', zIndex: 2,
          border: '1.5px solid rgba(167,139,250,0.20)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom tagline */}
      <motion.div
        style={{
          position: 'absolute', bottom: '4%', left: 0, right: 0,
          textAlign: 'center', zIndex: 7,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p style={{
          margin: 0, fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #e879f9, #a78bfa, #f472b6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          textShadow: 'none',
        }}>
          Spill the Tea. Own the Drama.
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.72rem', fontWeight: 600,
          color: 'rgba(192,132,252,0.60)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          12,400+ spillers joined this week ☕
        </p>
      </motion.div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   AUTH PAGE
───────────────────────────────────────────── */
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div style={{
      minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden',
      background: '#0d0015',
    }}>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${TeaBg})`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        animation: 'bgMove 12s ease-in-out infinite, bgFadeIn 1.2s ease-out forwards',
        opacity: 0,
      }} />

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(13,0,21,0.50) 0%, rgba(30,0,55,0.45) 50%, rgba(13,0,21,0.52) 100%)' }} />

      {/* Colored light leaks */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 15% 20%, rgba(217,70,239,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 75%, rgba(139,92,246,0.18) 0%, transparent 60%)' }} />

      <style>{`
        @keyframes bgMove {
          0%,100% { background-position: center center; }
          25%      { background-position: 55% 55%; }
          50%      { background-position: 45% 45%; }
          75%      { background-position: 55% 45%; }
        }
        @keyframes bgFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orbPulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.15); opacity: 1; }
        }

        /* Show left branding panel on desktop (768px+) */
        @media (min-width: 768px) {
          .auth-left-panel {
            display: flex !important;
          }
          .auth-right-panel {
            width: auto !important;
            max-width: none !important;
          }
        }
      `}</style>

      {/* ── Split container ── */}
      <div style={{
        position: 'relative', zIndex: 3,
        width: '100%', maxWidth: '62rem',
        display: 'flex', gap: '1.5rem',
        alignItems: 'stretch',
        maxHeight: '88vh',
      }}>

        {/* ── LEFT: Branding panel ── HIDDEN ON MOBILE */}
        <div style={{
          flex: '1 1 0', minWidth: 0,
          borderRadius: '1.75rem',
          padding: '1.5rem 1.5rem 1.25rem',
          display: 'none', /* Hidden on mobile */
          flexDirection: 'column',
          overflow: 'hidden', position: 'relative',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          backdropFilter: 'blur(28px) saturate(180%)',

          /* Silk multi-layer border — top-left bright, bottom-right dark */
          border: '1px solid transparent',
          backgroundClip: 'padding-box',
          outline: '1px solid rgba(168,85,247,0.18)',
          outlineOffset: '-1px',

          /* 3D depth shadow stack */
          boxShadow: [
            '0 2px 0 0 rgba(232,121,249,0.35) inset',       /* top specular edge */
            '0 -1px 0 0 rgba(109,40,217,0.40) inset',       /* bottom inner shadow */
            '1px 0 0 0 rgba(232,121,249,0.20) inset',       /* left specular edge */
            '-1px 0 0 0 rgba(80,20,140,0.50) inset',        /* right inner shadow */
            '0 0 0 1px rgba(168,85,247,0.22)',               /* outer border glow */
            '0 8px 32px rgba(109,40,217,0.40)',              /* mid shadow */
            '0 32px 80px rgba(80,0,160,0.35)',               /* deep shadow */
            'inset 0 1px 40px rgba(168,85,247,0.06)',        /* inner ambient */
          ].join(', '),

          /* subtle 3D tilt feel */
          transform: 'perspective(1200px) rotateY(1.5deg) rotateX(-0.5deg)',
          transformOrigin: 'center center',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        }}
        className="auth-left-panel"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(-3px)';
          e.currentTarget.style.boxShadow = [
            '0 2px 0 0 rgba(232,121,249,0.45) inset',
            '0 -1px 0 0 rgba(109,40,217,0.50) inset',
            '1px 0 0 0 rgba(232,121,249,0.28) inset',
            '-1px 0 0 0 rgba(80,20,140,0.60) inset',
            '0 0 0 1px rgba(168,85,247,0.35)',
            '0 12px 40px rgba(109,40,217,0.55)',
            '0 40px 100px rgba(80,0,160,0.45)',
            'inset 0 1px 60px rgba(168,85,247,0.10)',
          ].join(', ');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1200px) rotateY(1.5deg) rotateX(-0.5deg)';
          e.currentTarget.style.boxShadow = [
            '0 2px 0 0 rgba(232,121,249,0.35) inset',
            '0 -1px 0 0 rgba(109,40,217,0.40) inset',
            '1px 0 0 0 rgba(232,121,249,0.20) inset',
            '-1px 0 0 0 rgba(80,20,140,0.50) inset',
            '0 0 0 1px rgba(168,85,247,0.22)',
            '0 8px 32px rgba(109,40,217,0.40)',
            '0 32px 80px rgba(80,0,160,0.35)',
            'inset 0 1px 40px rgba(168,85,247,0.06)',
          ].join(', ');
        }}
        >

          {/* Logo header */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', zIndex: 8, position: 'relative' }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -8, borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(232,121,249,0.55), rgba(139,92,246,0.55))',
                filter: 'blur(12px)' }} />
              <img src={TeaFavicon} alt="TeaBrew" width={58} height={58}
                style={{ borderRadius: '1rem', position: 'relative', zIndex: 1,
                  boxShadow: '0 8px 24px rgba(168,85,247,0.60)' }} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 900, fontSize: '1.85rem', letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #e879f9, #a78bfa, #f472b6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                TeaBrew
              </p>
              <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(192,132,252,0.60)' }}>
                Expose Everything
              </p>
            </div>
          </motion.div>

          {/* 2D Motion Scene */}
          <BrandingScene />
        </div>

        {/* ── RIGHT: Form panel ── FULL WIDTH ON MOBILE */}
        <div className="auth-right-panel" style={{
          flex: '1 1 0', minWidth: 0,
          width: '100%', /* Full width on mobile */
          maxWidth: '100%', /* Full width on mobile */
          borderRadius: '1.75rem',
          padding: 'clamp(1.25rem, 1rem + 1.25vw, 1.75rem)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          overflow: 'hidden',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          backdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid transparent',
          backgroundClip: 'padding-box',
          outline: '1px solid rgba(168,85,247,0.18)',
          outlineOffset: '-1px',
          boxShadow: [
            '0 2px 0 0 rgba(232,121,249,0.35) inset',
            '0 -1px 0 0 rgba(109,40,217,0.40) inset',
            '-1px 0 0 0 rgba(232,121,249,0.20) inset',
            '1px 0 0 0 rgba(80,20,140,0.50) inset',
            '0 0 0 1px rgba(168,85,247,0.22)',
            '0 8px 32px rgba(109,40,217,0.40)',
            '0 32px 80px rgba(80,0,160,0.35)',
            'inset 0 1px 40px rgba(168,85,247,0.06)',
          ].join(', '),
          transform: 'perspective(1200px) rotateY(-1.5deg) rotateX(-0.5deg)',
          transformOrigin: 'center center',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(-3px)';
          e.currentTarget.style.boxShadow = [
            '0 2px 0 0 rgba(232,121,249,0.45) inset',
            '0 -1px 0 0 rgba(109,40,217,0.50) inset',
            '-1px 0 0 0 rgba(232,121,249,0.28) inset',
            '1px 0 0 0 rgba(80,20,140,0.60) inset',
            '0 0 0 1px rgba(168,85,247,0.35)',
            '0 12px 40px rgba(109,40,217,0.55)',
            '0 40px 100px rgba(80,0,160,0.45)',
            'inset 0 1px 60px rgba(168,85,247,0.10)',
          ].join(', ');
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1200px) rotateY(-1.5deg) rotateX(-0.5deg)';
          e.currentTarget.style.boxShadow = [
            '0 2px 0 0 rgba(232,121,249,0.35) inset',
            '0 -1px 0 0 rgba(109,40,217,0.40) inset',
            '-1px 0 0 0 rgba(232,121,249,0.20) inset',
            '1px 0 0 0 rgba(80,20,140,0.50) inset',
            '0 0 0 1px rgba(168,85,247,0.22)',
            '0 8px 32px rgba(109,40,217,0.40)',
            '0 32px 80px rgba(80,0,160,0.35)',
            'inset 0 1px 40px rgba(168,85,247,0.06)',
          ].join(', ');
        }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', marginTop: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -8, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(217,70,239,0.50), transparent 70%)',
                filter: 'blur(12px)' }} />
              <img src={TeaFavicon} alt="TeaBrew Logo" width={52} height={52}
                style={{ borderRadius: '0.875rem', position: 'relative', zIndex: 1,
                  boxShadow: '0 8px 24px rgba(168,85,247,0.50)',
                  animation: 'float 3s ease-in-out infinite' }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isSignUp
              ? <SignUpForm key="signup" onToggle={() => setIsSignUp(false)} />
              : <SignInForm key="signin" onToggle={() => setIsSignUp(true)} />
            }
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Auth;
