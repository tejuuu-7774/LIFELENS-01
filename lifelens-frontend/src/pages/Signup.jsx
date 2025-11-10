import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/signup", formData);
      // After signup, redirect to login page (replace history so back doesn't go to signup)
      alert("Signup successful! Please log in.");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] overflow-hidden">
      <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-md rounded-3xl w-full max-w-md p-10 transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Welcome to <span className="text-[#5B8A72]">LifeLens</span>
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Begin your calm journaling journey 🌿
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-md p-2 mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC] focus:outline-none transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC] focus:outline-none transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC] focus:outline-none transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white transition ${
              loading
                ? "bg-[#A8DADC]/70 cursor-not-allowed"
                : "bg-[#5B8A72] hover:bg-[#497660]"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#5B8A72] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
