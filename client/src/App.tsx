import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import PublicUserPage from './pages/PublicUserPage';
import { useAuthStore } from './stores/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    if (token) fetchUser();
  }, [token, fetchUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold"><a href="/">BundleManager</a></div>
          <div className="flex gap-4">
            <a href="/search" className="hover:text-blue-500">Search</a>
            {token ? (
              <button onClick={() => useAuthStore.getState().logout()} className="text-red-500">Logout</button>
            ) : (
              <a href="/login" className="text-blue-500">Login</a>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/u/:userId" element={<PublicUserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
