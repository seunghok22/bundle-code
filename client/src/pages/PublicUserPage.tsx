import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/axios';
import { format } from 'date-fns';

const PublicUserPage: React.FC = () => {
    const { userId } = useParams();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            api.get(`/items/user/${userId}`)
                .then(res => setItems(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [userId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">User {userId}'s Public List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Platform</th>
                            <th className="py-2 px-4 border-b">Source</th>
                            <th className="py-2 px-4 border-b">Expires</th>
                            <th className="py-2 px-4 border-b">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{item.title}</td>
                                <td className="py-2 px-4 border-b">{item.platform}</td>
                                <td className="py-2 px-4 border-b">{item.source}</td>
                                <td className="py-2 px-4 border-b">{item.expires_at && format(new Date(item.expires_at), 'yyyy-MM-dd')}</td>
                                <td className="py-2 px-4 border-b">{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PublicUserPage;
