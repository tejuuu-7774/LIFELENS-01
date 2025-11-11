import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f0] via-[#f0fbff] to-[#f7fff4]">
      <div className="max-w-2xl w-full p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">LifeLens</h1>
        <p className="text-gray-600 mb-8">
          A calm place to journal, reflect, and grow.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-6 py-3 bg-[#5B8A72] text-white rounded-lg hover:bg-[#497660] transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-gray-200 rounded-lg hover:underline transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
