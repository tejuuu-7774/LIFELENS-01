import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post("/api/auth/signup", formData);
      setResult(res.data);
      setFormData({ name: "", email: "", password: "" });
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
        <p className="text-center text-gray-500 mb-8">
          Begin your calm journaling journey 🌿
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-md p-2 mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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

        {result && (
          <div className="mt-5 text-sm text-gray-700 bg-green-50 border border-green-100 rounded-md p-3">
            <p><strong>{result.message}</strong></p>
            <p className="break-words mt-2">
              <strong>Hashed Password:</strong> {result.hashedPassword}
            </p>
            <p className="break-words mt-2">
              <strong>Token:</strong> {result.token}
            </p>
            <p
              onClick={() => navigate("/login")}
              className="mt-3 text-[#5B8A72] hover:underline cursor-pointer text-center"
            >
              Proceed to Login →
            </p>
          </div>
        )}

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
