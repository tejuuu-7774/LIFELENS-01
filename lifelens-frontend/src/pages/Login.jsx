import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      alert("Welcome back 🌸");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f0ef] via-[#ffffff] to-[#d7e2e0]">
      <div className="bg-white/80 backdrop-blur-md shadow-md rounded-3xl w-full max-w-md p-10 transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Welcome back to <span className="text-[#5B8A72]">LifeLens</span>
        </h1>
        <p className="text-center text-gray-500 mb-8">
          A peaceful space to revisit your thoughts ☁️
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-md p-2 mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC] focus:outline-none transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#A8DADC] focus:outline-none transition"
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
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-[#5B8A72] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
