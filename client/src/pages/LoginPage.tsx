import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const LoginPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            login(token).then(() => {
                navigate('/');
            });
        }
    }, [searchParams, login, navigate]);

    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Login to Game Bundle Manager</h1>
                <button
                    onClick={handleLogin}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
