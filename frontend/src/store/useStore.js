import { create } from 'zustand';
import apiClient from '../services/api';

/**
 * 🌐 Global Store — Zustand
 * Gestion état: panier, wishlist, utilisateur
 */
const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  cartCount: 0,
  wishlistCount: 0,
  notifications: [],

  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },

  setCartCount: (count) => set({ cartCount: count }),
  setWishlistCount: (count) => set({ wishlistCount: count }),

  fetchCart: async () => {
    const user = get().user;
    if (!user) return;
    try {
      const res = await apiClient.get('/cart');
      const items = res.data?.items || res.data || [];
      set({ cartCount: Array.isArray(items) ? items.reduce((sum, i) => sum + (i.quantity || 1), 0) : 0 });
    } catch {
      // silently ignore — cart may not exist yet
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, cartCount: 0, wishlistCount: 0 });
  },
}));

export default useStore;
