import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // This will remove token and you wont be able to access dashboard
    navigate("/login"); // then if you try to access protected routes then it will redirect to login 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB]">
      <h1 className="text-3xl font-bold mb-6">Dashboard!</h1>
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
