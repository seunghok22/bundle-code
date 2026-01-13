import React, { useState } from 'react';
import api from '../lib/axios';
import { Link } from 'react-router-dom';

const SearchPage: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.get(`/items/search?keyword=${keyword}`);
            setResults(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Search Games</h1>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    placeholder="Search for game titles..."
                    className="flex-1 p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((item: any) => (
                    <div key={item.id} className="border p-4 rounded bg-white shadow hover:shadow-md transition">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.platform}</p>
                        <p className="mt-2 text-sm">Owner: {item.user?.nickname}</p>
                        <Link to={`/u/${item.user?.id}`} className="text-blue-500 text-sm mt-2 block">View User's List</Link>
                    </div>
                ))}
            </div>
            {results.length === 0 && !loading && <p className="text-gray-500">No results found.</p>}
        </div>
    );
};

export default SearchPage;
