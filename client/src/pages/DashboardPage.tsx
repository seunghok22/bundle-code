import React, { useEffect, useState } from 'react';
import { useItemStore, BundleItem } from '../stores/itemStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Copy, Eye, EyeOff, Plus, Trash, Edit, Share2 } from 'lucide-react';
import BundleModal from '../components/BundleModal';

const DashboardPage: React.FC = () => {
    const { items, fetchItems, deleteItem, addItem, updateItem } = useItemStore();
    const { user } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BundleItem | null>(null);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure?')) {
            await deleteItem(id);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: BundleItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: Partial<BundleItem>) => {
        if (editingItem) {
            await updateItem(editingItem.id, data);
        } else {
            await addItem(data);
        }
    };

    const copyLink = () => {
        const url = `${window.location.origin}/u/${user?.id}`;
        navigator.clipboard.writeText(url);
        alert('Public link copied to clipboard!');
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Game Bundles</h1>
            <div className="mb-4 flex justify-between">
                <div className="flex gap-2">
                    <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition">
                        <Plus size={16} /> Add New Item
                    </button>
                    <button onClick={copyLink} className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-300 transition">
                        <Share2 size={16} /> Share Public Link
                    </button>
                </div>
                <div className="text-gray-600 flex items-center">
                    Logged in as {user?.nickname}
                </div>
            </div>

            <div className="overflow-x-auto shadow rounded-lg border">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchased</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memo</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vis.</th>
                            <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {items.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 whitespace-nowrap">{item.title}</td>
                                <td className="py-2 px-4 font-mono bg-gray-100 rounded text-sm select-all">{item.code}</td>
                                <td className="py-2 px-4 whitespace-nowrap">{item.platform}</td>
                                <td className="py-2 px-4 whitespace-nowrap">{item.source}</td>
                                <td className="py-2 px-4 whitespace-nowrap">{item.purchased_at && format(new Date(item.purchased_at), 'yyyy-MM-dd')}</td>
                                <td className="py-2 px-4 whitespace-nowrap">{item.expires_at && format(new Date(item.expires_at), 'yyyy-MM-dd')}</td>
                                <td className="py-2 px-4 whitespace-nowrap">{item.price}</td>
                                <td className="py-2 px-4 max-w-xs truncate" title={item.memo}>{item.memo}</td>
                                <td className="py-2 px-4 whitespace-nowrap text-gray-500">{item.is_public ? <Eye size={16} /> : <EyeOff size={16} />}</td>
                                <td className="py-2 px-4 whitespace-nowrap flex gap-2">
                                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><Trash size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {items.length === 0 && <div className="p-8 text-center text-gray-500">No items found. Add one!</div>}
            </div>
            <BundleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} initialData={editingItem} />
        </div>
    );
};

export default DashboardPage;
