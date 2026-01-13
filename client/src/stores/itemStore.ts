import { create } from 'zustand';
import api from '../lib/axios';

export interface BundleItem {
    id: number;
    title: string;
    code?: string;
    platform: string;
    purchased_at?: string;
    expires_at?: string;
    source?: string;
    price?: string;
    memo?: string;
    is_public: boolean;
    user_id: number;
}

interface ItemStore {
    items: BundleItem[];
    fetchItems: () => Promise<void>;
    addItem: (data: Partial<BundleItem>) => Promise<void>;
    updateItem: (id: number, data: Partial<BundleItem>) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
}

export const useItemStore = create<ItemStore>((set) => ({
    items: [],
    fetchItems: async () => {
        try {
            const response = await api.get('/items');
            set({ items: response.data });
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    },
    addItem: async (data) => {
        try {
            const response = await api.post('/items', data);
            set((state) => ({ items: [...state.items, response.data] }));
        } catch (error) {
            console.error('Failed to add item:', error);
            throw error;
        }
    },
    updateItem: async (id, data) => {
        try {
            const response = await api.patch(`/items/${id}`, data);
            set((state) => ({
                items: state.items.map((item) => (item.id === id ? response.data : item)),
            }));
        } catch (error) {
            console.error('Failed to update item:', error);
            throw error;
        }
    },
    deleteItem: async (id) => {
        try {
            await api.delete(`/items/${id}`);
            set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
        } catch (error) {
            console.error('Failed to delete item:', error);
            throw error;
        }
    },
}));
