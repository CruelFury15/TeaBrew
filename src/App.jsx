import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Spill from './pages/Spill';
import Hype from './pages/Hype';
import Alerts from './pages/Alerts';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Games from './pages/Games';
import Settings from './pages/Settings';
import TeaSpread from './pages/TeaSpread';
import Layout from './components/Layout';
import './App.css';

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/tea-room/:id" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Discover />
            </motion.div>
          }
        />
        <Route
          path="/home"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/discover"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Discover />
            </motion.div>
          }
        />
        <Route
          path="/spill"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Spill />
            </motion.div>
          }
        />
        <Route
          path="/hype"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hype />
            </motion.div>
          }
        />
        <Route
          path="/alerts"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Alerts />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Profile />
            </motion.div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hype />
            </motion.div>
          }
        />
        <Route path="/user/:username" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <UserProfile />
            </motion.div>
          }
        />
        <Route path="/games" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Games />
            </motion.div>
          }
        />
        <Route path="/settings" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Settings />
            </motion.div>
          }
        />
        <Route path="/tea-spread/:postId" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <TeaSpread />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Auth />;
  }

  // After login, always redirect to home
  if (location.pathname === '/' || location.pathname === '') {
    return <Navigate to="/home" replace />;
  }

  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: { background: '#11001C', border: '1px solid #B24BF3', color: '#fff' }
        }}
      />
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App



