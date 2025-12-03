import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import {
  Feather,
  BookOpen,
  LogOut,
  LayoutDashboard,
  PenTool,
  User,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/api/auth/logout");
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const navItems = [
    { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { name: "Journals", to: "/journals", icon: BookOpen },
    { name: "Add Entry", to: "/journals/add", icon: PenTool },
    { name: "Articles", to: "/articles", icon: Feather },
    { name: "Profile", to: "/profile", icon: User }
  ];

  const active = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-[#F6FBF7]/90 backdrop-blur-sm border-b border-green-100 px-6 py-4 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-[#5B8A72] text-white p-2 rounded-lg">
            <Feather size={20} />
          </div>
          <span className="text-xl font-bold text-[#2F4A3E] tracking-tight">
            LifeLens
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative group font-medium text-[#2F4A3E] hover:text-[#5B8A72] transition"
            >
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#5B8A72] rounded-full transition-all duration-300
                ${active(item.to) ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"}`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Logout */}
        <button
          onClick={logout}
          disabled={loading}
          className="hidden md:flex px-5 py-2 bg-[#5B8A72] text-white rounded-full font-semibold shadow hover:bg-[#4B735E] transition items-center gap-2 text-sm"
        >
          <LogOut size={16} />
          {loading ? "Logging Out..." : "Logout"}
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[#2F4A3E]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-[65px] left-0 w-full bg-white border-b border-green-100 p-4 flex flex-col gap-2 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg font-medium transition 
                ${active(item.to) ? "bg-green-50 text-[#5B8A72]" : "text-[#2F4A3E] hover:bg-green-50"}`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}

          <button
            onClick={logout}
            disabled={loading}
            className="mt-2 flex items-center gap-3 p-3 rounded-lg font-semibold bg-[#5B8A72] text-white hover:bg-[#4B735E] transition"
          >
            <LogOut size={18} />
            {loading ? "Logging Out..." : "Logout"}
          </button>
        </div>
      )}
    </nav>
  );
}
