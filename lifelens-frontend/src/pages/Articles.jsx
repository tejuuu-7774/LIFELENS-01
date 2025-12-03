import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function Articles() {
  const [filter, setFilter] = useState("all");

  const allArticles = [
    {
      id: 1,
      title: "What Is Slow Living?",
      source: "Slow Living LDN",
      link: "https://slowlivingldn.com/what-is-slow-living/",
      excerpt:
        "A thoughtful dive into the roots of the slow living movement — its meaning, mindset, and why the world needs gentler rhythms.",
      category: "Mindfulness",
    },
    {
      id: 2,
      title: "Slow Living – Haven Diaries",
      source: "Medium",
      link: "https://medium.com/@havendiaries/slow-living-2c3f3c5e0c01",
      excerpt:
        "A soft, personal reflection on choosing presence over hurry — perfect for those craving emotional clarity and quiet courage.",
      category: "Personal Story",
    },
    {
      id: 3,
      title: "Why Doing Nothing Is Good for Us",
      source: "BBC Culture",
      link: "https://www.bbc.com/culture/article/20240724-why-doing-nothing-intentionally-is-good-for-us-the-rise-of-the-slow-living-movement",
      excerpt:
        "An insightful exploration of intentional rest, and why slowing down is becoming a global act of healing.",
      category: "Psychology",
    },
    {
      id: 4,
      title: "My Honest Journey to Slow Living",
      source: "Loving Life in Wellies",
      link: "https://lovinglifeinwellies.co.uk/my-honest-journey-to-a-slow-living-lifestyle/",
      excerpt:
        "A vulnerable, heartfelt story of stepping away from chaos and embracing a life shaped by intention and gentleness.",
      category: "Personal Story",
    },
    {
      id: 5,
      title: "Living Slowly",
      source: "Psychology Today",
      link: "https://www.psychologytoday.com/us/blog/out-of-the-darkness/202407/living-slowly",
      excerpt:
        "A psychological dive into how slowing down improves our emotional well-being, clarity, and long-term happiness.",
      category: "Psychology",
    },
  ];

  const categories = ["Mindfulness", "Personal Story", "Psychology"];

  const featuredArticle = allArticles[0];
  const filteredArticles = allArticles.filter(
    (a) => filter === "all" || a.category === filter
  );

  const articlesToDisplay =
    filter === "all"
      ? allArticles.slice(1)
      : filteredArticles;

  return (
    <div className="min-h-screen bg-[#F6FBF7] pb-20 font-['Inter',_sans-serif]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-28">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2F4A3E] mb-3 tracking-tight">
          Curated Inspiration
        </h1>

        <p className="text-gray-600 mb-10 text-xl leading-relaxed max-w-2xl">
          Words that help you breathe deeper, soften your pace, and rediscover the poetry of being alive.
        </p>

        {filter === "all" && (
          <a
            href={featuredArticle.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-3xl shadow-xl border-t-8 border-[#5B8A72] p-8 sm:p-12 mb-10 
                       transform hover:shadow-2xl transition-all duration-300 ease-out 
                       bg-gradient-to-br from-white to-green-50"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center rounded-full bg-[#5B8A72] px-4 py-1.5 text-sm font-bold text-white uppercase tracking-wider">
                Featured Read
              </span>
              <ExternalLink
                size={24}
                className="text-gray-400 group-hover:text-[#4B735E] transition shrink-0"
              />
            </div>

            <h2 className="text-4xl font-extrabold text-[#2F4A3E] leading-tight mb-4">
              {featuredArticle.title}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
              {featuredArticle.excerpt}
            </p>

            <p className="text-md mt-4 text-[#5B8A72] font-semibold">
              {featuredArticle.source}
            </p>

            <div className="mt-8 flex items-center text-[#5B8A72] font-bold text-base border-t border-gray-200 pt-4 w-fit">
              Dive In
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition"
              />
            </div>
          </a>
        )}

        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition 
              ${
                filter === "all"
                  ? "bg-[#5B8A72] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
          >
            All Topics
          </button>

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition 
                ${
                  filter === c
                    ? "bg-[#5B8A72] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesToDisplay.map((a) => (
            <a
              key={a.id}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white p-6 rounded-xl shadow-lg border border-green-100 h-full 
                        transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-out 
                        flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-[#2F4A3E] mb-3">
                  {a.category}
                </span>

                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-extrabold text-[#2F4A3E] group-hover:text-[#4B735E] transition leading-snug pr-4">
                    {a.title}
                  </h2>
                  <ExternalLink
                    size={20}
                    className="text-gray-400 group-hover:text-[#5B8A72] transition shrink-0 ml-2"
                  />
                </div>

                <p className="text-sm mt-2 text-gray-500 font-medium">
                  {a.source}
                </p>

                <p className="text-gray-700 mt-4 leading-relaxed text-sm">
                  {a.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-[#5B8A72] font-bold text-sm">
                Open Article
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
