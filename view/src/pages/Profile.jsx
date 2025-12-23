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

    authAPI.getMe()
      .then(data => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-6">
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        <button
          onClick={logout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Orders */}
      <div className="w-3/4 p-6">
        <MyOrdersPage email={user.email} />
      </div>
    </div>
  );
}

export default Profile;
