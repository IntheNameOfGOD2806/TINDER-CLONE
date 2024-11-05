import { create } from "zustand";
import { checkAuth } from "../services/apiServices";
export const useAuthStore = create((set) => ({
  loading: false,
  error: false,
  authuser: null,
  checkingAuth: true,
  signup: async (data) => {},
  checkAuth: async () => {
    try {
      const res = await checkAuth();
      if (res && res?.success && res?.user) {
        console.log(">>>check auth user:", res.user);
      }
    } catch (error) {
      console.log(error);
    }
  },
  setAuthUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
