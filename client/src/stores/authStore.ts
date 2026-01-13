import { create } from 'zustand';
import api from '../lib/axios';

interface User {
    id: number;
    email: string;
    nickname: string;
    googleId: string;
}

interface AuthStore {
    user: User | null;
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    login: async (token: string) => {
        localStorage.setItem('token', token);
        set({ token });
        try {
            const response = await api.get('/user/profile');
            set({ user: response.data });
        } catch (e) {
            console.error(e);
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
    fetchUser: async () => {
        try {
            const response = await api.get('/user/profile');
            set({ user: response.data });
        } catch (error) {
            console.error('Failed to fetch user:', error);
            set({ user: null });
        }
    }
}));
