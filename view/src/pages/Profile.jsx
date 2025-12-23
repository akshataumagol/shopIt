import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import MyOrdersPage from "./MyOrdersPage";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    authAPI
      .getMe()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow flex flex-col md:flex-row">
        
        {/* SIDEBAR */}
        <div className="md:w-1/4 border-r p-6">
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-500 text-sm mb-6">{user.email}</p>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* CONTENT */}
        <div className="md:w-3/4 p-6">
          <MyOrdersPage email={user.email} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
