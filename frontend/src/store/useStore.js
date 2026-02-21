import { create } from 'zustand';

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

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, cartCount: 0, wishlistCount: 0 });
  },
}));

export default useStore;
