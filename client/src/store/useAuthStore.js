import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { checkAuth, postLogout, postSignup } from "../services/apiServices";

export const useAuthStore = create(
  devtools((set) => ({
    loading: false,
    error: false,
    authUser: null,
    checkingAuth: true,

    signup: async (data) => {
      try {
        set({ loading: true });
        const res = await postSignup(data);
        if (res && res?.success && res?.user) {
          localStorage.setItem("authuser", JSON.stringify(res.user));
          localStorage.setItem("auth-user-id", JSON.stringify(res.user._id));
          set({ authUser: res.user });
        }
      } catch (error) {
        console.log(error);
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },
    logout: async () => {
      localStorage.removeItem("authuser");
      localStorage.removeItem("auth-user-id");
      const res = await postLogout();
      if (res && res?.success) {
        set({ authUser: null });
      }
      return res;
    },
    checkAuth: async () => {
      set({ checkingAuth: true });
      const user = localStorage.getItem("authuser");
      if (user) {
        set({ authUser: JSON.parse(user) });
        set({ checkingAuth: false });
        return
      } else {
        try {
          const res = await checkAuth();
          if (res && res?.success && res?.user) {
            set({ authUser: res.user });
          }
        } catch (error) {
          console.log(error);
        } finally {
          set({ checkingAuth: false });
        }
      }
    },
    setAuthUser: (authUser) => set({ authUser }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  }))
);
