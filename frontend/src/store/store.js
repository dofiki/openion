// src/store/store.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  // --- Auth state ---
  user: JSON.parse(localStorage.getItem('user')) || null,

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  // --- Post Refresh Logic ---
  refreshKey: 0,

  triggerRefresh: () => {
    set((state) => ({ refreshKey: state.refreshKey + 1 }));
  }
}));

export default useAuthStore;
