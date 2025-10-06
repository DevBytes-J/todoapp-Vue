import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase";
const currentUser = ref(null);
export function useAuth() {
    const isAuthenticated = computed(() => currentUser.value !== null);
    // Check for existing session
    const checkSession = async () => {
        const { data: { session }, } = await supabase.auth.getSession();
        currentUser.value = session?.user ?? null;
    };
    const login = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error)
                throw error;
            currentUser.value = data.user;
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    };
    const signup = async (email, password, name) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });
            if (error)
                throw error;
            currentUser.value = data.user;
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    };
    const logout = async () => {
        await supabase.auth.signOut();
        currentUser.value = null;
    };
    // Listen to auth changes
    supabase.auth.onAuthStateChange((event, session) => {
        currentUser.value = session?.user ?? null;
    });
    return {
        currentUser,
        isAuthenticated,
        login,
        signup,
        logout,
        checkSession,
    };
    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error)
            return { success: false, error: error.message };
        return { success: true };
    };
}
