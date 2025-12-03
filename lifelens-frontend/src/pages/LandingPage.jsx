import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { 
  BookOpen, 
  PenTool, 
  Moon, 
  Calendar, 
  Search, 
  TrendingUp, 
  Heart, 
  Menu, 
  X,
  ArrowRight,
  Feather
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // This logic relies on your external 'api' utility. 
    // Uncomment this when integrating with your backend API.
    /*
    api.get("/api/auth/me")
      .then(() => navigate("/dashboard", { replace: true }))
      .catch(() => {});
    */
  }, [navigate]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); 
  };

  return (
    <div className="min-h-screen bg-[#F6FBF7] text-[#2F4A3E] font-sans selection:bg-[#C9DCCF] selection:text-[#2F4A3E]">
      
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-[#F6FBF7]/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo/Home Link */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#2F4A3E] text-white p-2 rounded-lg">
              <Feather size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">LifeLens</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-[#2F4A3E] transition">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-[#2F4A3E] transition">How it works</a>
            <div className="flex gap-4">
              {/* Login Link */}
              <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-[#2F4A3E] hover:bg-green-50 rounded-full transition">
                Log in
              </Link>
              {/* Signup Button (using onClick for complex styling) */}
              <button 
                onClick={() => handleNavigate("/signup")} 
                className="px-5 py-2.5 text-sm font-semibold bg-[#2F4A3E] text-white rounded-full hover:bg-[#1a2f26] shadow-lg shadow-green-900/10 transition transform hover:-translate-y-0.5"
              >
                Start Writing
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-green-100 p-6 flex flex-col gap-4 shadow-xl">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Features</a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">How it works</a>
            <hr className="border-green-100"/>
            {/* Login Link for Mobile */}
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-full py-3 text-center font-semibold border border-green-200 rounded-xl"
            >
              Log in
            </Link>
            {/* Signup Link for Mobile */}
            <Link 
              to="/signup" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-full py-3 text-center font-semibold bg-[#2F4A3E] text-white rounded-xl"
            >
              Start Writing
            </Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Text Content */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/50 text-[#2F4A3E] text-xs font-bold uppercase tracking-wider border border-green-200">
            <span className="w-2 h-2 rounded-full bg-[#5B8A72]"></span>
            Private & Secure
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Understand the story <br/>
            <span className="text-[#5B8A72]">you live every day.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            A gentle place to write, reflect, and track your mood. Let AI help you find clarity in the quiet moments between the noise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Start Journaling (Signup CTA) */}
            <button 
              onClick={() => handleNavigate("/signup")}
              className="px-8 py-4 bg-[#2F4A3E] text-white text-lg font-semibold rounded-2xl shadow-xl shadow-green-900/10 hover:bg-[#1a2f26] transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start Journaling <ArrowRight size={18} />
            </button>
            {/* View Demo (Login CTA - renamed from original code) */}
            <button 
              onClick={() => handleNavigate("/login")}
              className="px-8 py-4 bg-white text-[#2F4A3E] border border-green-200 text-lg font-semibold rounded-2xl hover:bg-green-50 transition flex items-center justify-center"
            >
              Log In
            </button>
          </div>

          {/* FAKE DATA REMOVED: Removed the avatar stack and 'Join X writers' text. */}

        </div>

        {/* Hero Visual / Mockup */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Decorative Blobs */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-10 left-10 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          {/* Card Interface */}
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 w-full max-w-md rounded-[2.5rem] shadow-2xl p-6 md:p-8 transform rotate-2 hover:rotate-0 transition duration-500">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Wed, Oct 24</div>
                <div className="text-xl font-bold text-[#2F4A3E]">Evening Reflection</div>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-[#2F4A3E]">
                <PenTool size={18} />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-green-50 shadow-sm">
                <p className="text-gray-600 italic leading-relaxed text-sm">
                  "Today felt slower than usual, but in a good way. I took a walk during lunch and noticed how the light hit the buildings..."
                </p>
              </div>
              
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-green-100 text-[#2F4A3E] text-xs font-semibold rounded-full">Calm</span>
                 <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">Nature</span>
              </div>
            </div>

            {/* AI Insight Pill */}
            <div className="mt-6 pt-6 border-t border-green-100">
              <div className="flex gap-3 items-start">
                <div className="mt-1 p-1 bg-purple-100 rounded text-purple-600">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">AI Insight</p>
                  <p className="text-xs text-gray-600 mt-1">You seem to find peace when you disconnect mid-day. This is the 3rd time you've mentioned "light" this week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES / HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white rounded-[3rem] mx-2 md:mx-6 shadow-sm border border-green-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2F4A3E] mb-4">A sanctuary for your thoughts</h2>
            <p className="text-gray-500 text-lg">We've stripped away the distractions to help you focus on what matters: your own peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#F6FBF7] p-8 rounded-3xl border border-green-100 hover:shadow-lg transition duration-300 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5B8A72] mb-6 group-hover:scale-110 transition">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Write freely</h3>
              <p className="text-gray-600 leading-relaxed">
                Capture moments big or small in a clean, distraction-free editor designed for focus.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F6FBF7] p-8 rounded-3xl border border-green-100 hover:shadow-lg transition duration-300 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5B8A72] mb-6 group-hover:scale-110 transition">
                <Moon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Reflect deeply</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive gentle, AI-powered reflections that act like a friend who truly listens and understands.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F6FBF7] p-8 rounded-3xl border border-green-100 hover:shadow-lg transition duration-300 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5B8A72] mb-6 group-hover:scale-110 transition">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">See growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize your emotional journey with mood heatmaps and highlight reels of your best days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE BENTO GRID */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
             <h2 className="text-3xl md:text-4xl font-bold text-[#2F4A3E] mb-4">Everything you need to<br/>understand yourself better.</h2>
          </div>
          {/* See all features CTA */}
          <button onClick={() => handleNavigate("/signup")} className="hidden md:flex text-[#5B8A72] font-semibold hover:text-[#2F4A3E] items-center gap-2 transition">
            Start Your Journey <ArrowRight size={16}/>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <PenTool/>, title: "AI Starter Prompts", desc: "Writer's block? Get gentle nudges tailored to your mood." },
            { icon: <Calendar/>, title: "Writing Heatmap", desc: "Watch your consistency bloom over weeks and months." },
            { icon: <Heart/>, title: "Mood Tracking", desc: "Log your emotions and spot patterns across time." },
            { icon: <Search/>, title: "Smart Search", desc: "Find that one memory from last summer in seconds." },
            { icon: <BookOpen/>, title: "Clean Journaling", desc: "A calming canvas crafted specifically for clarity." },
            { icon: <TrendingUp/>, title: "Weekly Insights", desc: "Get a summary of your emotional landscape every Sunday." }
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-5 p-6 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-green-100 transition duration-200">
              <div className="text-[#5B8A72] bg-green-50 p-3 rounded-xl">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#2F4A3E]">{feature.title}</h4>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-12 pb-24">
        <div className="relative bg-[#2F4A3E] rounded-[3rem] overflow-hidden text-center py-20 px-6">
          
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Begin your quiet journey.
            </h2>
            <p className="text-green-100 text-lg mb-10">
              Your days deserve a home. Start your first entry in less than a minute.
            </p>
            
            {/* Create Free Account CTA */}
            <button
              onClick={() => handleNavigate("/signup")}
              className="px-10 py-4 bg-[#F6FBF7] text-[#2F4A3E] font-bold text-lg rounded-2xl shadow-2xl hover:bg-white hover:scale-105 transition transform duration-200"
            >
              Create Free Account
            </button>
            <p className="text-green-200/60 text-sm mt-6">Free forever plan available.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-green-50 pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center gap-2">
            <div className="bg-[#2F4A3E] text-white p-1.5 rounded-md">
              <Feather size={16} />
            </div>
            <span className="text-lg font-bold text-[#2F4A3E] tracking-tight">LifeLens</span>
          </div>

          {/* Cleaned up placeholder links, keeping only relevant navigation */}
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-[#2F4A3E] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#2F4A3E] transition">How it works</a>
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LifeLens Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;