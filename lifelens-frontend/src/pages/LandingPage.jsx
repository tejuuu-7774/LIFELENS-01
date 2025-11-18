import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F6FBF7] text-[#415D47]">

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-14">
        <h1 className="text-6xl font-extrabold tracking-tight mb-4">
          LifeLens
        </h1>

        <p className="text-lg text-gray-700 max-w-xl">
          A soft space to capture your days  
          and understand the story you're living.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            to="/signup"
            className="px-8 py-3 bg-[#5B8A72] text-white rounded-xl shadow hover:bg-[#4B735E]"
          >
            Start Journaling
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white border border-[#C9DCCF] rounded-xl hover:bg-[#F3FAF6]"
          >
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES*/}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-8 rounded-2xl shadow border border-[#E5EFE8]">
            <h3 className="text-xl font-semibold mb-2">Journaling</h3>
            <p className="text-gray-600">
              Write in a space designed for calm clarity.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow border border-[#E5EFE8]">
            <h3 className="text-xl font-semibold mb-2">Mood Insights</h3>
            <p className="text-gray-600">
              Spot your emotional patterns effortlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow border border-[#E5EFE8]">
            <h3 className="text-xl font-semibold mb-2">Memory Map</h3>
            <p className="text-gray-600">
              Revisit moments that shaped you.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-white p-10 rounded-3xl border border-[#D9EAE0] shadow-lg text-center">
          <h3 className="text-3xl font-bold mb-3">Begin your quiet journey.</h3>
          <p className="text-gray-700 mb-6">
            Your story deserves a gentle place to unfold.
          </p>

          <Link
            to="/signup"
            className="px-10 py-4 bg-[#5B8A72] text-white rounded-xl shadow hover:bg-[#4B735E]"
          >
            Create an Account
          </Link>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-400">
        LifeLens • A softer way to see your life.
      </footer>
    </div>
  );
}
