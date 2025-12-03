import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/auth/signup", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] to-[#ffffff]">
      <div className="bg-white/80 backdrop-blur-md shadow-md rounded-3xl w-full max-w-md p-10">

        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Welcome to <span className="text-[#5B8A72]">LifeLens</span>
        </h1>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-md p-2 mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC]"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC]"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white ${
              loading ? "bg-[#A8DADC]/70" : "bg-[#5B8A72] hover:bg-[#497660]"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?
          <Link to="/login" className="text-[#5B8A72] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
