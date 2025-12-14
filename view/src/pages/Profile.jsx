import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { toast } from 'sonner';
import MyOrdersPage from './MyOrdersPage';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authAPI.getMe();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-10">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-md p-6 flex flex-col items-center md:items-start">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{user.name || 'User'}</h1>
        <p className="text-gray-600 mb-6">{user.email}</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-3/4 p-6 overflow-auto">
        <MyOrdersPage />
      </div>
    </div>
  );
}

export default Profile;
