import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    api
      .get("/api/auth/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F6FBF7] flex flex-col items-center px-6 py-10">

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#4A6651]">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-[#5B8A72] text-white rounded-lg shadow hover:bg-[#4B735E]"
        >
          Logout
        </button>
      </header>

      {/* Welcome Card */}
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-lg border border-[#E3EFE7] text-center mb-12 mt-30">
        <h2 className="text-2xl font-semibold text-[#4A6651]">
          {user ? `Welcome, ${user.email}` : "Loading..."}
        </h2>
        <p className="text-gray-600 mt-2">
          Here’s your space to journal, reflect, and explore your daily journey.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
