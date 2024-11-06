import {create} from "zustand";
import {checkAuth, postLogout, postSignup} from "../services/apiServices";

export const useAuthStore = create((set) => ({

    loading: false,
    error: false,
    authUser: localStorage.getItem("authuser")
        ? JSON.parse(localStorage.getItem("authuser"))
        : null,
    checkingAuth: true,
    signup: async (data) => {
        try {
            set({loading: true});
            const res = await postSignup(data);
            if (res && res?.success && res?.user) {
                localStorage.setItem("authuser", JSON.stringify(res.user._id));
                set({authuser: res.user});
            }
        } catch (error) {
            console.log(error);
            set({error: error.message});
        } finally {
            set({loading: false});
        }
    },
    logout: async () => {
        localStorage.removeItem("authuser");
        const res = await postLogout()
        if (res && res?.success && res?.user) {
            set({authUser: null});
        }
        return res
    },
    checkAuth: async () => {
        try {
            const res = await checkAuth();
            if (res && res?.success && res?.user) {
                console.log(">>>check auth user:", res.user);
                set({authUser: res.user});
            }
        } catch (error) {
            console.log(error);
        } finally {
            set({checkingAuth: false});
        }
    },
    setAuthUser: (authUser) => set({authUser}),
    setLoading: (loading) => set({loading}),
    setError: (error) => set({error}),
}));
