import React, { useState, useEffect } from 'react';
import type { BundleItem } from '../stores/itemStore';
import { X } from 'lucide-react';

interface BundleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<BundleItem>) => Promise<void>;
    initialData?: BundleItem | null;
}

const BundleModal: React.FC<BundleModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState<Partial<BundleItem>>({
        title: '', code: '', platform: '', source: '', price: '', memo: '', is_public: true,
        purchased_at: '', expires_at: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                purchased_at: initialData.purchased_at ? initialData.purchased_at.split('T')[0] : '',
                expires_at: initialData.expires_at ? initialData.expires_at.split('T')[0] : ''
            });
        } else {
            setFormData({ title: '', code: '', platform: '', source: '', price: '', memo: '', is_public: true, purchased_at: '', expires_at: '' });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Game Title *</label>
                        <input required type="text" className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Code *</label>
                        <input required type="text" className="w-full border p-2 rounded font-mono" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Platform *</label>
                            <input required type="text" className="w-full border p-2 rounded" value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value })} placeholder="Steam, Epic..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Source</label>
                            <input type="text" className="w-full border p-2 rounded" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} placeholder="Humble Bundle..." />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Purchased At</label>
                            <input type="date" className="w-full border p-2 rounded" value={formData.purchased_at} onChange={e => setFormData({ ...formData, purchased_at: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Expires At</label>
                            <input type="date" className="w-full border p-2 rounded" value={formData.expires_at} onChange={e => setFormData({ ...formData, expires_at: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <input type="text" className="w-full border p-2 rounded" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Memo</label>
                        <textarea className="w-full border p-2 rounded" rows={3} value={formData.memo} onChange={e => setFormData({ ...formData, memo: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="is_public" checked={formData.is_public} onChange={e => setFormData({ ...formData, is_public: e.target.checked })} />
                        <label htmlFor="is_public">Public (Visible to others, sensitive masked)</label>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{initialData ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BundleModal;
