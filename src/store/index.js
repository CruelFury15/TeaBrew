import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    posts: postsReducer,
  },
});

export { login, logout } from './slices/authSlice';
export { openModal, closeModal, setTheme } from './slices/uiSlice';
export { addPost, updatePost, deletePost } from './slices/postsSlice';
