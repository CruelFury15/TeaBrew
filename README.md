# TeaBrew - Social Media Platform

A modern social media platform built with React, featuring real-time interactions, content sharing, and community engagement.

## Features

- 🎨 Dark theme with violet/purple/black color palette
- 🔐 Production-grade authentication with Supabase
- 📱 Responsive design with smooth animations
- 🎯 Redux Toolkit for state management
- ✅ Form validation with React Hook Form + Zod
- 🔄 React Router for seamless navigation
- ♿ Semantic HTML with ARIA attributes

## Tech Stack

- React 19
- Vite 7
- Redux Toolkit
- React Router
- Supabase Auth
- React Hook Form + Zod
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd tea-brew
```

2. Install dependencies
```bash
npm install
```

3. Configure Supabase
- Create a project at [https://app.supabase.com](https://app.supabase.com)
- Copy your project URL and anon key
- Update `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Configure OAuth providers (optional)
- Enable Google and Apple OAuth in Supabase dashboard
- See `SUPABASE_SETUP.md` for detailed instructions

5. Start development server
```bash
npm run dev
```

## Authentication

The app uses Supabase Auth with multiple sign-in methods:
- Email + Password (with strong password validation)
- Email + OTP (magic link)
- Google OAuth
- Apple OAuth

All forms include:
- Real-time validation with Zod schemas
- Disabled state during submission
- Loading spinners
- Read-only fields during submission
- Semantic HTML with proper labels
- ARIA attributes for accessibility

See `SUPABASE_SETUP.md` for complete authentication setup guide.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── store/           # Redux store and slices
├── lib/             # Third-party configurations
├── schemas/         # Zod validation schemas
├── providers/       # Context providers
└── utils/           # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Documentation

- `ARCHITECTURE.md` - Application architecture overview
- `COMPONENT_GUIDE.md` - Component usage guide
- `SUPABASE_SETUP.md` - Authentication setup guide
- `MIGRATION_GUIDE.md` - Migration notes
- `REFACTORING.md` - Refactoring decisions

## License

MIT
