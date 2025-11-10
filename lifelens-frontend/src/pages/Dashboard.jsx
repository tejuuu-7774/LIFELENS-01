import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout"); // clears cookie on server
    } catch (err) {
      // ignore errors but continue clearing client state
      console.error("Logout error:", err?.response?.data || err.message);
    } finally {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("lifelens_user");
      // navigate replace so back can't go to dashboard
      navigate("/login", { replace: true });
    }
  };

  const user = JSON.parse(localStorage.getItem("lifelens_user") || "{}");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB]">
      <h1 className="text-3xl font-bold mb-6">Welcome {user.name || "to your Dashboard"}</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
