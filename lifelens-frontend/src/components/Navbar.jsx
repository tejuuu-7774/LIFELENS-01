import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/api/auth/logout");
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-[#F6FBF7] border-b border-[#E3EFE7] px-6 py-3 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-[#4A6651] tracking-tight">
          LifeLens
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-10 relative">
          {[
            { name: "Dashboard", to: "/dashboard" },
            { name: "Journals", to: "/journals" },
            { name: "Add Entry", to: "/journals/add" }
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative group font-medium text-[#4A6651] hover:text-[#5B8A72] transition"
            >
              {item.name}

              {/* Smooth Animated Underline */}
              <span
                className={`
                  absolute left-0 -bottom-1 h-[2px] w-full bg-[#5B8A72] rounded-full
                  transform transition-all duration-300 origin-left
                  ${isActive(item.to) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                `}
              ></span>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-4 py-2 bg-[#5B8A72] text-white rounded-xl shadow hover:bg-[#4B735E] transition"
        >
          {loading ? "..." : "Logout"}
        </button>
      </div>
    </nav>
  );
}
